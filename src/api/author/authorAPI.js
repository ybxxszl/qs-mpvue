import http from '@/utils/http'

function sendVerifyCode (data) {
  return http.get('author/send', data)
}
function register (data) {
  return http.post('author/register', data)
}

export default {
  sendVerifyCode,
  register
}
