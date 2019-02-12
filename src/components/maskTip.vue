<template>
  <div class="mask-box">
    <icon
      class="iconfont icon-guanbi"
      @click="close"
    ></icon>
    <div class="img">
      <img
        :src="msg.coverImgUrl"
        alt=""
      >
    </div>
    <div class="name">{{msg.name}}</div>
    <div class="tags">
      <div class="tags-text">标签：</div>
      <div
        class="tags-list"
        v-for="(its, inx) in msg.tags"
        :key="inx"
      >{{its}}</div>
    </div>
    <div class="description">
      <wxParse :content="msg.description"></wxParse>
    </div>
    <img
      :src="msg.coverImgUrl"
      alt=""
      class="background-top"
    >
    <div
      class="background-mask"
      @touchend.stop="close"
    ></div>
  </div>
</template>
<script>
import wxParse from 'mpvue-wxparse'

export default {
  props: {
    msg: {
      type: Object,
      default: null
    }
  },
  components: {
    wxParse
  },
  mounted () {
    // this.$refs.desc.innerHTML = this.msg.description
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>
<style scoped lang="less">
@import "../common/icon/iconfont.css";
@import "../common/style/index";
.mask-box {
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  .icon-guanbi {
    position: absolute;
    top: 5px;
    right: 18px;
    font-size: @font-size-medium-x;
    color: @color-text;
  }
  .background-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .background-top {
    width: 640rpx;
    height: 100%;
    position: absolute;
    transform: scale(2.8, 2.8);
    .filter(10px);
    top: 0;
    left: 0;
    z-index: -2;
  }
  .img {
    margin: 60px 0 25px;
    text-align: center;
    img {
      width: 375rpx;
      height: 375rpx;
    }
  }
  .name {
    margin: 0 0 30px;
    text-align: center;
    font-size: @font-size-medium-x;
    color: @color-text;
  }
  .tags {
    margin: 0 30px 10px;
    text-align: left;
    display: flex;
    align-items: center;
    .tags-text {
      font-size: @font-size-small;
      color: @color-text-s;
    }
    .tags-list {
      margin: 0 4px;
      border: 1px solid @color-text-s;
      padding: 1px 10px;
      border-radius: 25px;
      font-size: @font-size-small;
      color: @color-text-s;
    }
  }
  .description {
    margin: 0 30px 20px;
    text-align: left;
    font-size: @font-size-small;
    color: @color-text-s;
  }
}
</style>