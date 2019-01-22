<template>
  <div>
    <div>
      <van-notify id='van-notify'></van-notify>
    </div>
    <div>
      <van-cell-group>
        <van-field clearable required label='电子邮件' placeholder='请输入电子邮件' error-message='电子邮件格式不正确' type='text' confirm-type='完成' confirm-hold=false border=true focus=true @change='getWXAuthorEmail'></van-field>
        <van-field clearable required label='验证码' placeholder='请输入验证码' error-message='验证码格式不正确' type='text' confirm-type='完成' confirm-hold=false border=true use-button-slot @change='getVerifyCode'>
          <van-button plain slot='button' type='primary' size='small' :disabled='verifyBut' @click='sendVerifyCode'>{{verifyMsg}}</van-button>
        </van-field>
        <van-button plain type='primary' size='large' @click='register'>提交</van-button>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
  import notify from '@/../static/vant/notify/notify'
  import time from '@/utils/time'
  import authorAPI from '@/api/author/authorAPI'

  export default {
    data () {
      return {
        wxAuthorEmail: '',
        verifyCode: '',
        verifyMsg: '发送验证码',
        verifyBut: false
      }
    },
    methods: {
      sendVerifyCode () {
        let that = this
        if (!that.verifyBut) {
          time.countDown(that, 60)
          let data = {
            wxAuthorEmail: this.wxAuthorEmail
          }
          authorAPI.sendVerifyCode(data).then(result => {
            notify(result.msg)
            if (result.code === 500) {
              time.clearTime(that)
            }
          }).catch(error => {
            notify(error)
          })
        }
      },
      register () {
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
              notify(result.msg)
              if (result.code === 200) {
                wx.redirectTo({
                  url: '/pages/index/main'
                })
              }
            }).catch(error => {
              notify(error)
            })
          }
        })
      },
      getWXAuthorEmail (e) {
        let that = this
        that.wxAuthorEmail = e.mp.detail
      },
      getVerifyCode (e) {
        let that = this
        that.verifyCode = e.mp.detail
      }
    }
  }
</script>

<style>
</style>
