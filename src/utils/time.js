/*
 * 公用
 */
var time = null

/*
 * 倒计时开始
 */
function countDown (that, second) {
  if (second <= 0) {
    that.verifyMsg = '重新发送'
    that.verifyBut = false
  } else {
    that.verifyMsg = second + ' 秒'
    that.verifyBut = true
    time = setTimeout(function () {
      second -= 1
      countDown(that, second)
    }, 1000)
  }
}

/*
 * 倒计时结束
 */
function clearTime (that) {
  clearTimeout(time)
  that.verifyMsg = '重新发送'
  that.verifyBut = false
}

module.exports = {
  countDown,
  clearTime
}
