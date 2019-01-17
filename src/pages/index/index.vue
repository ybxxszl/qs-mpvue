<template>
  <div>
    <div v-if='needRegister'>
      <button type='primary' plain='true' v-on:click='register'>注册</button>
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
  import indexAPI from '../../api/index/indexAPI'
  export default {
    data () {
      return {
        needRegister: false,
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
      this.login()
    },
    methods: {
      login () {
        wx.login({
          success (msg) {
            let data = {
              code: msg.code
            }
            indexAPI.login(data).then(result => {
              console.log(result)
              if (JSON.stringify(result.wxAuthor) === '{}') {
                this.needRegister = true
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
        wx.navigateTo({
          url: '/pages/author/register/main'
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
