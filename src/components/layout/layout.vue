<template>
  <div class="home">
    <div class="home-container">
      <div class="home-container__menu">
        <div class="home-container__info">
          <div class="home-container__user">
            <img src="./avatar.jpg" alt="" width="70" height="70" class="home-container__user--img">
          </div>
          <el-dropdown trigger="click" class="home-container__user--name">
              <span class="el-dropdown-link">
                Admin<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-circle-close-outline">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </div>
        <div>
          <layout-menu></layout-menu>
        </div>
      </div>
      <div class="home-container__content" id="content">
        <div class="home-container__content--header">
          <div class="home-header">
            <div class="home-header__logo">
              <layout-bread></layout-bread>
            </div>
            <div class="home-header__nav">
              <icon href="#iconxitongguanlitianchong"></icon>
            </div>
          </div>
          
        </div>
        <div class="home-container__view">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { getUser } from '../api/user.js'
import LayoutMenu from './layoutMenu'
import LayoutBread from './layoutBread'
import Icon from '@/components/m-icon/m-icon'

export default {
  components: {
    LayoutMenu,
    LayoutBread,
    Icon
  },
  name: 'home'
}
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &-header {
    height: 66px;
    flex: 0 0 66px;
    // background: #000;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    &__logo {
      // width: 210px;
      // height: 100%;
      // flex: 0 0 210px;
      // background: #000;
      // color: #eee;
      // align-items: center;
      // justify-content: center;
      // font-size: 48px;
      // text-align: center;
      // line-height: 80px;
    }

    &__nav {
      padding: 0 40px;
      display: flex;
      align-items: center;
    }
  }

  &-container {
    flex: 1;
    overflow: auto;
    background: #E7EBF7;
    display: flex;

    &__menu {
      width: 210px;
      background: #dae5fc;
    }

    &__info {
      padding: 30px;
      box-sizing: border-box;
      width: 100%;
      height: 210px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    &__content {
      background: #f3f4fc;
      overflow: auto;
      flex: 1;
      display: flex;
      flex-direction: column;

      &--header {
        // margin: 15px;
      }
    }

    &__view {
      flex: 1;
      padding: 0 20px 20px 20px;
    }

    &__user {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &--img {
        border-radius: 50%;
      }
      &--name {
        margin-top: 15px;
      }
      .el-dropdown {
        font-size: 18px;
      }
    }

    &__icon {
      margin-top: 25px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
