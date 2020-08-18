<template>
  <div>
    <el-table :data="tabledatas" border>
      <el-table-column label="tab1">
          <template slot-scope="scope">
              <el-input placeholder="请输入内容" v-if="scope.row.show" v-model="scope.row.tab1"></el-input>
              <span v-else>{{scope.row.tab1}}</span>
          </template>
      </el-table-column>
      <el-table-column label="tab2">
          <template slot-scope="scope">
              <el-input placeholder="请输入内容" v-show="scope.row.show" v-model="scope.row.tab2"></el-input>
              <span v-show="!scope.row.show">{{scope.row.tab2}}</span>
          </template>
      </el-table-column>
      <el-table-column label="操作">
          <template slot-scope="scope">
              <el-button @click="scope.row.show =true">编辑</el-button>
              <el-button @click="scope.row.show =false">保存</el-button>
          </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabledatas: [
        { tab1: '111', tab2: '2222'},
        { tab1: 'aaa', tab2: 'bbb'}
      ]
    }
  },
  created() {
    this.tabledatas.map(i => {
      i.show = false
      return i
    })
  }
}
</script>

<style lang="stylus">

</style>
