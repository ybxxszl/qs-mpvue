<template>
  <div>
    <div>
      <van-notify id='van-notify'></van-notify>
    </div>
    <div v-if='needRegister'>
      <div v-if='needAuthorize'>
        <van-button plain type='primary' size='large' open-type='getUserInfo' @getuserinfo='register'>授权注册</van-button>
      </div>
      <div v-else>
        <van-button plain type='primary' size='large' @click='register'>注册</van-button>
      </div>
    </div>
    <div v-else>
      <div>
        <van-button plain type='primary' size='large' @click='showList'>显示</van-button>
      </div>
      <div>
        <van-cell title='ID' label='Id' icon='idcard' size='large' border=true>{{wxAuthorId}}</van-cell>
        <van-cell title='电子邮件' label='Email' icon='comment-o' size='large' border=true>{{wxAuthorEmail}}</van-cell>
        <van-cell title='昵称' label='NickName' icon='user-o' size='large' border=true>{{wxAuthorNickName}}</van-cell>
        <van-cell title='性别' label='Sex' icon='like-o' size='large' border=true>{{wxAuthorSex}}</van-cell>
        <van-cell title='国' label='Country' icon='location-o' size='large' border=true>{{wxAuthorCountry}}</van-cell>
        <van-cell title='省' label='Province' icon='location-o' size='large' border=true>{{wxAuthorProvince}}</van-cell>
        <van-cell title='市' label='City' icon='location-o' size='large' border=true>{{wxAuthorCity}}</van-cell>
        <van-cell title='照片' label='AvatarUrl' icon='photo-o' size='large' border=true>{{wxAuthorAvatarUrl}}</van-cell>
      </div>
    </div>
  </div>
</template>

<script>
  import notify from '@/../static/vant/notify/notify'
  import indexAPI from '@/api/index/indexAPI'

  export default {
    data () {
      return {
        needRegister: false,
        needAuthorize: false,
        wxAuthorId: '',
        wxAuthorEmail: '',
        wxAuthorNickName: '',
        wxAuthorSex: '',
        wxAuthorCountry: '',
        wxAuthorProvince: '',
        wxAuthorCity: '',
        wxAuthorAvatarUrl: ''
      }
    },
    mounted () {
      let that = this
      that.login()
    },
    methods: {
      login () {
        let that = this
        wx.login({
          success (msg) {
            let data = {
              code: msg.code
            }
            indexAPI.login(data).then(result => {
              result = result.data
              that.global.sessionKey = result.sessionKey
              if (result.token === undefined && result.wxAuthor === undefined) {
                that.needRegister = true
                wx.getSetting({
                  success (msg) {
                    that.needAuthorize = !msg.authSetting['scope.userInfo']
                  }
                })
              } else {
                let wxAuthor = result.wxAuthor
                that.wxAuthorId = wxAuthor.wxAuthorId
                that.wxAuthorEmail = wxAuthor.wxAuthorEmail
                that.wxAuthorNickName = wxAuthor.wxAuthorNickName
                that.wxAuthorSex = wxAuthor.wxAuthorSex
                that.wxAuthorCountry = wxAuthor.wxAuthorCountry
                that.wxAuthorProvince = wxAuthor.wxAuthorProvince
                that.wxAuthorCity = wxAuthor.wxAuthorCity
                that.wxAuthorAvatarUrl = wxAuthor.wxAuthorAvatarUrl
                that.global.wxAuthorId = wxAuthor.wxAuthorId
                that.global.wxAuthorEmail = wxAuthor.wxAuthorEmail
                that.global.wxAuthorNickName = wxAuthor.wxAuthorNickName
                that.global.wxAuthorSex = wxAuthor.wxAuthorSex
                that.global.wxAuthorCountry = wxAuthor.wxAuthorCountry
                that.global.wxAuthorProvince = wxAuthor.wxAuthorProvince
                that.global.wxAuthorCity = wxAuthor.wxAuthorCity
                that.global.wxAuthorAvatarUrl = wxAuthor.wxAuthorAvatarUrl
                wx.setStorageSync('wxAuthorId', wxAuthor.wxAuthorId)
                wx.setStorageSync('token', result.token)
              }
            }).catch(error => {
              notify(error)
            })
          }
        })
      },
      register () {
        wx.getSetting({
          success (msg) {
            if (msg.authSetting['scope.userInfo']) {
              wx.navigateTo({
                url: '/pages/author/register/main'
              })
            } else {
              notify('需要授权')
            }
          }
        })
      },
      showList () {
        wx.navigateTo({
          url: '/pages/list/main'
        })
      }
    }
  }
</script>

<style>
</style>
