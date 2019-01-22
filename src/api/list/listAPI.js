import http from '@/utils/http'

function getDesignTempletList (data) {
  return http.get('/designTemplet/getDesignTempletList', data)
}

export default {
  getDesignTempletList
}
