<template>
  <div>
    <p>
      <button @click="toTest">返回</button>
    </p>
  </div>
</template>

<script>
  export default {
    config: {
      navigationBarTitleText: 'test1'
    },

    methods: {
      toTest () {
        wx.redirectTo({
          url: '/pages/test/test'
        })
      }
    },

    onShow () {
      console.log('test1')
    }
  }
</script>

<style>
</style>
