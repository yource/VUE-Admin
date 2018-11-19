const chart = {
    male: [90305, 85391, 93475, 88012, 97402, 90450, 91023, 87340, 94560, 115034, 108321, 97301, 108013, 113375, 106042],
    female: [31366, 42104, 52934, 55012, 46910, 58902, 61002, 63021, 68403, 59304, 66394, 71023, 68302, 62934, 68392]
}

import axios from 'axios';

export default {
    getChartDate(callback) {
        axios.get('/overview/chartData').then((response)=> {
                if (response.code && response.code == 0) {

                } else {
                    this.$notify({
                        message: response.info ? response.info :　"图表数据请求失败",
                        type: 'warning'
                    })
                }
            })
            .catch((error)=> {
                this.$notify({
                    message: '图表数据请求失败',
                    type: 'warning'
                })
            })
    }
}