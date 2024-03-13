<template>
  <div :class="prefixCls"> 暂无资料 </div>
</template>

<script lang="ts">
  import { Tag, Tabs, Row, Col } from 'ant-design-vue';
  import { defineComponent, computed } from 'vue';
  import { CollapseContainer } from '/@/components/Container/index';
  import Icon from '/@/components/Icon/index';


  export default defineComponent({
    components: {
      CollapseContainer,
      Icon,
      Tag,
      Tabs,
      TabPane: Tabs.TabPane,

      [Row.name]: Row,
      [Col.name]: Col,
    },
    data() {
      return {
        prefixCls: 'account-center',
        avatar: '',
      };
    },
    mounted() {
      this.getDatas();
    },
    methods: {
      getDatas() {},
    },
  });
</script>
