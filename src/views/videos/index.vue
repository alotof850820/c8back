<template>
  <PageWrapper title="影片上傳" :contentBackground="true" :contentStyle="{ padding: '24px 0' }">
    <BasicForm @register="registerForm">
      <template #upload>
        <Upload
          name="video"
          list-type="picture-card"
          class="avatar-uploader"
          :show-upload-list="false"
          :customRequest="handleChange"
        >
          <Icon v-if="videoUrl !== null" icon="ant-design:check-circle-outlined" size="40" />
          <div v-else>
            <Icon icon="ant-design:plus-circle-outlined" />
            <div class="ant-upload-text"> 上傳影片 </div>
          </div>
        </Upload>
      </template>
      <template #tag>
        <a-button type="primary" @click="addTag"> 新增 </a-button>
        <Tag style="margin-left: 10px" v-for="(t, index) in tags" :key="index" color="green">
          {{ t }}
        </Tag>
        <br />
        <input
          style="margin-top: 10px; padding: 5px 10px; border: 1px solid #d9d9d9; border-radius: 5px"
          v-model="tag"
          placeholder="請輸入標籤"
        />
      </template>
    </BasicForm>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import Icon from '@/components/Icon/Icon.vue';
  import { Upload, Tag } from 'ant-design-vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { PageWrapper } from '@/components/Page';
  import { uploadVideo, buildVideo } from '@/api/video';
  import { BasicForm, useForm } from '@/components/Form/index';
  import { FormSchema } from '@/components/Table';
  import { ref } from 'vue';

  const { createMessage } = useMessage();
  const tag = ref();
  const tags = ref([]);

  const addTag = () => {
    if (tags.value.includes(tag.value)) {
      createMessage.error('標籤重複');
      return;
    }
    tags.value.push(tag.value.trim());
    tag.value = '';
    createMessage.success('新增成功');
  };
  const handleChange = (video: any) => {
    uploadVideo({
      video: video.file,
    })
      .then((res) => {
        videoUrl.value = res;
      })
      .catch((err) => {
        createMessage.error(err);
      });
  };
  const videoUrl = ref<any>(null);
  const accountFormSchema: FormSchema[] = [
    {
      label: '用戶ID',
      field: 'userId',
      component: 'Input',
      required: true,
    },
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
      required: true,
      colProps: {
        span: 21,
      },
      slot: 'tag',
    },
    {
      label: '影片',
      field: 'upload',
      colProps: {
        span: 21,
      },
      slot: 'upload',
    },
  ];

  const [registerForm, { resetFields, getFieldsValue }] = useForm({
    labelWidth: 120,
    schemas: accountFormSchema,
    showActionButtonGroup: true,
    actionColOptions: {
      span: 23,
    },
    submitButtonOptions: {
      text: '提交',
    },
    resetButtonOptions: {
      text: '重置',
    },
    baseColProps: {
      span: 21,
    },
    submitFunc: async () => {
      if (getFieldsValue().userId === undefined) {
        createMessage.error('請輸入用戶ID');
        return;
      }
      if (getFieldsValue().title === undefined) {
        createMessage.error('請輸入標題');
        return;
      }
      if (getFieldsValue().description === undefined) {
        createMessage.error('請輸入描述');
        return;
      }
      if (getFieldsValue().sexType === undefined) {
        createMessage.error('請輸入性取向');
        return;
      }
      if (getFieldsValue().type === undefined) {
        createMessage.error('請輸入影片類型');
        return;
      }
      if (tags.value.length === 0) {
        createMessage.error('請輸入標籤');
        return;
      }
      if (videoUrl.value === null) {
        createMessage.error('請上傳影片');
        return;
      }

      const data = {
        title: getFieldsValue().title,
        description: getFieldsValue().description,
        coverPath: videoUrl.value.coverPath,
        videoPath: videoUrl.value.videoPath,
        previewPath: videoUrl.value.previewPath,
        sexType: getFieldsValue().sexType,
        type: getFieldsValue().type,
        duration: videoUrl.value.duration,
        userId: getFieldsValue().userId,
        tags: tags.value,
      };

      buildVideo(data).then(() => {
        createMessage.success('提交成功');
        resetFields();
        videoUrl.value = null;
      });
    },
  });
</script>
