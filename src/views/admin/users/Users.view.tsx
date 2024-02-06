import React, { useEffect, useState } from 'react';

import styles from './Users.module.scss';
import SearchWrapper from '@/layout/searchWrapper/SearchWrapper.layout';
import { FaPlus } from 'react-icons/fa';
import { useRouter } from 'next/router';

type Props = {};

const UsersView = (props: Props) => {
  const router = useRouter();
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
        filters={[]}
        total={0}
        key={'agents'}
        isFetching={false}
      ></SearchWrapper>
    </div>
  );
};

export default UsersView;
