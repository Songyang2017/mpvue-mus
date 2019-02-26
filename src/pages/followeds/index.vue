<template>
  <div class="wrapper">

    <div class="mus">
      <div
        class="mus-wrapper"
        v-for="its in list"
      >
        <div
          class="mus-content"
          @click="goProfile(its.userId)"
        >
          <img
            :src="its.avatarUrl"
            alt=""
          >
          <span>{{its.nickname}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getUserFolloweds } from '@/api/user'
export default {
  data () {
    return {
      list: [],
      isJump: true
    }
  },
  onLoad () {
    this.list = []
  },
  onShow () {
    this.isJump = true
  },
  mounted () {
    let uid = this.$root.$mp.query.uid
    this._getUserFolloweds(uid)
  },
  methods: {
    _getUserFolloweds (uid) {
      getUserFolloweds(uid).then(res => {
        let { code, followeds } = res
        if (code === 200) {
          this.list = followeds
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
    }
  }
}
</script>
<style scoped lang="less">
@import "../../common/style/index";

.wrapper {
  color: @color-text;
  .mus {
    padding: 15px 10px;
    .mus-wrapper {
      margin-bottom: 10px;
      &:last-child {
        margin-bottom: 0;
      }
      .mus-content {
        display: flex;
        img {
          width: 50px;
          height: 50px;
        }
        span {
          margin-left: 10px;
          color: @color-text-x;
          font-size: @font-size-medium;
        }
      }
    }
  }
}
</style>

