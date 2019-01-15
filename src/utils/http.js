import server from '../config/server'

import FlyIO from 'flyio/dist/npm/wx'

const fly = new FlyIO()

fly.config.baseURL = server.url
fly.config.timeout = 10000

// 请求拦截器
fly.interceptors.request.use(
  (request) => {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    request.headers = {
      'X-Tag': 'flyio',
      'content-type': 'application/json',
      'H-AuthorId': this.global.wxAuthorId,
      'H-token': this.global.token
    }
    request.body && Object.keys(request.body).forEach((value) => {
      if (request.body[value] === '') {
        delete request.body[value]
      }
    })
    return request
  }
)

// 响应拦截器
fly.interceptors.response.use(
  (response) => {
    wx.hideLoading()
    return response.data
  },
  (error) => {
    wx.hideLoading()
    return error.response.data
  }
)

export default fly
