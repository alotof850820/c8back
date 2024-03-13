<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Avatar, Tag, Dropdown, Menu, MenuItem } from 'ant-design-vue';
  import { getVideoDetail, updateVideo } from '/@/api/video';

  const emit = defineEmits(['reload', 'register']);

  const record = ref();
  const videoDetail = ref();
  const isSetChange = ref<boolean>(false);

  const [registerModal] = useModalInner(async (data) => {
    initVideoDetail(data.record.id);
    record.value = data.record;
  });
  const openVideo = (record) => {
    window.open(record.coverUrl);
  };
  const setVideoStatus = (status: number, id: number) => {
    updateVideo(id, { status }).then(() => {
      record.value.status = status;
      isSetChange.value = true;
    });
  };
  const checkIsChange = (e: boolean, isChange: boolean) => {
    if (!e && isChange) {
      emit('reload');
    }
  };
  const initVideoDetail = (videoId: number) => {
    getVideoDetail(videoId).then((res) => {
      videoDetail.value = res;
    });
  };
</script>

<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="影片资讯"
    :footer="null"
    :useWrapper="true"
    @visible-change="checkIsChange($event, isSetChange)"
  >
    <div class="modal_content" v-if="record">
      <div class="user_data_box">
        <div class="title">用户资讯</div>
        <div class="user_data">
          <Avatar :size="60" :src="record.user.imageUrl" />
          <div class="info">
            <div class="id">{{ record.user.id }}</div>
            <div class="name">{{ record.user.name }}</div>
          </div>
        </div>
      </div>
      <div class="user_data_box">
        <div class="title">视频资讯</div>
        <div class="video_top">
          ID: {{ record.id }}∙{{ record.uploadTime }}
          <span>
            <Dropdown trigger="click">
              <Tag
                style="cursor: pointer"
                :color="record.status === 0 ? 'green' : 'red'"
                @click.stop
              >
                {{ record.status === 0 ? '正常' : '禁用' }}</Tag
              >
              <template #overlay>
                <Menu>
                  <MenuItem key="0">
                    <div @click="setVideoStatus(1, record.id)">禁用视频</div>
                  </MenuItem>
                  <MenuItem key="1">
                    <div @click="setVideoStatus(0, record.id)">激活视频</div>
                  </MenuItem>
                </Menu>
              </template>
            </Dropdown>
          </span>
        </div>
        <div class="video_title">
          {{ record.title }}
        </div>
        <div class="video_desc">
          {{ videoDetail?.description }}
        </div>
        <div v-if="videoDetail?.tags.length > 0" style="display: flex; gap: 5px">
          標籤：
          <div v-for="(tag, index) in videoDetail?.tags" :key="index">
            <Tag color="green">
              {{ tag }}
            </Tag>
          </div>
        </div>
        <div v-else> 標籤：无 </div>
      </div>
      <!-- <div class="user_data_box">
        <div class="title"> 视频标签 </div>
        <div>
          <Tag color="green" v-for="tag in record.tags" :key="tag">
            {{ tag }}
          </Tag>
        </div>
      </div> -->
      <div class="user_data_box">
        <div class="title"> 视频封面 </div>
        <div class="cover_img" @click="openVideo(videoDetail)">
          <img :src="videoDetail?.coverUrl" alt="" />
        </div>
      </div>
    </div>
  </BasicModal>
</template>

<style scoped lang="less">
  .modal_content {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .user_data_box {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      padding: 10px 20px;
      border-radius: 10px;
      background-color: rgb(215 215 215);
      gap: 10px;

      .video_title {
        font-size: 20px;
        font-weight: 700;
      }

      .user_data {
        display: flex;
        align-items: center;
        gap: 10px;

        .avatar {
          .avatar_img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
          }
        }

        .info {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
      }

      .cover_img {
        width: 100%;
        height: 300px;
        cursor: pointer;

        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
          object-fit: contain;
        }
      }
    }
  }
</style>
