<template>
  <div class="wrapper">
    <div class="background-cover">
      <div class="mask-cover"></div>
      <img
        :src="data.backgroundUrl"
        alt=""
      >
    </div>
    <div class="base-info">
      <div class="avatar">
        <img
          :src="data.avatarUrl"
          alt=""
        >
      </div>
      <div class="name">{{data.nickname}}</div>
      <div class="followers-desc">
        <span>关注&nbsp;{{data.follows}}</span>
        <span>&nbsp;|&nbsp;</span>
        <span>粉丝&nbsp;{{data.followeds}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { getDetail, getUserSongList } from '@/api/user'

export default {
  data () {
    return {
      data: {}
    }
  },
  onLoad () {
    this.data = {}
    wx.showLoading({
      title: '玩命加载中'
    })
  },
  computed: {
    uid () {
      return this.$root.$mp.query.uid
    }
  },
  mounted () {
    this._getDetail(this.uid)
    this._getUserSongList(this.uid)
  },
  methods: {
    _getDetail (id) {
      getDetail(id).then(res => {
        let { code, profile } = res
        if (code === 200) {
          this.data = profile
          wx.hideLoading()
        }
      })
    },
    _getUserSongList (id) {
      getUserSongList(id).then(res => {

      })
    }
  }
}
</script>
<style scoped lang="less">
@import "../../common/icon/iconfont.css";
@import "../../common/style/index";

.wrapper {
  color: @color-text;
  .background-cover {
    width: 100vw;
    height: 70vw;
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    font-size: 0;
    z-index: -1;
    .mask-cover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 0;
    }
    img {
      position: absolute;
      top: -20px;
      left: 0;
      width: 100%;
      height: 100vw;
      z-index: -1;
    }
  }
  .base-info {
    margin: 100px 10px 40px;
    padding: 0 10px;
    .avatar {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      margin: 10px 0 6px;
      font-size: @font-size-medium-x;
      color: @color-text-x;
    }
    .followers-desc {
      color: @color-text-x;
      font-size: @font-size-small;
    }
  }
}
</style>
