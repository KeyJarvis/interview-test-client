import { get, post } from '@/utils/request.js'

// 获取token
const getToken = data => get('/api/getToken/' + data.code)

// 获取任务数据
const getTableData = data => get('/api/tableData/' + data.name)

// 新建任务
const createTask = data => post('/api/createTask', data)

// 删除任务
const deleteTask = data => get('/api/deleteTask/' + data.id)

// 修改任务
const modifyTask = data => post('/api/modifyTask', data)

export { getTableData, createTask, deleteTask, modifyTask, getToken }
