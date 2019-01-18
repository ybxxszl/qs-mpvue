<template>
  <div>
    <van-notify id='van-notify' />
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
    onShow () {
      this.login()
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
                this.wxAuthorId = result.wxAuthor.wxAuthorId
                this.wxAuthorEmail = result.wxAuthor.wxAuthorEmail
                this.wxAuthorNickName = result.wxAuthor.wxAuthorNickName
                this.wxAuthorSex = result.wxAuthor.wxAuthorSex
                this.wxAuthorCountry = result.wxAuthor.wxAuthorCountry
                this.wxAuthorProvince = result.wxAuthor.wxAuthorProvince
                this.wxAuthorCity = result.wxAuthor.wxAuthorCity
                this.wxAuthorAvatarUrl = result.wxAuthor.wxAuthorAvatarUrl
                this.global.wxAuthorId = this.wxAuthorId
                this.global.wxAuthorEmail = this.wxAuthorEmail
                this.global.wxAuthorNickName = this.wxAuthorNickName
                this.global.wxAuthorSex = this.wxAuthorSex
                this.global.wxAuthorCountry = this.wxAuthorCountry
                this.global.wxAuthorProvince = this.wxAuthorProvince
                this.global.wxAuthorCity = this.wxAuthorCity
                this.global.wxAuthorAvatarUrl = this.wxAuthorAvatarUrl
              }
            }).catch(error => {
              console.log(error)
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
