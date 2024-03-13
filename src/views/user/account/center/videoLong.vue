<template>
  <List
    :class="prefixCls"
    :pagination="pagination"
    :data-source="datalist"
    :grid="{ gutter: 16, column: 6 }"
  >
    <template #renderItem="{ item }">
      <ListItem :key="item.title">
        <Card :hoverable="true" :class="`${prefixCls}__card`">
          <div class="ant-image">
            <img class="ant-image-img" :src="item.coverUrl" />
            <span style="color: #fff; position: absolute; z-index: 9; bottom: 10px; right: 10px">{{
              item.duration
            }}</span>
          </div>
          <div style="min-height: 170px">
            <div :class="`${prefixCls}__tag`">
              <template v-for="tag in item.tags" :key="tag">
                <Tag class="mb-2" color="orange">
                  {{ tag }}
                </Tag>
              </template>
            </div>
            <div :class="`${prefixCls}__card-title`">
              {{ item.title }}
              <br />
              <div style="font-weight: 400; font-size: 0.8rem; display: flex">
                <div
                  style="
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    max-width: 100px;
                  "
                  >{{ item.description }}</div
                >
                <div>{{ item.count }}</div>
              </div>
            </div>
            <div style="bottom: 0; position: absolute; width: 100%">
              <div :class="`${prefixCls}__card-content`">
                {{ item.creationDateTime }}
              </div>

              <CardGrid
                :key="item.actions[0].text"
                style="width: 33.3%; text-align: center; box-shadow: none"
              >
                <Icon
                  v-if="item.actions[0].icon"
                  :class="`${prefixCls}__action-icon`"
                  :icon="item.actions[0].icon"
                  :color="item.actions[0].color"
                />
                {{ item.actions[0].text }}
              </CardGrid>
              <CardGrid :key="item.actions[1].text" style="width: 33.3%; text-align: center; box-shadow: none">
                <Icon
                  v-if="item.actions[1].icon"
                  :class="`${prefixCls}__action-icon`"
                  :icon="item.actions[1].icon"
                  :color="item.actions[1].color"
                />
                {{ item.actions[1].text }}
              </CardGrid>
              <CardGrid :key="item.actions[2].text" style="width: 33.3%; text-align: center; box-shadow: none">
                <Icon
                  v-if="item.actions[2].icon"
                  :class="`${prefixCls}__action-icon`"
                  :icon="item.actions[2].icon"
                  :color="item.actions[2].color"
                />
                {{ item.actions[2].text }}
              </CardGrid>

              <CardGrid
                :key="item.actions[3].text"
                style="width: 50%; text-align: center; color: #459ae8"
                @click="handleVideo(item.actions[3])"
              >
                <Icon
                  v-if="item.actions[3].icon"
                  :class="`${prefixCls}__action-icon`"
                  :icon="item.actions[3].icon"
                  :color="item.actions[3].color"
                />
                {{ item.actions[3].text }}
              </CardGrid>
              <CardGrid
                :key="item.actions[4].text"
                style="width: 50%; text-align: center; color: #459ae8"
                @click="handleEdit(item.actions[4])"
              >
                <Icon
                  v-if="item.actions[4].icon"
                  :class="`${prefixCls}__action-icon`"
                  :icon="item.actions[4].icon"
                  :color="item.actions[4].color"
                />
                {{ item.actions[4].text }}
              </CardGrid>
            </div>
          </div>
        </Card>
      </ListItem>
    </template>
  </List>
  <videoViewModal @register="videoModal" />
  <editViewModal @register="editModal" />
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { List, Card, Row, Col, Tooltip, Image, Tag } from 'ant-design-vue';
  import { tags, videoLongList } from './data';
  import Icon from '/@/components/Icon/index';
  import { useModal } from '/@/components/Modal';
  import videoViewModal from './videoViewModal.vue';
  import editViewModal from './editViewModal.vue';

  import { getUserVideos } from '/@/api/users';
  // import { getUserVideos } from '/@/../api';

  const ListItem = List.Item;
  const CardGrid = Card.Grid;
  const prefixCls = 'account-center-project';
  //暴露内部方法
  const emit = defineEmits(['getMethod']);
  // 自动请求并暴露内部方法
  onMounted(() => {
    fetch();
    emit('getMethod', fetch);
  });
  const datalist = ref([]);
  async function fetch(p = {}) {
    const res = await getUserVideos({
      userId: decodeURI(location.href).split('index/')[1],
      page: page.value,
      videoType: 2,
    });
    // console.log(res);
    for (let i = 0; i < res.items.length; i++) {
      datalist.value.push({
        title: res.items[i].title,
        tags: res.items[i].tags,
        duration: formatSeconds(res.items[i].duration),
        creationDateTime: res.items[i].creationDateTime,
        description: res.items[i].topic !== null ? res.items[i].topic.name : '',
        count: res.items[i].topic !== null ? '(共' + res.items[i].topic.videoCount + '个视频)' : '',
        coverUrl: res.items[i].coverUrl,
        actions: [
          {
            icon: 'bx:bxs-like',
            text: res.items[i].likeCount,
            color: '#ffd591',
          },
          {
            icon: 'clarity:star-line',
            text: res.items[i].favoriteCount,
            color: '#ffd591',
          },
          {
            icon: 'carbon:view-filled',
            text: res.items[i].playCount,
            color: '#ffd591',
          },
          {
            icon: 'ic:round-preview',
            text: '视频预览',
            color: '#459ae8',
            content: res.items[i].previewUrl,
          },
          { icon: 'mdi:note-edit-outline', text: '编辑', color: '#459ae8' },
        ],
      });
    }
    total.value = res.totalCount;
  }
  function formatSeconds(value) {
    var secondTime = parseInt(value); // 秒
    var minuteTime = 0; // 分
    var hourTime = 0; // 小時
    if (secondTime > 60) {
      minuteTime = parseInt(secondTime / 60);
      secondTime = parseInt(secondTime % 60);
      if (minuteTime > 60) {
        hourTime = parseInt(minuteTime / 60);
        minuteTime = parseInt(minuteTime % 60);
      }
    }
    var result = ':' + parseInt(secondTime);

    if (minuteTime > 0) {
      result = ':' + parseInt(minuteTime) + result;
    }
    if (hourTime > 0) {
      result = '' + parseInt(hourTime) + result;
    } else {
      result = '0' + result;
    }
    return result;
  }
  //分页相关
  const page = ref(1);
  const pageSize = ref(10);
  const total = ref(0);
  const pagination = ref({
    showSizeChanger: false,
    showQuickJumper: true,
    pageSize,
    current: page,
    total,
    showTotal: (total) => `总 ${total} 条`,
    onChange: pageChange,
    onShowSizeChange: pageSizeChange,
  });

  function pageChange(p, pz) {
    page.value = p;
    pageSize.value = pz;
    fetch();
  }
  function pageSizeChange(_current, size) {
    pageSize.value = size;
    fetch();
  }
  // 視頻modal
  const [videoModal, { openModal: openVideoModal }] = useModal();
  const [editModal, { openModal: openEditModal }] = useModal();

  function handleEdit(record: Recordable) {
    // console.log(record);
    openEditModal(true, {
      record,
    });
  }
  function handleVideo(record: Recordable) {
    // console.log(record);
    openVideoModal(true, {
      record,
    });
  }
</script>
<style lang="less">
  .ant-image {
    width: 100%;
    height: 130px;
    overflow: hidden;
  }
  .ant-card-grid {
    padding: 8px !important;
    max-height: 50px;
  }
  .account-center-project {
    &__tag {
      margin: 5px 10px;
    }
    &__card {
      width: 100%;

      .ant-card-body {
        padding: 0 0 24px;
      }

      img {
        width: 100%;
        height: auto;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
      }

      &-title {
        margin: 5px 10px;
        font-size: 16px;
        min-height: 70px;
        font-weight: 500;
        color: rgb(0 0 0 / 85%);
        text-overflow: ellipsis;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
      }

      &-content {
        margin: 5px 10px;
      }
    }
  }
</style>
