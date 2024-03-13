<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    :showCancelBtn="false"
    :showOkBtn="false"
  >
    <BasicForm @register="registerForm">
      <template #tag>
        <a-button type="primary" @click="addTag"> 新增 </a-button>
        <Tag style="margin-left: 10px" v-for="(t, index) in tags" :key="index" color="green">
          <div style="display: flex; gap: 5px; align-items: center">
            {{ t }}
            <Icon icon="ant-design:close-circle-outlined" @click="removeTag(index)" />
          </div>
        </Tag>
        <br />
        <input
          style="margin-top: 10px; padding: 5px 10px; border: 1px solid #d9d9d9; border-radius: 5px"
          v-model="tag"
          placeholder="請輸入標籤"
        />
      </template>
    </BasicForm>
  </BasicModal>
</template>

<script lang="ts" setup>
  import Icon from '@/components/Icon/Icon.vue';
  import { computed, ref } from 'vue';
  import { BasicForm, FormSchema, useForm } from '@/components/Form';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';
  import { getVideoDetail, putVideo } from '@/api/video';
  import { Tag } from 'ant-design-vue';

  const userId = ref();
  const getTitle = computed(() => '修改昵称和密码');
  const videoDetail = ref();
  const tag = ref();
  const tags = ref([]);
  const { createMessage } = useMessage();

  const emit = defineEmits(['success', 'register']);

  const handleSubmit = () => {
    const values = getFieldsValue();
    putVideo(userId.value, {
      title: values.title,
      description: values.description,
      status: values.status,
      sexType: values.sexType,
      type: values.type,
      tags: tags.value,
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
  const initVideoDetail = (videoId: number) => {
    userId.value = videoId;
    getVideoDetail(videoId).then((res) => {
      videoDetail.value = res;
      tags.value = res.tags;
      console.log(res);

      setFieldsValue({
        title: res.title,
        description: res.description,
        status: res.status,
        sexType: res.sexType,
        type: res.videoType,
      });
    });
  };
  const addTag = () => {
    if (tags.value.includes(tag.value)) {
      createMessage.error('標籤重複');
      return;
    }
    tags.value.push(tag.value.trim());
    tag.value = '';
    createMessage.success('新增成功');
  };
  const removeTag = (index: number) => {
    tags.value.splice(index, 1);
  };

  const schemas: FormSchema[] = [
    {
      label: '標題',
      field: 'title',
      component: 'Input',
      required: true,
    },
    {
      field: 'description',
      label: '描述',
      component: 'InputTextArea',
      required: true,
    },
    {
      label: '性取向',
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
      label: '影片類型',
      field: 'type',
      component: 'RadioButtonGroup',
      componentProps: {
        options: [
          { label: '廣告', value: 1 },
          { label: '收費', value: 2 },
        ],
      },
      required: true,
    },
    {
      label: '標籤',
      field: 'tag',
      component: 'Input',
      colProps: {
        span: 21,
      },
      slot: 'tag',
    },
  ];

  const [registerModal, { closeModal }] = useModalInner(async (data) => {
    resetFields();
    initVideoDetail(data.record.id);
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
