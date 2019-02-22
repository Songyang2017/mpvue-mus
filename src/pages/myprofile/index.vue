<template>
  <div class="wrapper">
    <div
      class="base-info"
      v-if="isLogin"
    >
      <div
        class="avatar-item"
        @click="goProfile(data.userId)"
      >
        <div class="avatar-block">
          <div class="avatar">
            <img
              :src="data.avatarUrl"
              alt=""
            >
          </div>
          <div class="name">{{data.nickname}}</div>
        </div>
        <i class="iconfont icon-jinru"></i>
      </div>
    </div>
    <a
      href="/pages/login/main"
      v-if="!isLogin"
      class="toLogin"
    >登录</a>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { loginStatus, getDetail } from '@/api/user'

export default {
  data () {
    return {
      data: {},
      userId: '',
      isLogin: false
    }
  },
  onShow () {
    // console.log('log', this.userData)
    this._loginStatus()
  },
  computed: {
    ...mapState([
      'userData'
    ])
  },
  methods: {
    _getDetail (id) {
      getDetail(id).then(res => {
        let { code, profile } = res
        if (code === 200) {
          this.data = profile
        }
      })
    },
    _loginStatus () {
      loginStatus().then(res => {
        let { code, profile: { userId } } = res
        if (code === 200) {
          this.isLogin = true
          this.userId = userId
          this._getDetail(userId)
        } else {
          this.isLogin = false
        }
      })
    },
    goProfile (id) {
      wx.navigateTo({
        url: `/pages/profileIndex/main?uid=${id}`
      })
    }
  },
  watch: {
    userData (val) {
      this.data = val
    }
  }
}
</script>
<style scoped lang="less">
@import "../../common/icon/iconfont.css";
@import "../../common/style/index";

.wrapper {
  .base-info {
    // padding: 10px;
    .avatar-item {
      display: flex;
      align-items: center;
      padding: 10px;
      justify-content: space-between;
      background: @color-item-background;
      .avatar-block {
        .avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .name {
          margin-top: 10px;
          font-size: @font-size-medium-x;
          color: @color-text-x;
        }
      }
      .icon-jinru {
        color: @color-text-s;
        font-size: @font-size-large-x;
      }
    }
  }
  .toLogin {
    font-size: @font-size-medium-x;
    color: @color-text-s;
  }
}
</style>
