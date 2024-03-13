import { BasicColumn, FormSchema } from '@/components/Table';
import { h } from 'vue';
import { Avatar, Switch } from 'ant-design-vue';
import { useMessage } from '@/hooks/web/useMessage';
import { addImg, updateStatus } from '@/api/users';

export const columns: BasicColumn[] = [
  {
    title: '用户ID',
    dataIndex: 'id',
    width: 60,
  },
  {
    title: '头像',
    dataIndex: 'imageUrl',
    width: 120,
    customRender: ({ record }) => {
      return h(Avatar, {
        src: record.imageUrl,
        style: 'width: 60px; height: 60px; border-radius: 50%;',
      });
    },
  },
  {
    title: '昵称',
    dataIndex: 'userName',
    width: 120,
    slots: { customRender: 'userName' },
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 180,
    slots: { customRender: 'email' },
  },
  {
    title: '性向',
    dataIndex: 'sexType',
    width: 180,
    customRender: ({ record }) => {
      if (record.sexType === 0) {
        return '男男';
      } else if (record.sexType === 1) {
        return '女女';
      } else if (record.sexType === 2) {
        return '男女';
      }
    },
  },
  // {
  //   title: '用戶類型',
  //   dataIndex: 'type',
  //   width: 180,
  //   slots: { customRender: 'type' },
  // },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: '启用',
        unCheckedChildren: '禁用',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          console.log(checked);
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 0;
          const { createMessage } = useMessage();
          const { createConfirm } = useMessage();
          createConfirm({
            iconType: 'warning',
            title: () => h('span', '系统提示'),
            content: () => h('span', '确认提交吗?'),
            onOk: async () => {
              // 打ＡＰＩ
              updateStatus(record.id, { status: newStatus }).then(() => {
                record.status = newStatus;
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
  const emailRegxp = /[\w-]+@([\w-]+\.)+[\w-]+/; //2009-2-12更正為比較簡單的驗證
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
    // helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
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
    // required: true,
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
    // ifShow: false,
  },
  {
    field: 'userName',
    label: '昵称',
    component: 'Input',
    required: true,
  },
  // {
  //   label: '性別',
  //   field: 'gender',
  //   component: 'RadioButtonGroup',
  //   componentProps: {
  //     options: [
  //       { label: '男', value: '1' },
  //       { label: '女', value: '2' },
  //     ],
  //   },
  //   required: true,
  // },
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
      api: addImg,
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
  // {
  //   field: 'tag_0',
  //   component: 'Input',
  //   label: '标签-0',
  //   colProps: {
  //     span: 21,
  //   },
  //   required: true,
  // },
  // {
  //   field: '0',
  //   component: 'Input',
  //   label: ' ',
  //   colProps: {
  //     span: 1,
  //   },
  //   slot: 'add',
  // },
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
