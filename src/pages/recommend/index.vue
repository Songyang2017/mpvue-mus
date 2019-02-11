<template>
  <div class="wrapper">
    <div
      class="swipper"
      v-if="banners.length"
    >
      <swiper
        indicator-dots="true"
        indicator-color="rgba(0,0,0, 0.3)"
        indicator-active-color="#ba1912"
        autoplay="true"
        interval="3000"
        circular="true"
        duration="500"
        class="swiper-container"
      >
        <block
          v-for="(item, index) in banners"
          :key="index"
        >
          <swiper-item class="swiper-item">
            <img
              :src="item.imageUrl"
              class="slide-image"
            />
          </swiper-item>
        </block>
      </swiper>
    </div>
    <div class="playlist">
      <div class="playlist-title">推荐歌单</div>
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
  </div>
</template>
<script>
import { getBanner, getPlayLists } from '@/api/recommend'
export default {
  data () {
    return {
      banners: [],
      playlists: []
    }
  },
  mounted () {
    this._getBanner()
    this._getPlayLists(6, 'hot')
  },
  methods: {
    _getBanner () { // 获取banners
      getBanner().then(res => {
        let { banners, code } = res
        if (code === 200) {
          this.banners = banners
        }
      })
    },
    _getPlayLists (num, key) { // 获取推荐歌单列表
      getPlayLists(num, key).then(res => {
        let { playlists, code } = res
        if (code === 200) {
          this.playlists = playlists
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
@import "../../common/style/index";

.wrapper {
  color: @color-text;
  .swipper {
    margin: 10rpx;
    border-radius: 10rpx;
    overflow: hidden;
    height: 278rpx;
    .swiper-container {
      height: 100%;
      .swiper-item {
        .slide-image {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .playlist {
    .playlist-title {
      font-size: @font-size-medium;
      padding: 5rpx 10rpx;
    }
    .playlist-wrapper {
      width: 100%;
      font-size: 0;
      .playlist-item {
        display: inline-block;
        padding: 10rpx 5rpx;
        width: 250rpx;
        &:nth-child(1),
        &:nth-child(4) {
          padding-left: 10rpx;
        }
        img {
          border-radius: 6rpx;
          width: 100%;
          height: 238rpx;
        }
        .playlist-name {
          width: 100%;
          padding: 5rpx 0;
          .multiEllipsis(2);
          font-size: @font-size-small;
          color: @color-gray;
        }
      }
    }
  }
}
</style>
