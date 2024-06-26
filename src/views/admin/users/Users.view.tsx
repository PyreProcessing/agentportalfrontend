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
import { useUser } from '@/state/auth';
import useRemoveData from '@/state/useRemoveData';
import UserType from '@/types/UserType';

type Props = {};

const UsersView = (props: Props) => {
  const router = useRouter();

  const { data: loggedInData } = useUser();
  const user = loggedInData?.user;
  const { data, isFetching, isLoading, isError, error } = useFetchData({
    url: '/admin/agent',
    key: 'agents',
    filter: 'role;{"$elemMatch":"agent"}',
    refetchOnWindowFocus: false,
  });
  const { mutate: deleteAgent } = useRemoveData({
    queriesToInvalidate: ['agents'],
    successMessage: 'Agent deleted successfully',
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
              render: (text: any, record: UserType) => {
                return (
                  <div style={{ display: 'flex', width: '100%', gap: '10px' }}>
                    {/* render a next/link as a button */}
                    <Link href={`/admin/merchants/${record._id}`}>
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
                            'Are you sure you want this agent to be marked inactive?',
                          content:
                            'this may interfere with the accounts the agent is responsible for.',
                          okText: 'Mark Inactive',
                          okButtonProps: { danger: true },
                          onOk: () => {
                            deleteAgent({ url: `/admin/agent/${record._id}` });
                            Modal.destroyAll();
                          },
                        })
                      }
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                      }}
                      disabled={
                        // disable the delete button if the user is not an admin
                        // or if the id of the record is the same as the user's id
                        !user?.role?.includes('admin') ||
                        record._id === user?._id
                      }
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
