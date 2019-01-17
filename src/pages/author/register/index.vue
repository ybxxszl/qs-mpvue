<template>
  <div>
    <input type='text' placeholder='电子邮件' v-model='wxAuthorEmail' />
    <input type='number' maxlength='6' placeholder='验证码' v-model='verifyCode' />
    <button type='primary' plain='true' size='mini' v-on:click='getVerifyCode()'>{{verifyMsg}}</button>
    <button type='primary' plain='true' v-on:click='registerAuthor()'>提交</button>
  </div>
</template>

<script>
  import authorAPI from '../../../api/author/authorAPI'
  export default {
    data () {
      return {
        wxAuthorEmail: '',
        verifyCode: '',
        verifyMsg: '获取验证码'
      }
    },
    methods: {
      getVerifyCode () {
        let data = {
          wxAuthorEmail: this.wxAuthorEmail
        }
        authorAPI.getVerifyCode(data).then(result => {
          console.log(result)
        }).catch(error => {
          console.log(error)
        })
      },
      registerAuthor () {
        wx.getUserInfo({
          success (result) {
            let data = {
              wxAuthorEmail: this.wxAuthorEmail,
              verifyCode: this.verifyCode,
              encryptedData: result.encryptedData,
              iv: result.iv,
              sessionKey: this.global.sessionKey
            }
            authorAPI.register(data).then(result => {
              wx.redirectTo({
                url: '/pages/index/index'
              })
            }).catch(error => {
              console.log(error)
            })
          }
        })
      }
    }
  }
</script>

<style>
</style>
