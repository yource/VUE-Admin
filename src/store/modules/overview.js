export default {
    state: {
        chartData: {
            male: [],
            female: []
        }
    },
    mutations: {
        setChartDate(state, data) {
            state.chartData = {
                male:data.male,
                female:data.female
            }
        }
    }
}