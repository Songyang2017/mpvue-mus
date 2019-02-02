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
            <image
              :src="item.imageUrl"
              class="slide-image"
            />
          </swiper-item>
        </block>
      </swiper>
    </div>
  </div>
</template>
<script>
import { getBanner } from '@/api/recommend'
export default {
  data () {
    return {
      banners: []
    }
  },
  mounted () {
    this._getBanner()
  },
  methods: {
    _getBanner () {
      getBanner().then(res => {
        let { banners, code } = res
        if (code === 200) {
          this.banners = banners
        }
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
}
</style>
