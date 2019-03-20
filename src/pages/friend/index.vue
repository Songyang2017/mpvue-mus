<template>
  <div class="wrapper">
    <div
      v-for="(item,index) in list"
      :key="index"
      v-if="isLogin"
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
        <span>{{item.user.nickname}}</span>
      </a>
      <div class="content-text">{{item._json.msg}}</div>
      <div class="imgs">
        <div
          class="imgs-lis"
          v-for="(its,inx) in item.pics"
          :key="inx"
        ><img
            :src="its.squareUrl"
            alt=""
          ></div>
      </div>
    </div>
    <a
      href="/pages/login/main"
      v-if="!isLogin"
      class="line"
    >去登录</a>
  </div>
</template>
<script>
import { getFriendsEvents } from '@/api/friend'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      list: []
    }
  },
  onShow () {
    this._getFriendsEvents()
  },
  mounted () {
    // this._getFriendsEvents()
  },
  computed: {
    ...mapState([
      'isLogin'
    ])
  },
  methods: {
    _getFriendsEvents () {
      getFriendsEvents().then(res => {
        let { code, event } = res
        if (code === 200) {
          event.forEach(v => { v._json = JSON.parse(v.json) })
          this.list = event
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
  width: 100%;
  padding: 0 10px 10px;
  .list-item {
    .user {
      margin-bottom: 8px;
      img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        vertical-align: middle;
        margin-right: 8px;
      }
      span {
        color: @color-text-s;
        font-size: @font-size-small;
      }
    }
    .content-text {
      color: @color-text-s;
      font-size: @font-size-medium;
    }
    .imgs {
      display: grid;
      grid-template-columns: 30vw 30vw 30vw;
      .imgs-lis {
        font-size: 0;
        img {
          width: 30vw;
          height: 30vw;
        }
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

