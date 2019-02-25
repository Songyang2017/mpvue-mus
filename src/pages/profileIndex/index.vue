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
      <div class="signature">{{data.signature}}</div>
    </div>
    <div class="bot">
      <div class="active-tab">音乐</div>
      <div>动态</div>
      <div>关于TA</div>
    </div>
    <div class="mus">
      <div
        class="mus-wrapper"
        v-for="its in playList"
      >
        <img
          :src="its.coverImgUrl"
          alt=""
        >
        <span>{{its.name}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { getDetail, getUserSongList } from '@/api/user'
import { mapState } from 'vuex'

export default {
  data () {
    return {
      data: {},
      playList: [],
      isHostUser: false // 所进主页是否为用户自己的，true则是，false不是
    }
  },
  onLoad () {
    this.data = {}
    this.playList.length = 0
    wx.showLoading({
      title: '玩命加载中'
    })
  },
  mounted () {
    let _uid = this.$root.$mp.query.uid
    this._getDetail(_uid)
    this._getUserSongList(_uid)
  },
  computed: {
    ...mapState([
      'userId'
    ])
  },
  methods: {
    _getDetail (id) {
      getDetail(id).then(res => {
        let { code, profile } = res
        if (code === 200) {
          this.isHostUser = this.userId === profile.userId
          this.data = profile
          if (this.isHostUser) {
            this.data.signature = this.data.signature || '咦？小主还没签名呢,快去写吧！'
          } else {
            this.data.signature = this.data.signature || '小主太懒，木有签名哦！'
          }
          wx.hideLoading()
        }
      })
    },
    _getUserSongList (id) {
      getUserSongList(id).then(res => {
        let { code, playlist } = res
        if (code === 200) {
          this.playList = playlist
        }
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
    margin: 100px 10px 20px;
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
      .multiEllipsis(1);
    }
    .followers-desc {
      color: @color-text-x;
      font-size: @font-size-small;
    }
    .signature {
      margin: 10px 0 6px;
      font-size: @font-size-medium;
      color: @color-text-x;
      .multiEllipsis(1);
    }
  }
  .bot {
    width: 100%;
    color: @color-text-x;
    display: flex;
    align-items: center;
    div {
      flex: 1;
      text-align: center;
      font-size: @font-size-medium-x;
    }
  }
  .mus {
    padding: 15px 10px;
    .mus-wrapper {
      display: flex;
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
      img {
        width: 50px;
        height: 50px;
      }
      span {
        margin-left: 10px;
        color: @color-text-x;
        font-size: @font-size-medium;
      }
    }
  }
}
.active-tab {
  color: @color-text-d;
  position: relative;
  &:after {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: @color-text-d;
  }
}
</style>
