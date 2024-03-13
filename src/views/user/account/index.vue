<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable" class="w-4/4 xl:w-5/5" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">创建用户</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'mdi:note-edit-outline',
              tooltip: '修改昵称和密码',
              onClick: (e) => {
                e.stopPropagation();
                handleEdit(record);
              },
            },
          ]"
        />
      </template>
      <!-- <template #avatar="{ record }">
        <a-avatar :src="`${record.avatar}?random=${Math.random()}`" />
      </template> -->
    </BasicTable>
    <AccountModal @register="registerModal" @success="handleSuccess" />
    <AccountEdit @register="editModal" @success="handleSuccess" />
    <AccountDetail @register="detailModal" @success="handleSuccess" />
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { PageWrapper } from '@/components/Page';
  import { columns, searchFormSchema } from './account.data';
  import { getUsers } from '@/api/users';
  import { reactive } from 'vue';
  import { useModal } from '@/components/Modal';
  import AccountModal from './AccountModal.vue';
  import AccountEdit from './AccountEdit.vue';
  import AccountDetail from './AccountDetail.vue';

  const [registerModal, { openModal: openAddModal }] = useModal();
  const [editModal, { openModal: openEditModal }] = useModal();
  const [detailModal, { openModal: opendetailModal }] = useModal();

  const searchInfo = reactive<Recordable>({});

  const [registerTable, { reload }] = useTable({
    title: '用户列表',
    api: getUsers,
    beforeFetch: (params) => {
      params = { pageIndex: params.page, pageSize: params.pageSize };
      if (params.registerDate !== '' && params.registerDate !== undefined) {
        params['registrationStartDate'] = params.registerDate[0].split(' ')[0];
        params['registrationEndDate'] = params.registerDate[1].split(' ')[0];
      }
      return params;
    },
    columns: columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    pagination: true,
    striped: false,
    useSearchForm: true,
    showTableSetting: false,
    bordered: true,
    showIndexColumn: false,
    clickToRowSelect: false,
    handleSearchInfoFn(info) {
      const para = {
        now_page: 1,
      };
      if (info.userId !== '' && info.userId !== undefined) {
        para['userId'] = info.userId;
      }
      if (info.nickName !== '' && info.nickName !== undefined) {
        para['nickName'] = info.nickName;
      }
      if (info.email !== '' && info.email !== undefined) {
        para['email'] = info.email;
      }
      if (info.registerDate !== '' && info.registerDate !== undefined) {
        para['registrationStartDate'] = info.registerDate[0].split(' ')[0];
        para['registrationEndDate'] = info.registerDate[1].split(' ')[0];
      }
      return para;
    },
    actionColumn: {
      width: 150,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
    },
    rowKey: 'id',
    customRow: (record) => {
      return {
        onClick: () => {
          opendetailModal(true, { record });
        },
        style: {
          cursor: 'pointer',
        },
      };
    },
  });

  function handleCreate() {
    openAddModal(true, {
      isUpdate: false,
    });
  }

  function handleEdit(record: Recordable) {
    openEditModal(true, {
      record,
    });
  }

  function handleSuccess() {
    reload();
  }
</script>
