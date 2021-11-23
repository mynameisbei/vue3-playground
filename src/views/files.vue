<template>
  <div class="app-files">
    <el-button @click="handleSelectDir">选择目录</el-button>
    <el-table :data="tableData">
      <el-table-column prop="isDirectory" label="" width="180">
        <template #default="{ row }">
          <folder-icon
            v-if="row.isDirectory"
            class="app-files__file-icon"
          ></folder-icon>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="文件名" width="180" />
      <el-table-column prop="lastModify" label="上次修改时间" width="180">
        <template #default="{ row }">
          {{ dateFormatter(row) }}
        </template>
      </el-table-column>
      <el-table-column prop="size" label="大小" width="180" />
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import dayjs from 'dayjs';
import { useFileSystem } from '../composable/fileSystem';
import { AppFile } from '../types';
import FolderIcon from '../assets/icons/default_folder.svg?component';

export default defineComponent({
  name: 'Files',
  components: {
    FolderIcon,
  },
  setup() {
    const { selectDirectory, getDirInfo } = useFileSystem();
    const tableData = ref<AppFile[]>([]);

    const handleSelectDir = async () => {
      await selectDirectory();
      const result = await getDirInfo();
      const data: AppFile[] = [];
      for await (let handle of result) {
        // eslint-disable-next-line no-undef
        if (handle instanceof FileSystemFileHandle) {
          const file = await handle.getFile();
          data.push({
            name: file.name,
            isDirectory: false,
            lastModify: file.lastModified,
            size: file.size,
          });
        } else {
          data.push({
            name: handle.name,
            isDirectory: true,
            lastModify: null,
            size: null,
          });
        }
      }

      tableData.value = data;
    };

    const dateFormatter = (row: AppFile): string => {
      if (row.lastModify) {
        return dayjs(row.lastModify).format('YYYY-MM-DD hh:mm:ss');
      } else {
        return '';
      }
    };

    return {
      tableData,
      handleSelectDir,
      dateFormatter,
    };
  },
});
</script>

<style lang="scss">
.app-files {
  &__file-icon {
    $r: 30px;
    width: $r;
    height: $r;
  }
}
</style>
