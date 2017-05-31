<template>
<div>
  <el-select v-model="multiSelect" multiple placeholder="请选择" size="large">
    <el-option
      v-for="item in options"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  {{multiSelect}}</div>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: 'big',
          label: '大号'
        }, {
          value: 'large',
          label: '超大号'
        }, {
          value: 'small',
          label: '小号'
        }],
        multiSelect: []
      }
    }
  }
</script>