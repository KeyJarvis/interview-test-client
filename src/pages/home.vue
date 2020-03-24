<template lang="pug">
  .home
    .home-create
      el-button(type="primary" @click="newTask()") 新任务
        i(class="el-icon-plus el-icon--right")
      p 欢迎您！{{name}}
    .home-list
      el-table(
        :data="tableData || '暂无数据'"
        stripe
        style="width: 100%")
        el-table-column(
          fixed
          prop="title"
          label="名称"
          min-width="100")
        el-table-column(
          prop="message"
          label="信息"
          min-width="200")
        el-table-column(
          prop="state"
          label="状态"
          min-width="200")
          template(slot-scope="scope")
            el-switch(
              style="display: block"
              v-model="scope.row.state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="已完成"
              inactive-text="未完成"
              @change="modify(scope.$index, scope.row)")
        el-table-column(
          label="操作"
          min-width="150")
          template(slot-scope="scope")
            el-button(
              size="mini"
              type="primary"
              @click="handleModify(scope.$index, scope.row)") 修改
            el-button(
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)") 删除
      </template>
</template>

<script>
import dd from 'dingtalk-jsapi'
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      uid: '',
      name: '',
      tableData: []
    }
  },
  mounted() {
    const _this = this
    dd.ready(function() {
      dd.runtime.permission.requestAuthCode({
        corpId: 'dingad02afa9af129cd2acaaa37764f94726', // 企业id
        onSuccess: function(info) {
          let code = info.code // 通过该免登授权码可以获取用户身份
          _this.getToken(code)
        },
        onFail: function(err) {
          alert('出错了' + err)
        }
      })
    })
  },
  methods: {
    ...mapActions('home', [
      'fetchGetTableData',
      'fetchDeleteTask',
      'fetchModifyTask',
      'fetchGetToken'
    ]),
    // 删除任务
    handleDelete(index, row) {
      this.fetchDeleteTask(row.id).then(res => {
        if (res === true) {
          this.$message({
            type: 'success',
            message: '删除成功',
            center: true
          })
          this.getTableData()
        } else {
          this.$message({
            type: 'error',
            message: '删除失败',
            center: true
          })
        }
      })
    },
    // 修改状态
    modify(index, row) {
      this.fetchModifyTask(row).then(res => {})
    },
    // 修改任务
    handleModify(index, row) {
      this.$router.push({ path: '/modify-task', query: row })
    },
    // 新建任务
    newTask() {
      this.$router.push('/new-task')
    },
    getTableData() {
      this.fetchGetTableData(this.name).then(res => {
        res.forEach(item => {
          if (item.state === 0) {
            item.state = false
          } else {
            item.state = true
          }
        })
        this.tableData = res
      })
    },
    async getToken(code) {
      this.fetchGetToken(code).then(res => {
        this.uid = res.data.userid
        this.name = res.data.name
        sessionStorage.setItem('userId', res.data.userid)
        sessionStorage.setItem('name', res.data.name)
        this.getTableData()
      })
    }
  }
}
</script>

<style lang="scss" socped>
.home {
  margin-top: 40px;
}
.home-create {
  margin-left: 20px;
}
.home-create p {
  float: right;
  color: rgb(63, 57, 57);
  margin-right: 20px;
}
.home-list {
  margin-top: 40px;
}
</style>
