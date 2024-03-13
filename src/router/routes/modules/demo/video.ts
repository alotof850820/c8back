import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const system: AppRouteModule = {
  path: '/video',
  name: 'Video',
  component: LAYOUT,
  redirect: '/video/videoManage',
  meta: {
    orderNo: 1,
    icon: 'ion:tv-outline',
    title: t('routes.demo.video.moduleName'),
  },
  children: [
    {
      path: '/video/videoManage',
      name: 'VideoManage',
      component: () => import('/@/views/videos/index.vue'),
      meta: {
        title: t('routes.demo.video.customerCell'),
        ignoreKeepAlive: false,
      },
    },
    {
      path: '/video/VideoList',
      name: 'VideoList',
      component: () => import('/@/views/videos/videoList.vue'),
      meta: {
        title: t('routes.demo.video.videoList'),
        ignoreKeepAlive: false,
      },
    },
  ],
};

export default system;
