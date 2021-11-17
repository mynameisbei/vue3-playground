<template>
  <div class="app">
    <el-config-provider :locale="locale">
      <el-container class="app__container">
        <el-aside class="app__aside">
          <aside-menu></aside-menu>
        </el-aside>
        <el-container>
          <el-header>Header</el-header>
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

export default defineComponent({
  name: 'App',
  components: {
    AsideMenu,
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
