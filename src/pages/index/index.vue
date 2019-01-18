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
        <van-cell title='ID' label='Id'  icon='idcard' size='large' border=true>{{wxAuthorId}}</van-cell>
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
  // https://youzan.github.io/vant-weapp/#/intro
  import notify from '@/../static/vant/notify/notify'
  import indexAPI from '../../api/index/indexAPI'

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
    beforeCreate () {
      console.log('1 - beforeCreate')
    },
    created () {
      console.log('2 - created')
    },
    beforeMount () {
      console.log('3 - beforeMount')
    },
    mounted () {
      console.log('4 - mounted')
      this.login()
    },
    beforeUpdate () {
      console.log('5 - beforeUpdate')
    },
    updated () {
      console.log('6 - updated')
    },
    activated () {
      console.log('7 - activated')
    },
    deactivated () {
      console.log('8 - deactivated')
    },
    beforeDestroy () {
      console.log('9 - beforeDestroy')
    },
    destroyed () {
      console.log('10 - destroyed')
    },
    errorCaptured () {
      console.log('11 - errorCaptured')
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
              if (result.token === undefined && result.wxAuthor === undefined) {
                that.needRegister = true
                wx.getSetting({
                  success (msg) {
                    that.needAuthorize = !msg.authSetting['scope.userInfo']
                  }
                })
              } else {
                that.wxAuthorId = result.wxAuthor.wxAuthorId
                that.wxAuthorEmail = result.wxAuthor.wxAuthorEmail
                that.wxAuthorNickName = result.wxAuthor.wxAuthorNickName
                that.wxAuthorSex = result.wxAuthor.wxAuthorSex
                that.wxAuthorCountry = result.wxAuthor.wxAuthorCountry
                that.wxAuthorProvince = result.wxAuthor.wxAuthorProvince
                that.wxAuthorCity = result.wxAuthor.wxAuthorCity
                that.wxAuthorAvatarUrl = result.wxAuthor.wxAuthorAvatarUrl
                that.global.wxAuthorId = that.wxAuthorId
                that.global.wxAuthorEmail = that.wxAuthorEmail
                that.global.wxAuthorNickName = that.wxAuthorNickName
                that.global.wxAuthorSex = that.wxAuthorSex
                that.global.wxAuthorCountry = that.wxAuthorCountry
                that.global.wxAuthorProvince = that.wxAuthorProvince
                that.global.wxAuthorCity = that.wxAuthorCity
                that.global.wxAuthorAvatarUrl = that.wxAuthorAvatarUrl
              }
              that.global.sessionKey = result.sessionKey
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
