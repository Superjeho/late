<!--Modals: Course overview modal schedule module-->
<template>
  <div class="schedule">
    <CoursePeriodsTable :periods="course.periods" />
    <p
      v-if="course.periods.length"
      class="has-text-centered"
    >
      <img
        :src="imageURL"
        alt
      >
    </p>
  </div>
</template>

<script>
import CoursePeriodsTable from '@/views/courses/components/CoursePeriodsTable'
export default {
  name: 'CourseModalSchedule',
  components: { CoursePeriodsTable },
  props: {
    course: {
      type: Object,
      required: true
    }
  },
  computed: {
    key () {
      return process.env.VUE_APP_GOOGLE_API_KEY
    },
    imageURL () {
      const markers = this.course.periods.map(period => {
        const color = '0x' + this.course.color.replace('#', '')
        const label = period.type.charAt(0)
        const locationParts = period.location.split(' ')
        const location =
          locationParts.slice(0, locationParts.length - 1).join(' ') +
          ', Troy, NY'
        return `&markers=color:${color}|label:${label}|${location}`
      })
      const url = `https://maps.googleapis.com/maps/api/staticmap?size=400x200&maptype=roadmap${markers.join(
        ''
      )}&key=${this.key}`
      return encodeURI(url)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
