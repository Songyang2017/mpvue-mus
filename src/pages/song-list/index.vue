<template>
  <div class="box">
    <maskTip
      v-if="showTip"
      @close="closeMask"
      :msg="playlist"
    ></maskTip>
    <div class="top">
      <img
        :src="playlist.coverImgUrl"
        class="background-top"
        alt=""
      >
      <div class="top-title">
        <div class="left">
          <img
            @click="openMask"
            :src="playlist.coverImgUrl"
            alt=""
          >
        </div>
        <div
          class="right"
          @click="goProfile(playlist.userId)"
        >
          <p class="name">{{playlist.name}}</p>
          <div class="builder">
            <img
              :src="creator.avatarUrl"
              class="avatar"
              alt=""
            >
            <text>{{creator.nickname}}</text>
            <i class="icon-jinru iconfont"></i>
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
          :key="index"
          @click="goPlay(item.id)"
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
import maskTip from '@/components/maskTip'

export default {
  data () {
    return {
      list: [],
      creator: {},
      playlist: {},
      showTip: false,
      isJump: true
    }
  },
  onLoad () {
    this.list.length = 0
    this.playlist = {}
    this.creator = {}
    this.showTip = false
    wx.showLoading({
      title: '玩命加载中'
    })
  },
  onShow () {
    this.isJump = true
  },
  mounted () {
    let id = this.$root.$mp.query.id
    this._getPlayListsDetail(id)
  },
  components: {
    maskTip
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
    },
    goProfile (id) {
      if (this.isJump) {
        // console.log('id', id, `/pages/profileIndex/main?uid=${id}`)
        wx.navigateTo({
          url: `/pages/profileIndex/main?uid=${id}`
        })
      }
    },
    goPlay (id) {
      console.log(id)
      let url = `https://music.163.com/song/media/outer/url?id=${id}.mp3 `
      const innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.autoplay = true
      innerAudioContext.src = url
    },
    openMask () {
      this.showTip = true
    },
    closeMask () {
      this.showTip = false
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
          color: @color-text-s;
          img {
            width: 45rpx;
            height: 45rpx;
            border-radius: 50%;
          }
          text {
            margin-left: 10rpx;
            font-size: @font-size-medium;
          }
          .icon-jinru {
            font-size: 14px;
            transform: translate3d(0, 3rpx, 0);
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
