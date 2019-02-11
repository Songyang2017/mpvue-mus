<template>
  <div class="playlist">
    <!-- <div class="playlist-title">推荐歌单
      <icon class="iconfont icon-jinru"></icon>
    </div> -->
    <div class="playlist-wrapper">
      <div
        v-for="(item, index) in playlists"
        :key="index"
        class="playlist-item"
      >
        <img
          @click="goDetail(item.id)"
          :src="item.coverImgUrl"
          alt=""
        >
        <div class="playlist-name">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { getPlayLists } from '@/api/recommend'
export default {
  data () {
    return {
      playlists: []
    }
  },
  onLoad () {
    this.playlists.length = 0
    wx.showLoading({
      title: '加载中'
    })
  },
  mounted () {
    this._getPlayLists(10, 'hot', 0)
  },
  methods: {
    _getPlayLists (num, key, pageNo) { // 获取推荐歌单列表
      getPlayLists(num, key, pageNo).then(res => {
        let { playlists, code } = res
        if (code === 200) {
          this.playlists = playlists
          wx.hideLoading()
        }
      })
    },
    goDetail (id) { // 进入歌单详情
      wx.navigateTo({
        url: `/pages/song-list/main?id=${id}`
      })
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
      // &:nth-child(1),
      // &:nth-child(4) {
      //   padding-left: 10rpx;
      // }
      img {
        border-radius: 6rpx;
        width: 100%;
        height: 370rpx;
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
</style>
