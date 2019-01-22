<template>
  <div>
    <div>
      <van-notify id='van-notify'></van-notify>
    </div>
    <div>
      <van-search placeholder='请输入调查问卷名称' @change='getSearchContent' @search='search' focus=true use-action-slot>
        <view slot='action' @click='search'>搜索</view>
      </van-search>
      <van-cell-group>
        <van-cell v-for='(designTemplet, index) in designTempletList' :key='index' :title='designTemplet.designTempletName' :value='designTemplet.state' size='large' border=true></van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
  import notify from '@/../static/vant/notify/notify'
  import listAPI from '@/api/list/listAPI'

  export default {
    data () {
      return {
        designTempletList: [],
        searchContent: '',
        pageSize: 2,
        pageCurrent: 1,
        hasMoreData: true
      }
    },
    mounted () {
      let that = this
      that.getDesignTempletList()
    },
    methods: {
      getDesignTempletList () {
        let that = this
        if (that.hasMoreData) {
          let data = {
            searchContent: that.searchContent,
            pageSize: that.pageSize,
            pageCurrent: that.pageCurrent
          }
          listAPI.getDesignTempletList(data).then(result => {
            result = result.data
            that.designTempletList = that.designTempletList.concat(result)
            if (result.length < that.pageSize) {
              that.hasMoreData = false
            }
          })
        } else {
          notify('没有更多的数据')
        }
      },
      search () {
        let that = this
        that.hasMoreData = true
        that.designTempletList = []
        that.getDesignTempletList()
      },
      getSearchContent (e) {
        let that = this
        that.searchContent = e.mp.detail
      }
    }
  }
</script>

<style>
</style>
