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
          </div>
          <div :class="`${prefixCls}__card-content`">
            {{ item.creationDateTime }}
          </div>
          <CardGrid :key="action.text" v-for="action in item.actions" style="width: 100%">
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
  import { getUserRequestTopics } from '/@/api/users';
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
    const res = await getUserRequestTopics({
      userId: decodeURI(location.href).split('index/')[1],
      // userId: 1,

      page: page.value,
    });
    // console.log(res);

    for (let i = 0; i < res.items.length; i++) {
      datalist.value.push({
        title: res.items[i].name,
        creationDateTime: res.items[i].creationDateTime,
        coverUrl: res.items[i].coverUrl,
        actions: [
          {
            icon: 'clarity:star-line',
            text: res.items[i].favoriteCount,
            color: '#018ffb',
            tooltip: '收藏数',
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
    console.log(p);
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
