/* eslint-disable new-cap */
const { promisify } = require('util')
const mongoose = require('mongoose')

const client = require('redis').createClient(process.env.REDIS_URL)
client.hget = promisify(client.hget)

const exec = mongoose.Query.prototype.exec

mongoose.Query.prototype.cache = function (options = {}) {
  this.enableCache = true
  this.hashKey = JSON.stringify(options.key || 'default')

  return this
}

mongoose.Query.prototype.exec = async function () {
  if (!this.enableCache) {
    console.log('Data Source: Database')
    return exec.apply(this, arguments)
  }
  // return exec.apply(this, arguments)

  const key = JSON.stringify(Object.assign({}, this.getQuery(), {
    collection: this.mongooseCollection.name
  }))

  const cachedValue = await client.hget(this.hashKey, key)

  if (cachedValue) {
    const parsedCache = JSON.parse(cachedValue)

    console.log('Data Source: Cache')

    return Array.isArray(parsedCache)
      ? parsedCache.map(doc => new this.model(doc))
      : new this.model(parsedCache)
  }

  const result = await exec.apply(this, arguments)

  client.hmset(this.hashKey, key, JSON.stringify(result), 'EX', 300)

  console.log('Data Source: Database')
  return result
}

module.exports = {
  clearCache (hashKey) {
    console.log('Cache cleaned')
    client.del(JSON.stringify(hashKey))
  },
  async clearCacheMiddleware (ctx, next) {
    await next()
    this.clearCache(ctx.state.user.rcs_id)
  }
}
