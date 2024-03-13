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
          <Image :src="item.coverUrl" />
          <div :class="`${prefixCls}__card-title`">
            {{ item.title }}
            <Tooltip title="优质主题" placement="bottom">
              <Icon
                v-if="item.isQuality === true"
                :class="`${prefixCls}__action-icon`"
                icon="bx:bxs-like"
                color="#459ae8"
              />
            </Tooltip>
          </div>
          <div :class="`${prefixCls}__card-content`">
            {{ item.creationDateTime }}
          </div>
          <CardGrid :key="action.text" v-for="action in item.actions" style="width: 50%">
            <Tooltip :title="action.tooltip" placement="bottom">
              <Icon
                v-if="action.icon"
                :class="`${prefixCls}__action-icon`"
                :icon="action.icon"
                :color="action.color"
              />
              {{ action.text }}
            </Tooltip>
          </CardGrid>
        </Card>
      </ListItem>
    </template>
  </List>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { List, Card, Row, Col, Tooltip, Image } from 'ant-design-vue';
  import Icon from '/@/components/Icon/index';
  import { getUserShareTopics } from '/@/api/users';
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
    const res = await getUserShareTopics({
      userId: decodeURI(location.href).split('index/')[1],
      page: page.value,
    });

    for (let i = 0; i < res.items.length; i++) {
      datalist.value.push({
        title: res.items[i].name,
        creationDateTime: res.items[i].creationDateTime,
        coverUrl: res.items[i].videos[0].coverUrl,
        isQuality: res.items[i].isQuality,
        actions: [
          {
            icon: 'carbon:view-filled',
            text: res.items[i].playCount,
            color: '#5B4B00',
            tooltip: '主题视频观看数',
          },
          {
            icon: 'bx:bxs-like',
            text: res.items[i].likeCount,
            color: '#459ae8',
            tooltip: '主题获赞数',
          },
          {
            icon: 'fluent:document-page-number-20-filled',
            text: res.items[i].videoCount,
            color: '#004B97',
            tooltip: '主题视频数',
          },
          {
            icon: 'bx:bxs-user',
            text: res.items[i].videoUserCount,
            color: '#737300',
            tooltip: '所有上传了作品的用户数',
          },
        ],
      });
    }
    total.value = res.totalCount;
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
    // console.log(p);
    fetch();
  }
  function pageSizeChange(_current, size) {
    pageSize.value = size;
    fetch();
  }
</script>
<style lang="less">
  .ant-image {
    width: 100%;
    height: 130px;
    overflow: hidden;
  }
  .ant-card-grid {
    padding: 14px;
  }
  .account-center-project {
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
