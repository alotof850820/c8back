<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    :showCancelBtn="false"
    :showOkBtn="false"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>

<script lang="ts" setup>
  import { computed, ref, h } from 'vue';
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { editUser, uploadImg } from '@/api/users';
  import { useMessage } from '@/hooks/web/useMessage';
  import { Switch } from 'ant-design-vue';

  const userId = ref();
  const avatarImg = ref();
  const getTitle = computed(() => '修改昵称和密码');

  const emit = defineEmits(['success', 'register']);

  function validateUsername(value) {
    const emailRegxp = /[\w-]+@([\w-]+\.)+[\w-]+/; //2009-2-12更正為比較簡單的驗證
    if (emailRegxp.test(value) != true) {
      return false;
    } else {
      return true;
    }
  }

  const handleSubmit = () => {
    const values = getFieldsValue();
    if (avatarImg.value !== undefined) {
      uploadImg(userId.value, { image: avatarImg.value.image }).catch((err) => {
        console.log(err);
      });
    }
    editUser(userId.value, {
      email: values.email,
      userName: values.userName,
      status: values.status,
      sexType: values.sexType,
      type: 0,
    })
      .then(() => {
        closeModal();
        emit('success');
      })
      .catch((error) => {
        const { createMessage } = useMessage();
        createMessage.error(error.response.data.message);
      });
  };
  const upload = (file: any) => {
    avatarImg.value = file;

    return new Promise((resolve) => resolve(file));
  };

  const schemas: FormSchema[] = [
    {
      field: 'imageUrl',
      component: 'ImageUpload',
      label: '上传图片',
      required: true,
      componentProps: {
        api: upload,
        accept: ['png', 'jpeg', 'jpg', 'gif'],
        maxSize: 999,
        maxNumber: 1,
      },
    },
    {
      field: 'userName',
      label: '昵称',
      component: 'Input',
      required: true,
    },
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
    // {
    //   label: '用戶類型',
    //   field: 'type',
    //   component: 'RadioButtonGroup',
    //   componentProps: {
    //     options: [
    //       { label: '一般會員', value: 0 },
    //       { label: '主播', value: 1 },
    //     ],
    //   },
    //   required: true,
    // },
    {
      label: '状态',
      field: 'status',
      component: 'RadioButtonGroup',
      componentProps: {
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ],
      },
      required: true,
    },
  ];

  const [registerModal, { closeModal }] = useModalInner(async (data) => {
    resetFields();
    userId.value = data.record.id;
    setFieldsValue({
      userName: data.record.userName,
      imageUrl: [data.record.imageUrl],
      email: data.record.email,
      sexType: data.record.sexType,
      // type: data.record.type,
      status: data.record.status,
    });
  });
  const [registerForm, { resetFields, setFieldsValue, getFieldsValue }] = useForm({
    labelWidth: 500,
    schemas: schemas,
    actionColOptions: {
      span: 24,
    },
    labelCol: {
      span: 4,
    },
    showResetButton: false,
    submitButtonOptions: {
      text: '确认修改',
      onClick: handleSubmit,
    },
  });
</script>
