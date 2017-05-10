//数据
var list = [
	{
		title:"吃饭打豆豆",
		isChecked:false //状态为false，为不选中  任务未完成
	},
	{
		title:"优才学院",
		isChecked:true   //状态为true，为选中    任务完成
	}
];

//vm
var vm = new Vue({
	el:".main",
	data:{
		list:list,
		todo:"",
		edtorTodos:'',  //记录正在编辑的数据
		beforeTitle:'' //记录正在编辑的数据的title
	},
	computed:{
		noCheckeLength:function(){
			return this.list.filter(function(item){
                return !item.isChecked
            }).length
		}
	},
	methods:{
		addTodo(){  //添加任务
			this.list.push({
				title:this.todo,
				isChecked:false
			});
			this.todo = '';
		},
		deleteTodo(todo){ //删除任务
			var index = this.list.indexOf(todo);
			this.list.splice(index,1);
		},
		edtorTodo(todo){  //编辑任务
			console.log(todo);
			//编辑任务的时候，记录一下编辑这条任务的title，方便在取消编辑的时候重新给之前的title
			this.beforeTitle = todo.title;

			this.edtorTodos = todo;


		},
		edtorTodoed(todo){ //编辑任务成功
			this.edtorTodos = '';
		},
		cancelTodo(todo){  //取消编辑任务

			todo.title = this.beforeTitle;

			this.beforeTitle = '';

			//让div显示出来，input隐藏
			this.edtorTodos = '';
		}
	},
	directives:{
		"foucs":{
			update(el,binding){
				console.log(el,binding);
				if(binding.value){
					el.focus();
				}
			}
		}
	}
});