<template>
  <div class="app-files__operation">
    <template v-if="isOperating">
      <div class="app-files__operation__rename">
        <el-input
          v-model="currentName"
          class="app-files__operation__new-name"
        ></el-input>
        <el-button type="primary" size="mini" @click="handleRenameConfirm"
          >确认</el-button
        >
        <el-button size="mini" @click="handleRenameCancel">取消</el-button>
      </div>
    </template>
    <template v-else>
      <div>
        <!--  button disabled属性会阻止事件，不能触发tooltip -->
        <el-tooltip :disabled="!renameDisabled" content="不支持目录重命名">
          <el-button
            :class="{ 'is-disabled': renameDisabled }"
            size="mini"
            @click="handleRename"
            >重命名</el-button
          >
        </el-tooltip>
        <el-button type="danger" size="mini" @click="handleDelete"
          >删除</el-button
        >
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, computed } from 'vue';
import { AppFile, AppFileOperation } from '../types';
import { ElMessageBox } from 'element-plus';

export default defineComponent({
  name: 'AppFilesOperation',
  props: {
    file: {
      type: Object as PropType<AppFile>,
      required: true,
    },
  },
  emits: ['rename', 'delete'],
  setup(props, { emit }) {
    const status = ref(AppFileOperation.normal);
    const currentName = ref(props.file.name);

    const isOperating = computed(() => {
      return status.value !== AppFileOperation.normal;
    });

    const isRenaming = computed(() => {
      return status.value === AppFileOperation.rename;
    });

    const renameDisabled = computed(() => {
      return props.file.isDirectory;
    });

    const handleRename = () => {
      if (!renameDisabled.value) {
        status.value = AppFileOperation.rename;
      }
    };

    const setNormalStatus = () => {
      status.value = AppFileOperation.normal;
    };

    const handleRenameConfirm = () => {
      setNormalStatus();
      emit('rename', currentName.value);
    };

    const handleRenameCancel = () => {
      setNormalStatus();
    };

    const handleDelete = async () => {
      try {
        await ElMessageBox.confirm('确认删除？');
        emit('delete');
      } catch (error) {
        console.log(error);
      }
    };

    return {
      currentName,
      isOperating,
      isRenaming,
      renameDisabled,
      handleRename,
      handleRenameConfirm,
      handleRenameCancel,
      handleDelete,
    };
  },
});
</script>

<style lang="scss">
.app-files__operation {
  display: flex;
  align-items: center;
  height: 40px;
  &__rename {
    display: flex;
    align-items: center;
  }
  &__new-name {
    width: 150px;
    margin-right: 10px;
  }
}
</style>
