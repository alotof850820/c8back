import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { useMessage } from '@/hooks/web/useMessage';
import { updateTagStatus } from '@/api/tags';

export const columns: BasicColumn[] = [
  {
    title: '標籤ID',
    dataIndex: 'id',
    width: 60,
  },
  {
    title: '標籤名',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'enable',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.enable === true,
        checkedChildren: '启用',
        unCheckedChildren: '禁用',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? true : false;
          const { createMessage } = useMessage();
          const { createConfirm } = useMessage();
          createConfirm({
            iconType: 'warning',
            title: () => h('span', '系统提示'),
            content: () => h('span', '确认提交吗?'),
            onOk: async () => {
              // 打ＡＰＩ
              updateTagStatus(record.id, { enable: newStatus }).then(() => {
                record.enable = newStatus;
                if (newStatus === 1) {
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
    // helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],

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
