<template>
  <List item-layout="vertical" :class="prefixCls" :pagination="pagination" :data-source="datalist">
    <template #renderItem="{ item }">
      <ListItem :key="item.title">
        <ListItemMeta>
          <template #description>
            <div :class="`${prefixCls}__content`">
              {{ item.content }}
            </div>
          </template>
          <template #title>
            <p :class="`${prefixCls}__title`">
              {{ item.title }}
            </p>
          </template>
        </ListItemMeta>
        <div>
          <template v-for="action in item.actions" :key="action.text">
            <div :class="`${prefixCls}__action`">
              <Tooltip :title="action.tooltip" placement="bottom">
                <Icon
                  v-if="action.icon"
                  :class="`${prefixCls}__action-icon`"
                  :icon="action.icon"
                  :color="action.color"
                />
                {{ action.text }}
              </Tooltip>
            </div>
          </template>
          <span :class="`${prefixCls}__time`">{{ item.creationDateTime }}</span>
        </div>
      </ListItem>
    </template>
  </List>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { List, Tooltip } from 'ant-design-vue';
  import Icon from '/@/components/Icon/index';
  import { getUserQuestions } from '/@/api/users';
  const ListItem = List.Item;
  const ListItemMeta = List.Item.Meta;
  const prefixCls = 'account-center-article';
  //暴露内部方法
  const emit = defineEmits(['getMethod']);
  // 自动请求并暴露内部方法
  onMounted(() => {
    fetch();
    emit('getMethod', fetch);
  });
  const datalist = ref([]);
  async function fetch(p = {}) {
    const res = await getUserQuestions({
      userId: decodeURI(location.href).split('index/')[1],
      page: page.value,
    });
    // console.log(res);

    for (let i = 0; i < res.items.length; i++) {
      datalist.value.push({
        title: res.items[i].content,
        creationDateTime: res.items[i].creationDateTime,
        actions: [
          {
            icon: 'clarity:star-line',
            text: res.items[i].favoriteCount,
            color: '#018ffb',
            tooltip: '收藏数',
          },
          {
            icon: 'bx:bxs-message-dots',
            text: res.items[i].answerCount,
            color: '#42d27d',
            tooltip: '已有回答数',
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
<style lang="less" scoped>
  .account-center-article {
    &__title {
      margin-bottom: 12px;
      font-size: 18px;
      text-overflow: ellipsis;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
    }

    &__content {
      color: rgb(0 0 0 / 65%);
    }

    &__action {
      display: inline-block;
      padding: 0 16px;
      color: rgb(0 0 0 / 45%);

      &:nth-child(1) {
        border-right: 1px solid rgb(206 206 206 / 40%);
      }

      &-icon {
        margin-right: 3px;
      }
    }

    &__time {
      position: absolute;
      right: 20px;
      color: rgb(0 0 0 / 45%);
    }
  }
</style>
