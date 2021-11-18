import { useRoute } from 'vue-router';
import { ref, watch } from 'vue';
import { AppMenus } from '../utils/constant';
import { AppMenu } from '../types';

export function useAppMenu() {
  const menus = ref(AppMenus);
  const route = useRoute();
  const currentMenu = ref<AppMenu>(menus.value[0]);

  const findMenuByRoute = (route: string) => {
    return menus.value.find((item) => item.route === route)!;
  };

  watch(
    () => route.name,
    (val) => {
      if (val) {
        currentMenu.value = findMenuByRoute(val as string);
      }
    },
  );

  return {
    menus,
    currentMenu,
  };
}
