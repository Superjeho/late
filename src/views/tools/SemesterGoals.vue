<!-- Tools: Semester Goals -->
<template>
  <section class="section semester-goals">
    <b-loading
      :is-full-page="false"
      :active="loading"
      :can-cancel="false"
    />

    <h1 class="title has-text-centered-mobile">
      Semester Goals
    </h1>
    <h2 class="subtitle has-text-centered-mobile">
      A list to put down reminders of long term goals, over the course of the semester.
      We will remind you over the term!
    </h2>
  </section>
</template>

<script>
export default {
  name: 'SemesterGoals',
  data () {
    return {
      loading: true,
      otherCategory: '',
      newGoal: {
        category: 'school',
        title: '',
        description: ''
      },
      semesterGoals: []
    }
  },
  computed: {
    goals () {
      return this.semesterGoals
    },
    categories () {
      const categories = {}
      for (const goal of this.goals) {
        categories[goal.category] = categories[goal.category] || []
        categories[goal.category].push(goal)
      }
      return categories
    }
  }

}
</script>>
