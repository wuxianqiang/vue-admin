<template>
  <div class="profile">
    <m-dialog
      :dialogVisible.sync="dialogVisible"
      :title="title">
      <div>用户编号：{{ruleForm.id}}</div>
      <div>用户性别：{{ruleForm.sex}}</div>
      <div>用户备注：{{ruleForm.count}}</div>
    </m-dialog>
    <div class="profile-header">
      <m-table
        :dataList="dataList"
        :titleList="titleList">
      </m-table>
    </div>
  </div>
</template>

<script>
import MTable from '@/components/m-table/m-table'
import MDialog from '@/components/m-dialog/m-dialog'

export default {
  components: {
    MTable,
    MDialog
  },
  data () {
    return {
      dataList: [],
      title: '修改提醒',
      dialogVisible: false,
      ruleForm: {
        id: '',
        sex: 0,
        count: ''
      }
    }
  },
  created () {
    let list = []
    for (let i = 1; i < 50; i++) {
      list.push({
        id: i,
        sex: Math.random() > 0.5 ? 0 : 1,
        count: 100 + i
      })
    }
    this.dataList = list
    this.titleList = [
      {
        key: 'id',
        text: '用户编号'
      },
      {
        key: 'sex',
        text: '用户性别',
        filter: (item) => {
          return item.sex ? '男' : '女'
        }
      },
      {
        key: 'count',
        text: '用户备注'
      },
      {
        key: 'html',
        text: '操作',
        width: 150,
        render (h, column) {
          let handlerClick = () => {
            this.handleDelete(column)
          }
          return <el-button on-click={handlerClick}>删除</el-button>
        },
      }
    ]
  },
  methods: {
    // 删除
    handleDelete (item) {
      this.title = '删除提醒'
      this.dialogVisible = true
      this.ruleForm = item
    }
  }
}
</script>

<style lang="less">

</style>
