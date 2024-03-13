<template>
  <div :class="prefixCls">
    <a-row :class="`${prefixCls}-top`">
      <a-col :span="12" :class="`${prefixCls}-col`">
        <a-row>
          <a-col :span="8" style="text-align: center">
            <div :class="`${prefixCls}-top__avatar`">
              <img width="70" height="70" :src="avatar" />
              <span>{{ nickName }}</span>
            </div>
            <Tag class="mb-2" color="green"> ID：{{ userID }} </Tag>
          </a-col>
          <a-col :span="16">
            <div :class="`${prefixCls}-top__detail`">
              <template v-for="detail in details" :key="detail.title">
                <p>
                  <Icon :icon="detail.icon" />
                  {{ detail.title }}<span style="color: red">{{ detail.span }}</span>
                </p>
              </template>
            </div>
          </a-col>
        </a-row>
      </a-col>
      <a-col :span="6" :class="`${prefixCls}-col`">
        <CollapseContainer title="标签" :canExpan="false">
          <template v-for="tag in tags" :key="tag">
            <Tag class="mb-2" color="orange">
              {{ tag }}
            </Tag>
          </template>
        </CollapseContainer>
      </a-col>
      <a-col :span="6" :class="`${prefixCls}-col`">
        <CollapseContainer title="帐户金额" :canExpan="false">
          <template v-for="detail in teams" :key="detail.title">
            <p>
              <Icon :icon="detail.icon" :color="detail.color" />
              {{ detail.title }}：
              {{ detail.description }}
            </p>
          </template>
        </CollapseContainer>
      </a-col>
    </a-row>
    <div :class="`${prefixCls}-bottom`">
      <Tabs>
        <template v-for="item in achieveList" :key="item.key">
          <TabPane :tab="item.name">
            <component :is="item.component" />
          </TabPane>
        </template>
      </Tabs>
    </div>
  </div>
</template>

<script lang="ts">
  import { Tag, Tabs, Row, Col } from 'ant-design-vue';
  import { defineComponent, computed } from 'vue';
  import { CollapseContainer } from '/@/components/Container/index';
  import Icon from '/@/components/Icon/index';
  import Article from './Article.vue';
  import Project from './Project.vue';
  import shareProject from './shareProject.vue';
  import videoLong from './videoLong.vue';
  import videoShort from './videoShort.vue';
  import Question from './Question.vue';
  import { tags, details, achieveList, teams } from './data';
  import { useUserStore } from '/@/store/modules/user';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getDetail } from '/@/api/users';
  const { createMessage } = useMessage();

  export default defineComponent({
    components: {
      CollapseContainer,
      Icon,
      Tag,
      Tabs,
      TabPane: Tabs.TabPane,
      Article,
      Question,
      Project,
      shareProject,
      videoLong,
      videoShort,
      [Row.name]: Row,
      [Col.name]: Col,
    },
    data() {
      const userStore = useUserStore();

      return {
        prefixCls: 'account-center',
        avatar: '',
        tags,
        teams,
        nickName: '',
        userID: '',
        details,
        achieveList,
      };
    },
    mounted() {
      this.getDatas();
    },
    methods: {
      getDatas() {
        getDetail({ userId: decodeURI(location.href).split('index/')[1] }).then((res) => {
          // console.log(res);
          this.avatar = res.imageUrl;
          this.nickName = res.nickName;
          this.userID = decodeURI(location.href).split('index/')[1];
          this.details = [
            {
              icon: res.gender === 1 ? 'ant-design:man-outlined' : 'ant-design:woman-outlined',
              title: res.gender === 1 ? '男' : '女',
            },
            {
              icon: 'mdi:account-heart',
              title:
                res.sexOrientation === 1
                  ? '同性'
                  : res.sexOrientation === 2
                  ? '异性'
                  : res.sexOrientation === 3
                  ? '通吃'
                  : '',
            },
            {
              icon: 'eva:email-outline',
              title: res.email,
            },
            {
              icon: 'feather:upload',
              title: '当前正在上传视频数：',
              span: res.uploadingVideoCount,
            },
          ];
          this.tags = res.tags;
          this.teams = [
            {
              icon: 'ant-design:dollar-circle-outlined',
              title: '金币剩余',
              description: res.balance.goldCoinAmount,
              color: '#C6A300',
            },
            {
              icon: 'ant-design:dollar-circle-outlined',
              title: '红币信息',
              description: res.balance.redGoinAmount,
              color: '#F75000',
            },
            {
              icon: 'bx:bx-time-five',
              title: '包时段到期',
              description:
                res.planExpirationDateTime !== null ? res.planExpirationDateTime : '暂无包时段购买',
              color: '#844200',
            },
          ];
        });
      },
    },
  });
</script>
<style lang="less" scoped>
  .account-center {
    &-col:not(:last-child) {
      padding: 0 10px;

      &:not(:last-child) {
        border-right: 1px dashed rgb(206 206 206 / 50%);
      }
    }

    &-top {
      padding: 10px;
      margin: 16px 16px 12px;
      background-color: @component-background;
      border-radius: 3px;

      &__avatar {
        text-align: center;

        img {
          margin: auto;
          height: 70px;
          width: 70px;
          border-radius: 50%;
        }

        span {
          display: block;
          font-size: 20px;
          font-weight: 500;
        }

        div {
          margin-top: 3px;
          font-size: 12px;
        }
      }

      &__detail {
        padding-left: 20px;
        margin-top: 15px;
        p {
          margin-bottom: 1em;
        }
      }

      &__team {
        &-item {
          display: inline-block;
          padding: 4px 24px;
        }

        span {
          margin-left: 3px;
        }
      }
    }

    &-bottom {
      padding: 10px;
      margin: 0 16px 16px;
      background-color: @component-background;
      border-radius: 3px;
    }
  }
</style>
