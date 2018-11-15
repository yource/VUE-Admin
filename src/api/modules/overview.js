export default {
    state: {
        chartDate: {
            male: [],
            female: []
        }
    },
    mutations: {
        setChartDate(state, maleDate, femaleDate) {
            state.chartDate = {
                male: maleDate,
                female: femaleDate
            }
        }
    }
}