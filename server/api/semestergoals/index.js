const Router = require('koa-router')
const router = new Router()

const Ctrl = require('./semestergoals.controller')

router.get('/', Ctrl.getSemesterGoals)
router.post('/', Ctrl.createSemesterGoals)
router.patch('/:semestergoalID', Ctrl.updateSemesterGoals)
router.delete('/:semestergoalID', Ctrl.deleteSemesterGoal)

module.exports = router.routes()
// Make sure that this isn't ppublic for other people.
