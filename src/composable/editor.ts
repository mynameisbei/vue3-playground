import { onBeforeUnmount, watch, Ref, ref, computed } from 'vue';
import { editor as monacoEditor } from 'monaco-editor/esm/vs/editor/editor.api';
import { AppFile } from '../types';

export function useEditor(editorRef: Ref<HTMLElement | null>) {
  let editor: monacoEditor.IStandaloneCodeEditor | null = null;
  const currentEditFile = ref<AppFile | null>(null);
  const currentFileContent = ref('');
  const editorValue = ref('');
  const languageConfig: Record<any, any> = {
    ts: 'typescript',
    js: 'javascript',
  };

  const isFileChanged = computed(() => {
    return editorValue.value !== currentFileContent.value;
  });

  watch(editorRef, (val) => {
    if (val) {
      editor = monacoEditor.create(val, {
        minimap: { enabled: false },
      });
      editor.onDidChangeModelContent(() => {
        editorValue.value = editor!.getValue();
      });
    }
  });

  const getFileExt = (name: string) => {
    const result = name.split('.');
    if (result[0]) {
      const ext = result[1];
      return languageConfig[ext] || ext;
    } else {
      return '';
    }
  };

  const readeFile = (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsText(file);
    });
  };

  const changeEditorValue = async (file: AppFile) => {
    const value = await readeFile(file.origin!);
    currentFileContent.value = value;
    currentEditFile.value = file;
    monacoEditor.setModelLanguage(editor!.getModel()!, getFileExt(file.name));
    editor?.setValue(value);
  };

  onBeforeUnmount(() => {
    editor?.dispose();
  });

  return {
    editor,
    editorValue,
    currentEditFile,
    changeEditorValue,
    isFileChanged,
  };
}
