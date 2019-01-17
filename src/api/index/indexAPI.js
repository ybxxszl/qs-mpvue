import http from '../../utils/http'

function login (data) {
  return http.get('author/login', data)
}

export default {
  login
}
