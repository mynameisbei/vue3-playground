<template>
  <div class="app">
    <el-config-provider :locale="locale">
      <el-container class="app__container">
        <el-aside class="app__aside">
          <aside-menu></aside-menu>
        </el-aside>
        <el-container>
          <el-header>
            <app-header></app-header>
          </el-header>
          <el-main>
            <router-view> </router-view>
          </el-main>
        </el-container>
      </el-container>
    </el-config-provider>
  </div>
</template>

<script lang="ts">
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import { defineComponent } from 'vue';
import AsideMenu from './components/aside-menu.vue';
import AppHeader from './components/app-header.vue';

export default defineComponent({
  name: 'App',
  components: {
    AsideMenu,
    AppHeader,
  },
  setup() {
    return {
      locale: zhCn,
    };
  },
});
</script>

<style lang="scss">
.app {
  &__container {
    height: 100vh;
  }
  &__aside {
    width: 250px;
  }
}
</style>
