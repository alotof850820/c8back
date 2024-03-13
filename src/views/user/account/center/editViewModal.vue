<template>
  <BasicModal @register="registerModal" :title="getTitle" @ok="handleSubmit">
    
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
        
      });

      const getTitle = computed(() => '编辑');
      async function handleSubmit() {
        closeModal();
      }
      return {
        registerModal,
        handleSubmit,
        getTitle,

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
