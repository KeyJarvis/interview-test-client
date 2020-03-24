<template lang="pug">
    .new-task
      el-form(:model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm")
        el-form-item(label="标题" prop="title")
          el-input(v-model="ruleForm.title")
        el-form-item(label="描述" prop="message")
          el-input(type="textarea" v-model="ruleForm.message")
        el-form-item(label="截止时间" required)
            el-col(:span="11")
            el-form-item(prop="date")
              el-date-picker(type="date" placeholder="选择日期" v-model="ruleForm.date" style="width: 100%;")
        el-form-item(label="紧急程度" prop="degree")
          el-radio-group(v-model="ruleForm.degree")
            el-radio(label="不紧急")
            el-radio(label="一般")
            el-radio(label="紧急")
        el-form-item(label="附件" prop="fileList")
          el-upload(
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList")
            el-button(size="small" type="primary") 点击上传
            div(slot="tip" class="el-upload__tip") 只能上传jpg/png文件，且不超过500kb
        el-form-item
          el-button(type="primary" @click="submitForm('ruleForm')") 立即创建
          el-button(@click="resetForm('ruleForm')") 重置
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      fileList: [],
      ruleForm: {
        title: '',
        message: '',
        state: 0,
        date: '',
        degree: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        message: [
          { required: true, message: '请输入描述内容', trigger: 'blur' }
        ],
        date: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        degree: [
          { required: true, message: '请选择紧急程度', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    ...mapActions('home', ['fetchCreateTask']),
    // 新建任务
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var date1 = new Date(this.ruleForm.date)
          var year = date1.getFullYear()
          var month = date1.getMonth() + 1
          var day = date1.getDate()
          let date = year + '-' + month + '-' + day
          this.ruleForm.date = date
          let uid = sessionStorage.getItem('userId')
          let name = sessionStorage.getItem('name')
          this.ruleForm.uid = uid
          this.ruleForm.name = name
          this.fetchCreateTask(this.ruleForm).then(res => {
            if (res === true) {
              this.$message({
                type: 'success',
                message: '创建任务成功',
                center: true
              })
              this.$router.go(-1)
            } else {
              this.$message({
                type: 'error',
                message: '创建失败',
                center: true
              })
            }
          })
        } else {
          return false
        }
      })
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 移除文件
    handleRemove(file, fileList) {},
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      )
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    }
  }
}
</script>

<style>
.new-task {
  width: 90%;
  margin-top: 10%;
}
</style>
