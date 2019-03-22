<template>
  <div class="wrapper">
    <div
      v-for="(item,index) in list"
      :key="index"
      class="list-item"
    >
      <a
        class="user"
        :href="'/pages/profileIndex/main?uid='+item.user.userId"
      >
        <img
          :src="item.user.avatarUrl"
          alt=""
        >
        <div class="text">
          <p>{{item.user.nickname}}</p>
          <p>{{item._eventTime}}</p>
        </div>
      </a>
      <div class="content-text">{{item._json.msg}}</div>
      <div class="imgs">
        <div class="imgs-wrapper">
          <div
            class="imgs-lis"
            v-for="(its,inx) in item.pics"
            :key="inx"
          ><img
              mode="widthFix"
              :src="its.squareUrl"
              alt=""
            ></div>
        </div>
      </div>
      <div
        class="videos"
        v-if="item._json.video"
        @click="_getEventsVideo(item._json.video.videoId, ('v-'+index))"
      >
        <video
          class="vid"
          :id="'v-'+index"
          :src="urls.url"
          :duration="item._json.video.duration"
          :poster="item._json.video.coverUrl"
        ></video>
      </div>
    </div>
  </div>
</template>
<script>
import config from '@/config'
import { getEventsVideo } from '@/api/friend'
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      urls: {}
    }
  },
  computed: {
    root () {
      return config.baseUrl.root
    }
  },
  methods: {
    _getEventsVideo (id, vd) {
      getEventsVideo(id).then(res => {
        let { code, urls } = res
        if (code === 200) {
          this.urls = urls[0]
          setTimeout(() => {
            this.videoContext = wx.createVideoContext(vd)
            this.videoContext.play()
          }, 10)
        }
      })
    }
  }
}
</script>
<style scoped lang="less">
@import "../common/style/index";

.wrapper {
  color: @color-text;
  width: 100%;
  padding: 0 10px 10px;
  .list-item {
    .user {
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 8px;
      }
      .text {
        p {
          color: @color-text-s;
          font-size: @font-size-small;
          padding-bottom: 2px;
          &:nth-child(2) {
            color: @color-gray;
            font-size: @font-size-small-s;
          }
        }
      }
    }
    .content-text {
      color: @color-text-s;
      font-size: @font-size-medium;
    }
    .imgs {
      padding: 8px 0;
      .imgs-wrapper {
        margin: auto;
        display: grid;
        grid-template-columns: 33.3% 33.3% 33.3%;
        .imgs-lis {
          font-size: 0;
          margin-right: 4px;
          margin-bottom: 4px;
          img {
            border-radius: 3px;
            width: 100%;
          }
        }
      }
    }
    .videos {
      width: 100%;
      .vid {
        width: 100%;
      }
    }
  }
}

.line {
  .bor-b();
  font-size: @font-size-medium-x;
  padding: 10px;
  color: @color-text-s;
}
</style>

