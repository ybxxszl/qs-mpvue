import config from '../config'

import FlyIO from 'flyio/dist/npm/wx'

const fly = new FlyIO()

// 请求拦截器
fly.interceptors.request.use(
  (request) => {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    request.headers = {
      'X-Tag': 'flyio',
      'content-type': 'application/json'
    }
    request.body && Object.keys(request.body).forEach((value) => {
      if (request.body[value] === '') {
        delete request.body[value]
      }
    })
    console.log(request)
    return request
  }
)

// 响应拦截器
fly.interceptors.response.use(
  (response) => {
    wx.hideLoading()
    console.log(response)
    return response.data
  },
  (error) => {
    wx.hideLoading()
    console.log(error)
    return error.response.data
  }
)

fly.config.baseURL = config.url
fly.config.timeout = config.timeout

export default fly
