<template>
  <div class="app__header">
    <el-breadcrumb :separator-icon="ArrowRight">
      <el-breadcrumb-item
        v-for="item in breadcrumbs"
        :key="item.path"
        :to="item"
        >{{ item.value }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { ArrowRight } from '@element-plus/icons';
import { defineComponent, computed } from 'vue';
import { useAppMenu } from '../composable/appMenu';
import { AppBreadcrumb } from '../types';

export default defineComponent({
  name: 'AppHeader',
  setup() {
    const { currentMenu } = useAppMenu();
    const breadcrumbs = computed<AppBreadcrumb[]>(() => {
      return [
        {
          path: '/' + currentMenu.value.route,
          value: currentMenu.value.name,
        },
      ];
    });

    return {
      ArrowRight,
      breadcrumbs,
    };
  },
});
</script>

<style lang="scss">
.app__header {
  height: 100%;
  display: flex;
  align-items: center;
}
</style>
