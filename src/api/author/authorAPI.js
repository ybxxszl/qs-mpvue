import http from '../../utils/http'

function getVerifyCode (data) {
  return http.get('author/getVerifyCode', data)
}
function register (data) {
  return http.post('author/register', data)
}

export default {
  getVerifyCode,
  register
}
