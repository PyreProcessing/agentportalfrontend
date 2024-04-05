import React, { useEffect, useState } from 'react';
import styles from './TransactionsThisMonth.module.scss';
import Error from '@/components/error/Error.component';
import Loader from '@/components/loader/Loader.component';
import { useTransactions } from '@/state/transactions/useTransactions';
import Transaction from '@/views/home/transactions/components/Transaction.component';
import { useQueryClient } from '@tanstack/react-query';
import { Button } from 'antd';
import moment from 'moment';
import Link from 'next/link';

const TransactionsThisMonth = () => {
  const [dateRange, setDateRange] = useState({
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
  });

  const { data, isLoading, isError, error } = useTransactions({
    startDate: dateRange.startDate.toDate(),
    endDate: dateRange.endDate.toDate(),
  });
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.invalidateQueries([
      'transactions',
      dateRange.startDate.toDate(),
      dateRange.endDate.toDate(),
    ]);
  }, [dateRange]);
  const transactionsData = data?.payload;
  return (
    <div className={styles.container}>
      <h1>
        {
          // display the month and year
          dateRange.startDate.format('MMMM')
        }
      </h1>
      <div className={styles.contentContainer}>
        {isError && <Error error={error} />}
        {isLoading && <Loader title="Fetching Transactions" />}{' '}
        {transactionsData && (
          <Transaction
            transaction={{ type: 'PayNetWorx', ...transactionsData }}
          />
        )}
      </div>
      {/* view more button takes user to transaction page */}
      <div className={styles.buttonContainer}>
        <Link href="/home/transactions">
          <Button>View More</Button>
        </Link>
      </div>
    </div>
  );
};

export default TransactionsThisMonth;
