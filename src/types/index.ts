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
