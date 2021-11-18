import { AppMenu, MenuRoute } from '../types';

export const AppMenus: AppMenu[] = [
  {
    name: '文件',
    route: MenuRoute.file,
    icon: 'files',
  },
  {
    name: '相册',
    route: MenuRoute.photo,
    icon: 'picture-filled',
  },
  {
    name: '收藏夹',
    route: MenuRoute.collection,
    icon: 'collection',
  },
  {
    name: '保险箱',
    route: MenuRoute.coffer,
    icon: 'message-box',
  },
  {
    name: '我的分享',
    route: MenuRoute.share,
    icon: 'share',
  },
  {
    name: '回收站',
    route: MenuRoute.recycle,
    icon: 'delete',
  },
];
