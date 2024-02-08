import React, { useEffect, useState } from 'react';

import styles from './Users.module.scss';
import SearchWrapper from '@/layout/searchWrapper/SearchWrapper.layout';
import { FaEdit, FaLink, FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/router';
import useFetchData from '@/state/useFetchData';
import { Button, Modal, Table, Tag } from 'antd';
import { BsTrash2Fill } from 'react-icons/bs';
import Link from 'next/link';
import { NProgressLoader } from '@/components/nprogress/NProgressLoader.component';
import Error from '@/components/error/Error.component';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';

type Props = {};

const UsersView = (props: Props) => {
  const router = useRouter();
  const { data, isFetching, isLoading, isError, error } = useFetchData({
    url: '/agent',
    key: 'agents',
  });

  if (isError) {
    return <Error error={error} />;
  }
  return (
    <div className={styles.container}>
      <SearchWrapper
        placeholder="Search for agents"
        queryKey="agents"
        buttons={[
          {
            icon: <FaPlus />,
            toolTip: 'Add new agent',
            type: 'link',
            onClick: () => {
              router.push('/admin/agents/invite');
            },
          },
        ]}
        filters={[
          {
            key: '',
            label: 'All Agents',
          },
        ]}
        sort={[
          {
            key: '',
            label: 'Default',
          },
          {
            key: 'createdAt;-1',
            label: 'Newest',
          },
          {
            key: 'createdAt;1',
            label: 'Oldest',
          },
        ]}
        total={data?.payload?.totalCount}
        key={'agents'}
        isFetching={isFetching}
        disableButtons={isFetching}
      >
        {isFetching && <NProgressLoader />}
        <Table
          size="small"
          columns={[
            {
              title: 'Agent Name',
              dataIndex: 'fullName',
              key: 'name',
            },
            {
              title: 'Email',
              dataIndex: 'email',
              key: 'email',
            },
            {
              title: 'Status',
              dataIndex: 'status',
              key: 'status',
              render: (text: any, record: any) => {
                return (
                  <span>
                    {{
                      active: (
                        <Tag color="green" icon={<CheckCircleOutlined rev />}>
                          Active
                        </Tag>
                      ),
                      inactive: (
                        <Tag color="red" icon={<CloseCircleOutlined rev />}>
                          Inactive
                        </Tag>
                      ),
                      pending: (
                        <Tag
                          color="warning"
                          icon={<ExclamationCircleOutlined rev={true} />}
                        >
                          Pending
                        </Tag>
                      ),
                    }[text] ?? (
                      <Tag color="default" icon={<MinusCircleOutlined rev />}>
                        Unkown
                      </Tag>
                    )}
                  </span>
                );
              },
            },
            {
              title: 'Actions',
              dataIndex: 'actions',
              key: 'actions',
              render: (text: any, record: any) => {
                return (
                  <div style={{ display: 'flex', width: '100%', gap: '10px' }}>
                    {/* render a next/link as a button */}
                    <Link href={`/professional_oddysey/blog/${record._id}`}>
                      <Button
                        type="primary"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                      >
                        <FaEdit /> Edit
                      </Button>
                    </Link>

                    <Button
                      onClick={() =>
                        Modal.confirm({
                          title:
                            'Are you sure you want to delete this work history?',
                          content: 'This action cannot be undone',
                          okText: 'Delete',
                          okButtonProps: { danger: true },
                          onOk: () => {
                            // deleteBlog(record._id);
                            // Modal.destroyAll();
                          },
                        })
                      }
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                    >
                      <BsTrash2Fill /> Delete
                    </Button>
                  </div>
                );
              },
            },
          ]}
          dataSource={data?.payload?.agents}
          rowKey="_id"
          pagination={false}
        />
      </SearchWrapper>
    </div>
  );
};

export default UsersView;
