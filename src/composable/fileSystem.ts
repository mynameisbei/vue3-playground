import { ref } from 'vue';

export function useFileSystem() {
  const dirHandle = ref<FileSystemDirectoryHandle | null>(null);
  const selectDirectory = async () => {
    // open file picker
    dirHandle.value = (await (
      window as any
    ).showDirectoryPicker()) as FileSystemDirectoryHandle;
  };

  const getDirInfo = async () => {
    const result = [];
    if (dirHandle.value) {
      for await (const [, value] of dirHandle.value.entries()) {
        result.push(value);
      }
    }

    return result;
  };

  return {
    selectDirectory,
    getDirInfo,
  };
}
