export interface ListItem {
  title: string;
  icon: string;
  color?: string;
  description?: string;
}

export interface TabItem {
  key: string;
  name: string;
  component: string;
}

export const tags: string[] = ['Vben', '设计语言', 'Typescript'];
export const teams: ListItem[] = [
  {
    icon: 'ant-design:dollar-circle-outlined',
    title: '金币剩余',
    color: '#C6A300',
  },
  {
    icon: 'ant-design:dollar-circle-outlined',
    title: '红币信息',
    color: '#F75000',
  },
];

export const details: ListItem[] = [
  {
    icon: 'ant-design:man-outlined',
    title: '',
  },
  {
    icon: 'mdi:account-heart',
    title: '',
  },
  {
    icon: 'eva:email-outline',
    title: '',
  },
];

export const achieveList: TabItem[] = [
  {
    key: '1',
    name: '长视频',
    component: 'videoLong',
  },
  {
    key: '2',
    name: '短视频',
    component: 'videoShort',
  },
  {
    key: '3',
    name: '分享主题',
    component: 'shareProject',
  },
  {
    key: '4',
    name: '求片主题',
    component: 'Project',
  },
  {
    key: '5',
    name: '文章',
    component: 'Article',
  },
  {
    key: '6',
    name: '提问',
    component: 'Question',
  },
];

export const articleList = (() => {
  const result: any[] = [];
  for (let i = 0; i < 4; i++) {
    result.push({
      title: '文章标题',
      tags: ['Vben', '设计语言', 'Typescript'],
      content: '基于Vue Next, TypeScript, Ant Design实现的一套完整的企业级后台管理系统。',
      creationDateTime: '2020-11-14 11:20',
      isQuality: true,
      actions: [
        { icon: 'clarity:star-line', text: '156', color: '#018ffb', tooltip: '收藏数' },
        { icon: 'bx:bxs-like', text: '156', color: '#459ae8', tooltip: '文章获赞数量' },
        { icon: 'bx:bxs-message-dots', text: '2', color: '#42d27d', tooltip: '文章评论数' },
        { icon: 'bx:bx-lock-open-alt', text: '21', color: '#D9B300', tooltip: '解锁数（阅读数）' },
      ],
    });
  }
  return result;
})();

export const questionList = (() => {
  const result: any[] = [];
  for (let i = 0; i < 14; i++) {
    result.push({
      title: 'Vben Admin',
      description: ['Vben', '设计语言', 'Typescript'],
      content: '提问内容',
      creationDateTime: '2020-11-14 11:20',
      actions: [
        { icon: 'clarity:star-line', text: '156', color: '#018ffb', tooltip: '收藏数' },
        { icon: 'bx:bxs-message-dots', text: '2', color: '#42d27d', tooltip: '已有回答数' },
      ],
    });
  }
  return result;
})();

export const applicationList = (() => {
  const result: any[] = [];
  for (let i = 0; i < 8; i++) {
    result.push({
      title: 'Vben Admin',
      icon: 'emojione-monotone:letter-a',
      color: '#1890ff',
      active: '100',
      new: '1,799',
      download: 'bx:bx-download',
    });
  }
  return result;
})();

export const videoLongList = (() => {
  const result: any[] = [];
  for (let i = 0; i < 12; i++) {
    result.push({
      title: 'Vben Admin',
      creationDateTime: '2020-11-14 11:20',
      isQuality: true,
      description: '李智恩有没有？超...(共8个视频)',
      items: 8,
      actions: [{ icon: '', text: '视频预览', color: '#42d27d', tooltip: '' }],
    });
  }
  return result;
})();

export const videoShortList = (() => {
  const result: any[] = [];
  for (let i = 0; i < 8; i++) {
    result.push({
      title: 'Vben Admin',
    });
  }
  return result;
})();

export const projectList = (() => {
  const result: any[] = [];
  for (let i = 0; i < 16; i++) {
    result.push({
      title: 'Vben Admin',
      creationDateTime: '2020-11-14 11:20',
      actions: [{ icon: 'clarity:star-line', text: '156', color: '#018ffb', tooltip: '收藏数' }],
    });
  }
  return result;
})();

export const projectShareList = (() => {
  const result: any[] = [];
  for (let i = 0; i < 12; i++) {
    result.push({
      title: 'Vben Admin',
      creationDateTime: '2020-11-14 11:20',
      isQuality: true,
      actions: [
        { icon: 'clarity:star-line', text: '156', color: '#018ffb', tooltip: '主题视频观看数' },
        { icon: 'bx:bxs-like', text: '156', color: '#459ae8', tooltip: '主题获赞数' },
        { icon: 'bx:bxs-message-dots', text: '2', color: '#42d27d', tooltip: '主题视频数' },
        {
          icon: 'bx:bxs-message-dots',
          text: '21',
          color: '#42d27d',
          tooltip: '所有上传了作品的用户数',
        },
      ],
    });
  }
  return result;
})();
