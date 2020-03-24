import { getTableData, createTask, deleteTask, modifyTask, getToken } from '@/api/home.js'

const state = {}

const actions = {
  async fetchGetToken({ commit }, payload) {
    let code = payload
    let res = await getToken({ code })
    return res
  },
  async fetchGetTableData({ commit }, payload) {
    let name = payload
    let res = await getTableData({ name })
    return res
  },
  async fetchDeleteTask({ commit }, payload) {
    let id = payload
    let res = await deleteTask({ id })
    return res
  },
  async fetchCreateTask({ commit }, payload) {
    let data = payload
    let res = await createTask({ data })
    return res
  },
  async fetchModifyTask({ commit }, payload) {
    let data = payload
    let res = await modifyTask({ data })
    return res
  }
}

const mutations = {}
export default {
  namespaced: true,
  state,
  actions,
  mutations
}
