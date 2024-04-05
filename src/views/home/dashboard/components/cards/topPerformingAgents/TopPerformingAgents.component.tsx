import React from 'react';
import styles from './TopPerformingAgents.module.scss';
import useFetchData from '@/state/useFetchData';
import { Table } from 'antd';

const TopPerformingAgents = () => {
  const { data, isLoading, isError, isFetching, error } = useFetchData({
    url: '/agent/agent-reports1',
    key: 'topPerformingAgents',
    pageLimit: 3,
  });

  return (
    <Table
      columns={[
        {
          title: 'Agent',
          dataIndex: 'fullName',
          key: 'agent',
        },
        {
          title: '# of Transactions',
          dataIndex: 'transactions',
          key: 'transactions',
        },
        {
          title: 'Responsible for # of Merchants',
          dataIndex: 'merchants',
          key: 'merchants',
        },
        {
          title: 'Total Sales',
          dataIndex: 'total',
          key: 'sales',
          render: (text) => `$${text}`,
        },
      ]}
      dataSource={data?.payload?.data}
      rowKey="_id"
      loading={isLoading || isFetching}
      pagination={false}
      // if there is an error, display the error message
      footer={() => (!isError ? <div> 
        {/* {error.message} */} stuff
        </div> : null)}
    />
  );
};

export default TopPerformingAgents;
