<template>
  <div>
    <div>
      <van-notify id='van-notify' />
    </div>
    <div v-if='needRegister'>
      <div v-if='needAuthorize'>
        <button type='primary' plain='true' open-type="getUserInfo" v-on:getuserinfo='register'>授权注册</button>
      </div>
      <div v-else>
        <button type='primary' plain='true' v-on:click='register'>注册</button>
      </div>
    </div>
    <div v-else>
      <div>
        <button type='primary' plain='true' v-on:click='showList'>显示</button>
      </div>
      <div>{{wxAuthorId}}</div>
      <div>{{wxAuthorEmail}}</div>
      <div>{{wxAuthorNickName}}</div>
      <div>{{wxAuthorSex}}</div>
      <div>{{wxAuthorCountry}}</div>
      <div>{{wxAuthorProvince}}</div>
      <div>{{wxAuthorCity}}</div>
      <div>{{wxAuthorAvatarUrl}}</div>
    </div>
  </div>
</template>

<script>
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
              that.global.sessionKey = result.data.sessionKey
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
