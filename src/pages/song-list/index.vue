<template>
  <div class="box">
    <div class="top">
      <img
        :src="playlist.coverImgUrl"
        class="background-top"
        alt=""
      >
      <div class="top-title">
        <div class="left">
          <img
            :src="playlist.coverImgUrl"
            alt=""
          >
        </div>
        <div class="right">
          <p class="name">{{playlist.name}}</p>
          <div class="builder">
            <img
              :src="creator.avatarUrl"
              class="avatar"
              alt=""
            >
            <text>{{creator.nickname}}</text>
          </div>
        </div>
      </div>
      <div class="top-funcs">
        <div class="icon-wrapper">
          <icon class="iconfont icon-pinglun"></icon>
          <p>{{playlist.commentCount}}</p>
        </div>
        <div class="icon-wrapper">
          <icon class="iconfont icon-cc-share"></icon>
          <p>{{playlist.shareCount}}</p>
        </div>
        <div class="icon-wrapper">
          <icon class="iconfont icon-download"></icon>
          <p>下载</p>
        </div>
        <div class="icon-wrapper">
          <icon class="iconfont icon-duoxuan"></icon>
          <p>多选</p>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="list-wrapper">
        <div
          class="list-item"
          v-for="(item,index) in list"
        >
          <div class="ins">{{index+1}}</div>
          <div class="content">
            <div class="topic">
              <text class="name">{{item.name}}</text>
              &nbsp;
              <span
                class="alia"
                v-if="item.alia"
              >{{item.alia}}</span>
            </div>
            <div class="bot">
              <span
                v-for="(its, inx) in item.ar"
                :key="inx"
              >{{its.name}}&nbsp;</span>
              <span>-&nbsp;</span>
              <span>{{item.al.name}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getPlayListsDetail } from '@/api/other'

export default {
  data () {
    return {
      list: [],
      creator: {},
      playlist: {}
    }
  },
  onLoad () {
    this.list.length = 0
    this.playlist = {}
    this.creator = {}
    wx.showLoading({
      title: '玩命加载中'
    })
  },
  mounted () {
    let id = this.$root.$mp.query.id
    this._getPlayListsDetail(id)
  },
  methods: {
    _getPlayListsDetail (_id) {
      getPlayListsDetail(_id).then(res => {
        let { code, playlist: { creator, tracks } } = res
        if (code === 200) {
          this.playlist = res.playlist
          this.list = tracks
          this.creator = creator
          wx.hideLoading()
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
@import "../../common/icon/iconfont.css";
@import "../../common/style/index";
.box {
  .top {
    font-size: 0;
    width: 100%;
    height: 400rpx;
    position: relative;
    overflow: hidden;
    .background-top {
      width: 450rpx;
      height: 450rpx;
      position: absolute;
      transform: scale(2.8, 2.8);
      // transform-origin: top left;
      .filter(10px);
      top: 0;
      left: 0;
      z-index: -1;
      opacity: 0.8;
    }
    .top-title {
      display: flex;
      padding: 30rpx;
      .left {
        img {
          width: 230rpx;
          height: 230rpx;
        }
      }
      .right {
        margin-left: 30rpx;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        .name {
          font-size: @font-size-medium-x;
          color: @color-text-s;
        }
        .builder {
          font-size: 0;
          display: flex;
          align-items: center;
          img {
            width: 45rpx;
            height: 45rpx;
            border-radius: 50%;
          }
          text {
            margin-left: 10rpx;
            font-size: @font-size-medium;
            color: @color-text-s;
          }
        }
      }
    }
    .top-funcs {
      display: flex;
      justify-content: space-around;
      padding: 0 30rpx;
      .icon-wrapper {
        font-size: 0;
        color: @color-text-s;
        text-align: center;
        icon {
          font-size: 40rpx;
        }
        p {
          font-size: @font-size-medium;
        }
      }
    }
  }
  .bottom {
    .list-wrapper {
      font-size: 0;
      .list-item {
        display: flex;
        align-items: center;
        margin: 30rpx 20rpx;
        .ins {
          font-size: @font-size-medium;
          color: @color-gray;
        }
        .content {
          margin-left: 25rpx;
          .topic {
            .multiEllipsis(1);
            font-size: @font-size-medium-x;
            .name {
              color: @color-text-s;
            }
            .alia {
              color: @color-gray;
            }
          }
          .bot {
            .multiEllipsis(1);
            span {
              font-size: @font-size-small;
              color: @color-gray;
            }
          }
        }
      }
    }
  }
}
</style>
