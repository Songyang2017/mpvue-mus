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
      <div
        class="playlist-title"
        @click="goMusList"
      >推荐歌单
        <icon class="iconfont icon-jinru"></icon>
      </div>
      <div class="playlist-wrapper">
        <div
          v-for="(item, index) in playlists"
          :key="index"
          class="playlist-item"
        >
          <img
            @click="goDetail(item.id)"
            :src="item.picUrl"
            alt=""
          >
          <div class="playlist-name">{{item.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getBanner, getRecommendPlayLists } from '@/api/recommend'
export default {
  data () {
    return {
      banners: [],
      playlists: []
    }
  },
  mounted () {
    this._getBanner()
    this._getRecommendPlayLists()
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
    _getRecommendPlayLists () {
      getRecommendPlayLists().then(res => {
        let { result, code } = res
        if (code === 200) {
          let _result = result.filter((v, i) => { return i % 2 === 0 && i < 12 })
          this.playlists = _result
        }
      })
    },
    goMusList () {
      wx.navigateTo({
        url: `/pages/music-list/main`
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
          height: 66rpx;
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
