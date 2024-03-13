<template>
  <BasicModal @register="registerModal" :title="getTitle" @cancel="handleSubmit" @ok="handleSubmit">
    <video v-if="contentType === 'mp4'" controls>
      <source :src="videodata" type="video/mp4"
    /></video>
    <img :src="videodata" v-if="contentType === 'gif'" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, computed, ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  const videodata = ref('');
  const contentType = ref('');

  export default defineComponent({
    name: 'VideoViewModal',
    components: { BasicModal },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      //
      const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
        videodata.value = data.record.content;
        if (data.record.content.indexOf('.mp4') !== -1) {
          contentType.value = 'mp4';
        } else if (data.record.content.indexOf('.gif') !== -1) {
          contentType.value = 'gif';
        }
        // console.log(contentType.value);
        // console.log(data.record.content);
      });

      const getTitle = computed(() => '视频预览');
      async function handleSubmit() {
        closeModal();
        videodata.value = '';

      }
      return {
        registerModal,
        handleSubmit,
        getTitle,
        videodata,
        contentType,
      };
    },
  });
</script>
<style>
  video,
  img {
    width: 95%;
    margin: auto;
    height: auto;
  }
</style>
