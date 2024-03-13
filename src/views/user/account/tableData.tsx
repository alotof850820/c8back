import { FormProps, FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
import moment from 'moment';
import { h } from 'vue';

const start = new Date();
const now = new Date();
start.setHours(0, 0, 0, 999);
export const searchFormSchema: FormSchema[] = [
  {
    field: 'userId',
    label: '用户ID',
    component: 'Input',
    labelWidth: 68,
    colProps: { span: 6 },
    // defaultValue: decodeURI(location.href).split('MoneyTable/')[1].split('-')[0]
  },
  {
    field: 'registerDate',
    label: '充值时间',
    component: 'RangePicker',
    labelWidth: 68,
    colProps: { span: 6 },
    defaultValue: [
      moment(start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)),
      moment(now.setHours(23, 59, 59, 999)).format('YYYY-MM-DD'),
    ],
  },
];
export function getMoneyColumns(): BasicColumn[] {
  return [
    {
      title: '充值ID',
      dataIndex: 'transactionId',
      fixed: 'left',
      width: 50,
    },
    {
      title: '充值类型',
      dataIndex: 'type',
      width: 70,
      customRender: ({ record }) => {
        if (record.type === 1) {
          return '自定义金额';
        } else if (record.type === 2) {
          return '包日';
        } else if (record.type === 3) {
          return '包周';
        } else if (record.type == 4) {
          return '包月';
        } else if (record.type == 99) {
          return '推荐';
        } else {
          return '';
        }
      },
    },
    {
      title: '充值金额',
      dataIndex: 'amount',
      sorter: true,
      width: 100,
      customRender: ({ record }) => {
        return '¥' + record.amount;
      },
    },
    {
      title: '充值日期',
      width: 50,
      sorter: true,
      dataIndex: 'creationDateTime',
    },
  ];
}
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '充值ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 20,
    },
    {
      title: '充值类型',
      dataIndex: 'name',
      width: 50,
      filters: [
        { text: '金币购买', value: 'male' },
        { text: '包日', value: 'female' },
      ],
    },
    {
      title: '充值金额',
      dataIndex: 'money',
      sorter: true,

      width: 100,
    },
    {
      title: '充值日期',
      width: 50,
      sorter: true,
      dataIndex: 'beginTime',
    },
  ];
}

export function getBasicShortColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      width: 150,
      dataIndex: 'id',
      sorter: true,
      sortOrder: 'ascend',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '地址',
      dataIndex: 'address',
    },
    {
      title: '编号',
      dataIndex: 'no',
      width: 80,
    },
  ];
}

export function getMultipleHeaderColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 200,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 120,
    },
    {
      title: '地址',
      dataIndex: 'address',
      sorter: true,
      children: [
        {
          title: '编号',
          dataIndex: 'no',
          width: 120,
          filters: [
            { text: 'Male', value: 'male', children: [] },
            { text: 'Female', value: 'female', children: [] },
          ],
        },

        {
          title: '开始时间',
          dataIndex: 'beginTime',
          width: 120,
        },
        {
          title: '结束时间',
          dataIndex: 'endTime',
          width: 120,
        },
      ],
    },
  ];
}

export function getCustomHeaderColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 200,
    },
    {
      // title: '姓名',
      dataIndex: 'name',
      width: 120,
      slots: { title: 'customTitle' },
    },
    {
      // title: '地址',
      dataIndex: 'address',
      width: 120,
      slots: { title: 'customAddress' },
      sorter: true,
    },

    {
      title: '编号',
      dataIndex: 'no',
      width: 120,
      filters: [
        { text: 'Male', value: 'male', children: [] },
        { text: 'Female', value: 'female', children: [] },
      ],
    },
    {
      title: '开始时间',
      dataIndex: 'beginTime',
      width: 120,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      width: 120,
    },
  ];
}
const renderContent = ({ text, index }: { text: any; index: number }) => {
  const obj: any = {
    children: text,
    attrs: {},
  };
  if (index === 9) {
    obj.attrs.colSpan = 0;
  }
  return obj;
};
export function getMergeHeaderColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 300,
      customRender: renderContent,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 300,
      customRender: renderContent,
    },
    {
      title: '地址',
      dataIndex: 'address',
      colSpan: 2,
      width: 120,
      sorter: true,
      customRender: ({ text, index }: { text: any; index: number }) => {
        const obj: any = {
          children: text,
          attrs: {},
        };
        if (index === 2) {
          obj.attrs.rowSpan = 2;
        }
        if (index === 3) {
          obj.attrs.colSpan = 0;
        }
        return obj;
      },
    },
    {
      title: '编号',
      dataIndex: 'no',
      colSpan: 0,
      filters: [
        { text: 'Male', value: 'male', children: [] },
        { text: 'Female', value: 'female', children: [] },
      ],
      customRender: renderContent,
    },
    {
      title: '开始时间',
      dataIndex: 'beginTime',
      width: 200,
      customRender: renderContent,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      width: 200,
      customRender: renderContent,
    },
  ];
}
export const getAdvanceSchema = (itemNumber = 6): FormSchema[] => {
  const arr: any = [];
  for (let index = 0; index < itemNumber; index++) {
    arr.push({
      field: `field${index}`,
      label: `字段${index}`,
      component: 'Input',
      colProps: {
        xl: 12,
        xxl: 8,
      },
    });
  }
  return arr;
};
export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      ...getAdvanceSchema(5),
      {
        field: `field11`,
        label: `Slot示例`,
        component: 'Select',
        slot: 'custom',
        colProps: {
          xl: 12,
          xxl: 8,
        },
      },
    ],
  };
}
export function getBasicData() {
  const data: any = (() => {
    const arr: any = [];
    for (let index = 0; index < 40; index++) {
      arr.push({
        id: `${index}`,
        name: 'John Brown',
        age: `1${index}`,
        no: `${index + 10}`,
        address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
        beginTime: new Date().toLocaleString(),
        endTime: new Date().toLocaleString(),
      });
    }
    return arr;
  })();
  return data;
}

export function getTreeTableData() {
  const data: any = (() => {
    const arr: any = [];
    for (let index = 0; index < 40; index++) {
      arr.push({
        id: `${index}`,
        name: 'John Brown',
        age: `1${index}`,
        no: `${index + 10}`,
        address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
        beginTime: new Date().toLocaleString(),
        endTime: new Date().toLocaleString(),
        children: [
          {
            id: `l2-${index}`,
            name: 'John Brown',
            age: `1${index}`,
            no: `${index + 10}`,
            address: 'New York No. 1 Lake ParkNew York No. 1 Lake Park',
            beginTime: new Date().toLocaleString(),
            endTime: new Date().toLocaleString(),
          },
        ],
      });
    }
    return arr;
  })();

  return data;
}
