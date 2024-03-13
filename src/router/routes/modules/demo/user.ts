import type { AppRouteModule } from '@/router/types';

import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const system: AppRouteModule = {
  path: '/user',
  name: 'User',
  component: LAYOUT,
  redirect: '/user/account/index',
  meta: {
    orderNo: 0,
    icon: 'bx:user',
    title: t('routes.demo.user.moduleName'),
  },
  children: [
    {
      path: 'user/account/index',
      name: 'AccountCenterPage',
      component: () => import('/@/views/user/account/index.vue'),
      meta: {
        title: t('routes.demo.user.customerCell'),
        ignoreKeepAlive: false,
      },
    },
    // {
    //   path: 'user/account/center/index/:id',
    //   name: 'AccountCenterPage2',
    //   component: () => import('/@/views/user/account/center/index.vue'),
    //   meta: {
    //     hideMenu: true,
    //     showMenu: false,

    //     title: '用户详情',
    //   },
    // },
    // {
    //   path: 'user/account/MoneyTable/:id',
    //   name: '用户充值记录:id',
    //   meta: {
    //     hideMenu: true,
    //     title: '用户充值记录',
    //     showMenu: false,
    //     currentActiveMenu: '/user/account',
    //   },
    //   component: () => import('../../../../views/user/account/MoneyTable.vue'),
    // },
    // {
    //   path: 'user/account/report/index/:id',
    //   name: 'reportPage',
    //   component: () => import('/@/views/user/account/report/index.vue'),
    //   meta: {
    //     hideMenu: true,
    //     showMenu: false,

    //     title: '客诉管理',
    //   },
    // },
  ],
};

export default system;
