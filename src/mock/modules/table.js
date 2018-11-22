import Mock from 'mockjs'
var Random = Mock.Random

Mock.mock('/api/table/tableData', {
    code:"0",
    info:"",
    'data|20-50':[{
    	'id|+1':0,
    	email:"@email",
    	date:"2018-"+"@DATE('MM-dd')",
    	name:'@CNAME',
    	address: '@CITY(true)'
    }]
})
Mock.mock('/api/table/edit', {
    code:"0",
    info:""
})