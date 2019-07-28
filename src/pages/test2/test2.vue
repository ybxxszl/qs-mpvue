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
      navigationBarTitleText: 'test2'
    },

    methods: {
      toTest () {
        wx.redirectTo({
          url: '/pages/test/test'
        })
      }
    },

    onShow () {
      console.log('test2')
    }
  }
</script>

<style>
</style>
