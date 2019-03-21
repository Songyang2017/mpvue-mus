<template>
  <div class="wrapper">
    <event
      v-if="isLogin"
      :list="list"
    ></event>
    <a
      href="/pages/login/main"
      v-if="!isLogin"
      class="line"
    >去登录</a>
  </div>
</template>
<script>
import { getFriendsEvents } from '@/api/friend'
import { mapState } from 'vuex'
import { dateFormat } from '@/utils'
import event from '@/components/event'
export default {
  data () {
    return {
      list: []
    }
  },
  onShow () {
    if (this.isLogin) {
      this._getFriendsEvents()
    }
  },
  onPullDownRefresh () {
    if (this.isLogin) {
      this._getFriendsEvents()
    }
  },
  components: {
    event
  },
  computed: {
    ...mapState([
      'isLogin'
    ])
  },
  methods: {
    _getFriendsEvents () {
      wx.showLoading({
        title: '玩命加载中'
      })
      getFriendsEvents().then(res => {
        let { code, event } = res
        if (code === 200) {
          event.forEach(v => {
            v._json = JSON.parse(v.json)
            v._eventTime = dateFormat(new Date(v.eventTime), 'yyyy年MM月dd日')
          })
          this.list = event
          wx.stopPullDownRefresh()
          wx.hideLoading()
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
@import "../../common/style/index";
.line {
  .bor-b();
  font-size: @font-size-medium-x;
  padding: 10px;
  color: @color-text-s;
}
</style>

