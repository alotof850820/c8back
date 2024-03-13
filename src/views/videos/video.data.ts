import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Avatar, Switch } from 'ant-design-vue';
import { useMessage } from '@/hooks/web/useMessage';
import { updateVideo } from '@/api/video';
import { setFormatDuration } from '@/utils/video';

export const columns: BasicColumn[] = [
  {
    title: '影片ID',
    dataIndex: 'id',
    width: 60,
  },
  {
    title: '用戶',
    dataIndex: 'user',
    width: 180,
    customRender: ({ record }) => {
      return h(
        'div',
        {
          style: 'display: flex; align-items: center; justify-content: center; gap: 10px',
        },
        {
          default: () => [
            h(Avatar, {
              src: record.user.imageUrl,
              style: 'width: 60px; height: 60px; border-radius: 50%;',
            }),
            h(
              'div',
              {
                style:
                  'display: flex; flex-direction: column; align-items: center; justify-content: center;',
              },
              {
                default: () => [h('span', record.user.name), h('span', `用戶ID:${record.user.id}`)],
              },
            ),
          ],
        },
      );
    },
  },
  {
    title: '標題',
    dataIndex: 'title',
    width: 120,
  },
  {
    title: '片長',
    dataIndex: 'duration',
    width: 180,
    customRender: ({ record }) => {
      return h('span', setFormatDuration(record.duration));
    },
  },
  {
    title: '上傳時間',
    dataIndex: 'uploadTime',
    width: 180,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 0,
        checkedChildren: '启用',
        unCheckedChildren: '禁用',
        loading: record.pendingStatus,
        onclick: (e) => {
          e.stopPropagation();
        },
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? 0 : 1;
          const { createMessage } = useMessage();
          const { createConfirm } = useMessage();
          createConfirm({
            iconType: 'warning',
            title: () => h('span', '系统提示'),
            content: () => h('span', '确认提交吗?'),
            onOk: async () => {
              // 打ＡＰＩ
              updateVideo(record.id, { status: newStatus }).then(() => {
                record.status = newStatus;
                if (newStatus === 0) {
                  createMessage.success(`启用成功`);
                } else {
                  createMessage.success(`禁用成功`);
                }
                record.pendingStatus = false;
              });

              record.pendingStatus = false;
            },
            onCancel: () => {
              record.pendingStatus = false;
            },
          });
        },
      });
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'userId',
    label: '用户ID',
    component: 'Input',
    colProps: { span: 8 },
    labelWidth: 65,
  },
  {
    field: 'email',
    label: '用户邮箱',
    component: 'Input',
    colProps: { span: 8 },
    labelWidth: 73,
  },
  {
    field: 'nickName',
    label: '用户昵称',
    component: 'Input',
    colProps: { span: 8 },
    labelWidth: 73,
  },
  {
    field: 'registerDate',
    label: '注册时间',
    component: 'RangePicker',
    colProps: { span: 8 },
    labelWidth: 65,
  },
];
function validateUsername(value) {
  const emailRegxp = /[\w-]+@([\w-]+\.)+[\w-]+/;
  if (emailRegxp.test(value) != true) {
    return false;
  } else {
    return true;
  }
}
export const accountFormSchema: FormSchema[] = [
  {
    field: 'email',
    label: '用户邮箱',
    component: 'Input',
    rules: [
      {
        required: true,
      },
      {
        validator(_, value) {
          return new Promise((resolve, reject) => {
            if (validateUsername(value) === false) {
              reject('请输入正确email格式');
            }
            resolve();
          });
        },
      },
    ],
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    rules: [
      {
        required: true,
        min: 6,
        max: 20,
      },
    ],
  },
  {
    field: 'userName',
    label: '昵称',
    component: 'Input',
    required: true,
  },
  {
    label: '性向',
    field: 'sexType',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: '男男', value: 0 },
        { label: '女女', value: 1 },
        { label: '男女', value: 2 },
      ],
    },
    required: true,
  },
  {
    field: 'imagePath',
    component: 'ImageUpload',
    label: '头像文件',
    required: true,
    colProps: {
      span: 12,
    },
    componentProps: {
      // api: addImg,
    },
  },
  {
    label: '用戶類型',
    field: 'type',
    component: 'RadioButtonGroup',
    componentProps: {
      options: [
        { label: '一般會員', value: 0 },
        { label: '主播', value: 1 },
      ],
    },
    required: true,
  },
];

export const accountEditFormSchema: FormSchema[] = [
  {
    field: 'nickName',
    label: '昵称',
    component: 'Input',

    required: true,
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    rules: [
      {
        required: true,
        min: 6,
        max: 20,
      },
    ],
  },
];
