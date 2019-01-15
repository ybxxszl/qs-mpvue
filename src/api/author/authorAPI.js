import http from '../../utils/http'

function register (data) {
  return http.post('author/register', data)
}

export default {
  register
}
