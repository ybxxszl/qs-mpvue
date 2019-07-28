<template>
  <div>
    <p>
      <button @click="toTest1">跳转test1</button>
      <button @click="toTest2">跳转test2</button>
    </p>
  </div>
</template>

<script>
  export default {
    config: {
      navigationBarTitleText: 'test'
    },

    methods: {
      toTest1 () {
        wx.redirectTo({
          url: '/pages/test1/test1'
        })
      },
      toTest2 () {
        wx.redirectTo({
          url: '/pages/test2/test2'
        })
      }
    },

    onShow () {
      console.log('test')
    }
  }
</script>

<style>
</style>
