var list = [
	/*{
		title:"吃饭打豆豆"
	},
	{
		title:"吃饭打豆豆"
	}*/
];

new Vue({
	el:".main",
	data:{
		list:list,
		todo:""
	},
	methods:{
		addTodo(ev){  //添加任务
			//向list中添加一项任务  
			/*
				{
					title:
				}
			*/

			//事件处理函数中的this指向的是，当前这个根实例
				console.log("我触发了");
				this.list.push({
					title:this.todo
				});

				this.todo = '';
		}
	}
});