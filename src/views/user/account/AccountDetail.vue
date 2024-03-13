<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { Avatar, Tag, Dropdown, Menu, MenuItem } from 'ant-design-vue';
  import { getUserDetail, updateStatus } from '/@/api/users';

  const emit = defineEmits(['reload', 'register']);

  const record = ref();
  const isSetChange = ref<boolean>(false);

  const [registerModal] = useModalInner(async (data) => {
    const detail = await getDetail(data.record.id);
    record.value = { ...data.record, ...detail };
    isSetChange.value = false;
    record.value.sexType === 1 ? '男女' : record.value.sexType === 2 ? '男男' : '女女';
  });
  const setUserStatus = (status: number, id: number) => {
    updateStatus(id, { status }).then(() => {
      record.value.status = status;
      isSetChange.value = true;
    });
  };
  const checkIsChange = (e: boolean, isChange: boolean) => {
    if (!e && isChange) {
      emit('reload');
    }
  };
  const getDetail = (id) => {
    return new Promise((resolve) => {
      getUserDetail(id).then((res) => {
        resolve(res);
      });
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
    :height="800"
    @visible-change="checkIsChange($event, isSetChange)"
  >
    <div class="modal_content" v-if="record">
      <div class="user_data_box">
        <div class="title">用户资讯</div>
        <div class="user_data">
          <Avatar :size="60" :src="record.imageUrl" />
          <div class="info">
            <div class="id">ID:{{ record.userId }}</div>
            <div class="name">名稱:{{ record.userName }}</div>
            <div class="email">信箱:{{ record.email }}</div>
            <div class="deviceId">設備ID:{{ record.deviceId }}</div>
            <div class="status">
              狀態:
              <span>
                <Dropdown trigger="click">
                  <Tag
                    style="cursor: pointer"
                    :color="record.status === 1 ? 'green' : 'red'"
                    @click.stop
                  >
                    {{ record.status === 1 ? '正常' : '禁用' }}</Tag
                  >
                  <template #overlay>
                    <Menu>
                      <MenuItem key="0">
                        <div @click="setUserStatus(2, record.userId)">禁用用戶</div>
                      </MenuItem>
                      <MenuItem key="1">
                        <div @click="setUserStatus(1, record.userId)">激活用戶</div>
                      </MenuItem>
                    </Menu>
                  </template>
                </Dropdown>
              </span>
            </div>
            <div class="type">
              類型:
              {{ record.type === 0 ? '一般會員' : '主播' }}
            </div>
          </div>

          <div class="backGroundUrl">
            <img :src="record.backGroundUrl" alt="" />
          </div>
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
