const todoList = [{
    id:0,
    content:"项目进度总结报告",
    done:false
},{
    id:1,
    content:"新人培训，公司文化介绍",
    done:false
},{
    id:2,
    content:"代办事项0代办事项0代办事项0代办事项0",
    done:true
},{
    id:3,
    content:"代办事项01代办事项01代办事项01代办事项01",
    done:false
},{
    id:4,
    content:"代办事项02代办事项02代办事项02",
    done:false
},{
    id:5,
    content:"代办事项03代办事项03代办事项03代办事项03",
    done:true
}];

export default {
    state: {
        todoList
    },
    mutations: {
        deleteTodo(state, id) {
            let index = state.todoList.findIndex(function(item){
                return item.id==id
            });
            state.todoList.splice(index,1);
        },
        changeTodo(state,id,done){
            state.todoList.findIndex(function(item){
                if(item.id==id){
                    item.done = done;
                }
                return item.id==id
            });
        }
    }
}