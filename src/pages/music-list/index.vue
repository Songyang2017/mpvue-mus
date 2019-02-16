<template>
  <div class="playlist">
    <div class="playlist-wrapper">
      <div
        v-for="(item, index) in playlists"
        :key="index"
        class="playlist-item"
      >
        <img
          @click="goDetail(item.id)"
          :src="item.coverImgUrl"
          lazy-load="true"
          alt=""
        >
        <div class="playlist-name">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getPlayLists } from '@/api/recommend'
import DEFAULT_IMG from '@/common/img/default.png'

const PAGE_SIZE = 10
export default {
  data () {
    return {
      playlists: [],
      pageIndex: 0,
      total: 0,
      isJump: true,
      defaultImg: DEFAULT_IMG
    }
  },
  onLoad () {
    this.playlists.length = 0
    this.pageIndex = 0
    this.total = 0
  },
  onShow () {
    this.isJump = true
  },
  onReachBottom () {
    this.pageIndex += PAGE_SIZE
    if (this.total !== 0 && this.total > this.playlists.length) {
      this._getPlayLists(PAGE_SIZE, 'hot', this.pageIndex)
    } else {
      wx.showToast({
        title: '到底啦！',
        icon: 'none',
        duration: 2000
      })
    }
  },
  mounted () {
    this._getPlayLists(PAGE_SIZE, 'hot', this.pageIndex)
  },
  methods: {
    _getPlayLists (num, key, pageNo) { // 获取推荐歌单列表
      wx.showLoading({
        title: '玩命加载中'
      })
      getPlayLists(num, key, pageNo).then(res => {
        let { playlists, code, total } = res
        if (code === 200) {
          this.playlists = this.playlists.concat(playlists)
          this.total = total

          // this.total = 20
          // console.log(this.playlists)
          wx.hideLoading()
        }
      })
    },
    goDetail (id) { // 进入歌单详情
      if (this.isJump) {
        this.isJump = false
        wx.navigateTo({
          url: `/pages/song-list/main?id=${id}`,
          success: res => {
            this.isJump = false
          }
        })
      }
    }
  }
}
</script>
<style scoped lang="less">
@import "../../common/icon/iconfont.css";
@import "../../common/style/index";
.playlist {
  .playlist-title {
    font-size: @font-size-medium-x;
    padding: 5rpx 10rpx;
    margin-bottom: 10rpx;
    // display: flex;
    // align-items: center;
    .icon-jinru {
      // transform: translateY(-10%);
      color: @color-text-s;
      font-size: 30rpx;
    }
  }
  .playlist-wrapper {
    width: 100%;
    font-size: 0;
    .playlist-item {
      display: inline-block;
      padding: 10rpx 5rpx 25rpx;
      width: 375rpx;
      img {
        border-radius: 6rpx;
        width: 100%;
        height: 370rpx;
        -moz-box-shadow: 5px 5px 5px #000 inset; /* For Firefox3.6+ */
        -webkit-box-shadow: 5px 5px 5px #000 inset; /* For Chrome5+, Safari5+ */
        box-shadow: 5px 5px 5px #000 inset;
      }
      .playlist-name {
        width: 100%;
        height: 66rpx;
        padding: 5rpx 0;
        .multiEllipsis(2);
        font-size: @font-size-small;
        color: @color-gray;
      }
    }
  }
}
.hide {
  display: none;
}
</style>
