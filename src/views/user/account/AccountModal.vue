<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    @cancel="removeUpload"
  >
    <BasicForm @register="registerForm">
      <template #add="{ field }">
        <Button v-if="Number(field) === 0" @click="add">+</Button>
        <Button v-if="field > 0" @click="del(field)">-</Button>
      </template>
      <template #upload="{ field }">
        <Upload
          accept="image/jpeg,image/jpg,image/png"
          v-model="field.uploadfile"
          v-model:file-list="fileList"
          :before-upload="beforeUpload"
          :remove="removeUpload"
          :maxNumber="1"
          :multiple="false"
        >
          <a-button type="primary" :disabled="getIsSelectFile">
            {{ t('component.upload.choose') }}
          </a-button>
        </Upload>
      </template>
    </BasicForm>
  </BasicModal>
</template>
<script setup lang="ts">
  import { ref, computed } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { accountFormSchema } from './account.data';
  import { Upload } from 'ant-design-vue';
  import { Button } from '@/components/Button';
  import { useI18n } from '@/hooks/web/useI18n';
  import { addUsers } from '@/api/users';
  import { useMessage } from '@/hooks/web/useMessage';

  const { t } = useI18n();
  const emit = defineEmits(['success', 'register']);

  let fileListRef;
  const fileList = ref([]);
  const [
    registerForm,
    { setFieldsValue, appendSchemaByField, removeSchemaByField, resetFields, validate },
  ] = useForm({
    labelWidth: 120,
    schemas: accountFormSchema,
    showActionButtonGroup: false,
    actionColOptions: {
      span: 23,
    },
  });

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async () => {
    resetFields();
    getIsSelectFile.value = false;
    fileList.value = [];
  });

  const getTitle = computed(() => '创建用户');
  async function handleSubmit() {
    try {
      const values = await validate();
      const data = {
        email: values.email,
        password: values.password,
        sexType: values.sexType,
        type: values.type,
        userName: values.userName,
        imagePath: values.imagePath[0].imagePath,
      };
      addUsers(data)
        .then(() => {
          closeModal();
          emit('success');
        })
        .catch((error) => {
          const { createMessage } = useMessage();
          createMessage.error(error.response.data.message);
        });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
  const n = ref(1);

  function add() {
    appendSchemaByField(
      {
        field: `tag_${n.value}`,
        component: 'Input',
        label: '标签' + n.value,
        colProps: {
          span: 21,
        },
        required: true,
      },
      '',
    );

    appendSchemaByField(
      {
        field: `${n.value}`,
        component: 'Input',
        label: ' ',
        colProps: {
          span: 1,
        },
        slot: 'add',
      },
      '',
    );
    n.value++;
  }

  function del(field: string) {
    removeSchemaByField([`tag_${field}`, `${field}`]);
    n.value--;
  }
  const getIsSelectFile = ref(false);
  function beforeUpload(file: File) {
    if (fileListRef === undefined) {
      getIsSelectFile.value = true;
      fileListRef = file;
      setFieldsValue({
        uploadfile: fileListRef,
      });
    }
    return false;
  }
  function removeUpload() {
    fileListRef = undefined;
    getIsSelectFile.value = false;
    return true;
  }
</script>
