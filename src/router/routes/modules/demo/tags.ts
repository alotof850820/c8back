import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const tags: AppRouteModule = {
  path: '/tags',
  name: 'Tags',
  component: LAYOUT,
  redirect: '@/views/tags/TagsList.vue',
  meta: {
    orderNo: 2,
    icon: 'mdi:tag-outline',
    title: t('routes.demo.tags.moduleName'),
  },
  children: [
    {
      path: 'tags/tagsList',
      name: 'TagsList',
      component: () => import('/@/views/tags/TagsList.vue'),
      meta: {
        title: t('routes.demo.tags.tagsList'),
        ignoreKeepAlive: false,
      },
    },
  ],
};

export default tags;
