import http from '../../utils/http'

function register (data) {
  return http.get('author/register', data)
}

export default {
  register
}
