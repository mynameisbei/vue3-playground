<template>
  <div class="h-full">
    <el-menu class="h-full" router :default-active="currentMenu.route">
      <el-menu-item v-for="menu in menus" :key="menu.route" :index="menu.route">
        <el-icon>
          <component :is="menu.icon"></component>
        </el-icon>
        <span class="select-none">{{ menu.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import {
  Files,
  PictureFilled,
  Collection,
  MessageBox,
  Share,
  Delete,
} from '@element-plus/icons';
import { useAppMenu } from '../composable/appMenu';

export default defineComponent({
  name: 'AsideMenu',
  components: {
    Files,
    PictureFilled,
    Collection,
    MessageBox,
    Share,
    Delete,
  },
  setup() {
    const { currentMenu, menus } = useAppMenu();

    return {
      currentMenu,
      menus,
    };
  },
});
</script>
