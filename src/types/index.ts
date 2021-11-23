export interface AppMenu {
  name: string;
  route: string;
  icon: string;
}

export const enum MenuRoute {
  file = 'file',
  photo = 'photo',
  collection = 'collection',
  coffer = 'coffer',
  share = 'share',
  recycle = 'recycle',
}

export interface AppBreadcrumb {
  path: string;
  value: string;
}

export interface AppFile {
  id: string;
  name: string;
  lastModify: number | null;
  isDirectory: boolean;
  size: number | null;
  handle?: FileSystemFileHandle;
  origin?: File;
}

export const enum AppFileOperation {
  normal = 'normal',
  rename = 'rename',
}
