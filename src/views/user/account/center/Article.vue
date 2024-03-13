<template>
  <List item-layout="vertical" :class="prefixCls" :pagination="pagination" :data-source="datalist">
    <template #renderItem="{ item }">
      <ListItem :key="item.title">
        <template #actions>
          <span>
            <div :class="`${prefixCls}__action`" v-for="action in item.actions" :key="action.text">
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
          </span>
          <span :class="`${prefixCls}__time`">{{ item.creationDateTime }}</span>
        </template>
        <template #extra>
          <img v-if="item.coverUrl !== '#'" width="272" alt="logo" :src="item.coverUrl" />
        </template>
        <ListItemMeta>
          <template>
            <div :class="`${prefixCls}__content`">
              {{ item.content }}
            </div>
          </template>
          <template #title>
            <p :class="`${prefixCls}__title`">
              {{ item.title }}
              <Tooltip title="优质主题" placement="bottom">
                <Icon
                  v-if="item.isQuality === true"
                  :class="`${prefixCls}__action-icon`"
                  icon="bx:bxs-like"
                  color="#459ae8"
                />
              </Tooltip>
            </p>
            <div>
              <template v-for="tag in item.tags" :key="tag">
                <Tag class="mb-2" color="orange">
                  {{ tag }}
                </Tag>
              </template>
            </div>
          </template>
        </ListItemMeta>
        {{ item.content }}
      </ListItem>
    </template>
  </List>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { List, Tag, Tooltip } from 'ant-design-vue';
  import Icon from '/@/components/Icon/index';
  import { getUserArticles } from '/@/api/users';
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
    const res = await getUserArticles({
      userId: decodeURI(location.href).split('index/')[1],
      // userId: 1,

      page: page.value,
    });
    // console.log(res);
    // console.log(res.videos[1].imageUrls[0]);
    for (let i = 0; i < res.items.length; i++) {
      datalist.value.push({
        title: res.items[i].title,
        tags: res.items[i].tags,
        content: res.items[i].content,
        isQuality: res.items[i].isQuality,

        creationDateTime: res.items[i].creationDateTime,
        coverUrl:
          res.items[i].imageUrls !== null
            ? res.items[i].imageUrls[0]
            : res.items[i].videos !== null
            ? res.items[i].videos[0].coverUrl
            : '#',
        actions: [
          {
            icon: 'clarity:star-line',
            text: res.items[i].favoriteCount,
            color: '#018ffb',
            tooltip: '收藏数',
          },
          {
            icon: 'bx:bxs-like',
            text: res.items[i].likeCount,
            color: '#459ae8',
            tooltip: '文章获赞数量',
          },
          {
            icon: 'bx:bxs-message-dots',
            text: res.items[i].commentCount,
            color: '#42d27d',
            tooltip: '文章评论数',
          },
          {
            icon: 'bx:bx-lock-open-alt',
            text: res.items[i].unlockCount,
            color: '#D9B300',
            tooltip: '解锁数（阅读数）',
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
<style>
  .ant-list-item-main {
    position: relative;
  }
  .ant-list-item-action {
    position: absolute;
    bottom: 0;
  }
  .ant-list-vertical .ant-list-item-extra {
    width: 200px;
    height: 140px;
    overflow: hidden;
  }
  .ant-list-vertical .ant-list-item-extra img {
    width: 100%;
    height: auto;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
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

      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3) {
        border-right: 1px solid rgb(206 206 206 / 40%);
      }
      &:nth-child(1) {
        padding: 0px 16px 0px 0px;
      }
      &-icon {
        margin-right: 3px;
      }
    }

    &__time {
      color: rgb(0 0 0 / 45%);
    }
  }
</style>
