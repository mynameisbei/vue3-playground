<template>
  <div class="app-files">
    <el-button @click="handleSelectDir">选择目录</el-button>
    <el-table :data="tableData" row-key="id">
      <el-table-column
        prop="isDirectory"
        label="icon"
        width="50"
        class-name="app-files__icon"
      >
        <template #default="{ row }">
          <folder-icon
            v-if="row.isDirectory"
            class="app-files__file-icon"
          ></folder-icon>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="文件名" min-width="180" />
      <el-table-column prop="lastModify" label="上次修改时间" min-width="180">
        <template #default="{ row }">
          {{ dateFormatter(row) }}
        </template>
      </el-table-column>
      <el-table-column prop="size" label="大小(字节)" min-width="180" />
      <el-table-column prop="operation" label="操作" min-width="180">
        <template #default="{ row }">
          <app-files-operation
            :file="row"
            @rename="handleRenameEvent(row, $event)"
            @delete="handleDeleteEvent(row)"
          ></app-files-operation>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import dayjs from 'dayjs';
import { useFileSystem } from '../composable/fileSystem';
import { AppFile } from '../types';
import FolderIcon from '../assets/icons/default_folder.svg?component';
import { getUUID } from '../utils';
import AppFilesOperation from '../components/app-files-operation.vue';

export default defineComponent({
  name: 'Files',
  components: {
    FolderIcon,
    AppFilesOperation,
  },
  setup() {
    const {
      selectDirectory,
      getDirInfo,
      handleRename,
      isFileHandle,
      handleDelete,
    } = useFileSystem();
    const tableData = ref<AppFile[]>([]);

    const initFileInfo = async () => {
      const result = await getDirInfo();
      const data: AppFile[] = [];
      for await (let handle of result) {
        const id = getUUID();
        // eslint-disable-next-line no-undef
        if (isFileHandle(handle)) {
          const file = await handle.getFile();
          data.push({
            id,
            origin: file,
            name: file.name,
            isDirectory: false,
            lastModify: file.lastModified,
            size: file.size,
            handle,
          });
        } else {
          data.push({
            id,
            name: handle.name,
            isDirectory: true,
            lastModify: null,
            size: null,
          });
        }
      }

      tableData.value = data;
    };

    const handleSelectDir = async () => {
      await selectDirectory();
      await initFileInfo();
    };

    const dateFormatter = (row: AppFile): string => {
      if (row.lastModify) {
        return dayjs(row.lastModify).format('YYYY-MM-DD hh:mm:ss');
      } else {
        return '';
      }
    };

    const handleRenameEvent = async (row: AppFile, name: string) => {
      const { origin } = row;
      await handleRename(name, origin!);
      initFileInfo();
    };

    const handleDeleteEvent = async (row: AppFile) => {
      await handleDelete(row.name);
      initFileInfo();
    };

    return {
      tableData,
      handleSelectDir,
      dateFormatter,
      handleRenameEvent,
      handleDeleteEvent,
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
  &__icon {
    .cell {
      display: flex;
    }
  }
}
</style>
