import moment from 'moment';

const state = {
  date: null,
  in_class: false,
  current_period: null,
  periods: []
};

const actions = {
  UPDATE_SCHEDULE({ commit, rootState }) {
    // Reset all state values
    console.log(rootState.auth);
    //const semester_schedule = rootState.auth.user.current_schedule;

    const now = moment();
    //const day = now.day();

    let day_periods = [];

    /*
    semester_schedule.forEach(course => {
      day_periods.concat(course.periods.filter(p => p.day == day));
    });
    */

    console.log(day_periods);
    commit('UPDATE_SCHEDULE', now, day_periods);
  }
};

const mutations = {
  UPDATE_SCHEDULE: (state, datetime, periods) => {
    state.date = datetime.toDate();
    state.periods = periods;
    // Find current period
  }
};

export default {
  state,
  actions,
  mutations
};
