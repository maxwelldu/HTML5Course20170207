<template>
	<section>

	</section>
</template>
<script>
import axios from 'axios';
	export default {
		data() {//绑定属性
			return {

			}
		},
		methods: {//methods 将被混入到 Vue 实例中。可以直接通过 VM 实例访问这些方法，或者在指令表达式中使用
			//退出登录
		},
		mounted() {//钩子函数当实例被创建的时候进行调用[仅仅导航栏构建的时候创建了一次]

			this.$http({
        methods: 'post',
        url: '/api/TaskProject/TaskProjectList?UserId=91AAB308-B867-C803-1E0C-08D3B844FAB3',
        transformResponse: [(data) => {
          return JSON.parse(data.replace(/T00:00:00/g, ''))
        }],
        params: {
          code: 'size',
        }
      }).then((response) => {
				console.log(response.data)
      }).catch((error) => {
        console.log(error)
      })

		}
	}

</script>
