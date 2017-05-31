<template>
	<section>
		<el-switch
	  v-model="value1"
	  on-text=""
	  off-text="">
	</el-switch>
	<el-switch
	  v-model="value2"
	  on-color="#13ce66"
	  off-color="#ff4949">
	</el-switch>
	{{value1}}
	</section>
</template>
<script>
	
	import bootstrap from 'sbAdmin/js/bootstrap.min.js'
	import sbAdmin from 'sbAdmin/js/sb-admin-2.min.js'
</script>
<script>
  export default {
    data() {
      return {
        value1: true,
        value2: true
      }
    }
  };
</script>