<template>
  <div>
    <el-menu router :default-active="currentMenu.route">
      <el-menu-item v-for="menu in menus" :key="menu.route" :index="menu.route">
        <el-icon>
          <component :is="menu.icon"></component>
        </el-icon>
        <span>{{ menu.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { AppMenu, MenuRoute } from '../types';
import {
  Files,
  PictureFilled,
  Collection,
  MessageBox,
  Share,
  Delete,
} from '@element-plus/icons';
import { useRoute } from 'vue-router';

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
    const menus = ref<AppMenu[]>([
      {
        name: '文件',
        route: MenuRoute.file,
        icon: 'files',
      },
      {
        name: '相册',
        route: MenuRoute.photo,
        icon: 'picture-filled',
      },
      {
        name: '收藏夹',
        route: MenuRoute.collection,
        icon: 'collection',
      },
      {
        name: '保险箱',
        route: MenuRoute.coffer,
        icon: 'message-box',
      },
      {
        name: '我的分享',
        route: MenuRoute.share,
        icon: 'share',
      },
      {
        name: '回收站',
        route: MenuRoute.recycle,
        icon: 'delete',
      },
    ]);
    const route = useRoute();
    const currentMenu = ref<AppMenu>(menus.value[0]);

    const findMenuByRoute = (route: string) => {
      return menus.value.find((item) => item.route === route)!;
    };

    watch(
      () => route.name,
      (val) => {
        if (val) {
          currentMenu.value = findMenuByRoute(val as string);
        }
      },
    );

    return {
      menus,
      currentMenu,
    };
  },
});
</script>
