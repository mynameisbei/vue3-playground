import { ref } from 'vue';

export function useFileSystem() {
  const dirHandle = ref<FileSystemDirectoryHandle | null>(null);
  const selectDirectory = async () => {
    // open file picker
    dirHandle.value = await showDirectoryPicker();
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

  const isFileHandle = (
    handle: FileSystemHandle,
  ): handle is FileSystemFileHandle => {
    return handle instanceof FileSystemFileHandle;
  };

  const isDirHandle = (
    handle: FileSystemHandle,
  ): handle is FileSystemDirectoryHandle => {
    return handle instanceof FileSystemDirectoryHandle;
  };

  const handleWrite = async (name: string, file: File) => {
    const newHandle = await dirHandle.value!.getFileHandle(name, {
      create: true,
    });
    const writable = await newHandle.createWritable();
    await writable.write(file);
    await writable.close();
  };

  const handleRename = async (name: string, origin: File) => {
    await handleWrite(name, origin);
    handleDelete(origin.name);
  };

  const handleContentChange = async (name: string, content: string) => {
    const file = new File([content], name);
    await handleWrite(name, file);
  };

  const handleDelete = async (name: string) => {
    await dirHandle.value!.removeEntry(name, { recursive: true });
  };

  return {
    selectDirectory,
    getDirInfo,
    isFileHandle,
    isDirHandle,
    handleRename,
    handleDelete,
    handleContentChange,
  };
}
