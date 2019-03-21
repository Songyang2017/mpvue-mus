<template>
  <div class="wrapper">
    <div
      class="base-info"
      v-if="isLogin"
    >
      <div
        class="avatar-item"
        @click="goProfile(userData.userId)"
      >
        <div class="avatar-block">
          <div class="avatar">
            <img
              :src="userData.avatarUrl"
              alt=""
            >
          </div>
          <div class="name">{{userData.nickname}}</div>
        </div>
        <i class="iconfont icon-jinru"></i>
      </div>
    </div>
    <a
      href="/pages/login/main"
      v-if="!isLogin"
      class="line"
    >登录</a>
    <div
      v-if="isLogin"
      class="line"
      @click="goLogout"
    >退出登录</div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
// import { loginStatus, getDetail } from '@/api/user'

export default {
  data () {
    return {
      userInfo: ''
    }
  },
  onShow () {

  },
  computed: {
    ...mapState([
      'userData',
      'userId',
      'isLogin'
    ])
  },
  methods: {
    ...mapMutations([
      'setToken'
    ]),
    getUserInfo () {
      // 调用登录接口
      wx.login({
        success: (ret) => {
          console.log('ret', ret)
          wx.getUserInfo({
            lang: 'zh_CN',
            success: (res) => {
              this.userInfo = res.userInfo
              // console.log(res)
            }
          })
        }
      })
    },
    goProfile (id) {
      wx.navigateTo({
        url: `/pages/profileIndex/main?uid=${id}`
      })
    },
    goLogout () {
      this.setToken('')
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
  .line {
    .bor-b();
    font-size: @font-size-medium-x;
    padding: 10px;
    color: @color-text-s;
  }
}
</style>
