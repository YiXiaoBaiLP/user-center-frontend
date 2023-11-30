import { searchUsers } from '@/services/ant-design-pro/api';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Image } from 'antd';

import { useRef } from 'react';
export const waitTimePromise = async (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export const waitTime = async (time: number = 100) => {
  await waitTimePromise(time);
};
/**
 * columns 属性说明
 * - dataIndex 对应返回数据对象的名称
 * - title 表格列名
 * - copyable 是否允许复制
 * - ellipsis 是否允许缩略
 * - valueType 用于生命这一列的类型
 */
const columns: ProColumns<API.CurrentUser>[] = [
  {
    dataIndex: 'id',
    valueType: 'indexBorder',
    width: 30,
  },
  {
    title: '用户名称',
    dataIndex: 'username',
    // 是否可复制
    copyable: true,
    // 是否缩略
    ellipsis: true,
  },
  {
    title: '用户账户名',
    dataIndex: 'userAccount',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '头像',
    dataIndex: 'avatarUrl',
    ellipsis: true,
    render: (_, record) => (
      <div>
        <Image src={record.avatarUrl} width={50} height={50} />
      </div>
    ),
  },
  {
    title: '性别',
    dataIndex: 'gender',
    copyable: true,
    ellipsis: true,
    width: 70,
    valueEnum: {
      1: {
        text: '女',
      },
      0: {
        text: '男',
      },
    },
  },
  {
    title: '电话',
    dataIndex: 'phone',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '电子邮箱',
    dataIndex: 'email',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '用户状态',
    dataIndex: 'userStatus',
    ellipsis: true,
    valueEnum: {
      1: {
        text: '删除',
        status: 'Error',
      },
      0: {
        text: '正常',
        status: 'Success',
      },
    },
    width: 100,
  },
  {
    title: '用户角色',
    dataIndex: 'userRole',
    valueType: 'select',
    valueEnum: {
      1: {
        text: '管理员',
      },
      0: {
        text: '普通用户',
      },
    },
    ellipsis: true,
    width: 100,
  },
  {
    title: '用户编号',
    dataIndex: 'planetCode',
    copyable: true,
    ellipsis: true,
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'created_at',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    valueType: 'dateRange',
    hideInTable: true,
    search: {
      transform: (value) => {
        return {
          startTime: value[0],
          endTime: value[1],
        };
      },
    },
  },
  // {
  //   title: '标题',
  //   dataIndex: 'title',
  //   copyable: true,
  //   ellipsis: true,
  //   tip: '标题过长会自动收缩',
  //   formItemProps: {
  //     rules: [
  //       {
  //         required: true,
  //         message: '此项为必填项',
  //       },
  //     ],
  //   },
  // },
  // {
  //   disable: true,
  //   title: '状态',
  //   dataIndex: 'state',
  //   filters: true,
  //   onFilter: true,
  //   ellipsis: true,
  //   valueType: 'select',
  //   valueEnum: {
  //     all: { text: '超长'.repeat(50) },
  //     open: {
  //       text: '未解决',
  //       status: 'Error',
  //     },
  //     closed: {
  //       text: '已解决',
  //       status: 'Success',
  //       disabled: true,
  //     },
  //     processing: {
  //       text: '解决中',
  //       status: 'Processing',
  //     },
  //   },
  // },
  // {
  //   disable: true,
  //   title: '标签',
  //   dataIndex: 'labels',
  //   search: false,
  //   renderFormItem: (_, { defaultRender }) => {
  //     return defaultRender(_);
  //   },
  //   render: (_, record) => (
  //     <Space>
  //       {record.labels.map(({ name, color }) => (
  //         <Tag color={color} key={name}>
  //           {name}
  //         </Tag>
  //       ))}
  //     </Space>
  //   ),
  // },
  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        编辑
      </a>,
      <a href={record.avatarUrl} target="_blank" rel="noopener noreferrer" key="view">
        查看
      </a>,
      <a href={record.avatarUrl} target="_blank" rel="noopener noreferrer" key="view">
        复制
      </a>,
      <a href={record.avatarUrl} target="_blank" rel="noopener noreferrer" key="view">
        删除
      </a>,
      // <TableDropdown
      //   key="actionGroup"
      //   onSelect={() => action?.reload()}
      //   menus={[
      //     { key: 'copy', name: '复制' },
      //     { key: 'delete', name: '删除' },
      //   ]}
      // />,
    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType>();
  return (
    <ProTable<API.CurrentUser>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params, sort, filter) => {
        console.log(sort, filter);
        await waitTime(2000);
        // 给后端发送请求获取数据，然后将数据填充到columns字段中，使列表进行展示
        const userList = await searchUsers();
        return {
          data: userList,
        };
      }}
      editable={{
        type: 'multiple',
      }}
      columnsState={{
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },
      }}
      rowKey="id"
      search={{
        labelWidth: 'auto',
      }}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
        syncToUrl: (values, type) => {
          if (type === 'get') {
            return {
              ...values,
              created_at: [values.startTime, values.endTime],
            };
          }
          return values;
        },
      }}
      pagination={{
        pageSize: 5,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="用户列表"
    />
  );
};
