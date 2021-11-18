<template>
  <div>
    <el-button @click="handleSelectDir">选择目录</el-button>
    <el-table :data="tableData">
      <el-table-column prop="name" label="文件名" width="180" />
      <el-table-column prop="isDirectory" label="目录" width="180" />
      <el-table-column prop="lastModify" label="上次修改时间" width="180" />
      <el-table-column prop="size" label="大小" width="180" />
    </el-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useFileSystem } from '../composable/fileSystem';
import { AppFile } from '../types';

export default defineComponent({
  name: 'Files',
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
            isDirectory: true,
            lastModify: file.lastModified,
            size: file.size,
          });
        } else {
          data.push({
            name: handle.name,
            isDirectory: false,
            lastModify: null,
            size: null,
          });
        }
      }

      tableData.value = data;
    };

    return {
      tableData,
      handleSelectDir,
    };
  },
});
</script>
