<template>
  <div>
    <div>
      <van-notify id='van-notify' />
    </div>
    <div>
      <input type='text' placeholder='电子邮件' v-model='wxAuthorEmail' />
      <input type='number' maxlength='6' placeholder='验证码' v-model='verifyCode' />
      <button type='primary' plain='true' size='mini' v-on:click='getVerifyCode()'>{{verifyMsg}}</button>
      <button type='primary' plain='true' v-on:click='registerAuthor()'>提交</button>
    </div>
  </div>
</template>

<script>
  import notify from '@/../static/vant/notify/notify'
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
          notify('已发送')
        }).catch(error => {
          notify(error)
        })
      },
      registerAuthor () {
        let that = this
        wx.getUserInfo({
          success (result) {
            let data = {
              wxAuthorEmail: that.wxAuthorEmail,
              verifyCode: that.verifyCode,
              sessionKey: that.global.sessionKey,
              encryptedData: result.encryptedData,
              iv: result.iv
            }
            authorAPI.register(data).then(result => {
              notify('注册成功')
              wx.redirectTo({
                url: '/pages/index/main'
              })
            }).catch(error => {
              notify(error)
            })
          }
        })
      }
    }
  }
</script>

<style>
</style>
