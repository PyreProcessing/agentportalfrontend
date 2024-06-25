import React, { useEffect, useState } from 'react';

import styles from './Transactions.module.scss';
import { useTransactions } from '@/state/transactions/useTransactions';
import Error from '@/components/error/Error.component';
import Loader from '@/components/loader/Loader.component';
import Container from '@/layout/container/Container.layout';
import Transaction from './components/Transaction.component';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { Button, Tooltip } from 'antd';
import { useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import LineChart from '@/components/lineChart/LineChart.component';
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Line,
} from 'recharts';

type Props = {};

const TransactionsView = (props: Props) => {
  const [dateRange, setDateRange] = useState({
    startDate: moment().startOf('year'),
    endDate: moment().endOf('year'),
  });
  const [showGraph, setShowGraph] = useState(true);
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

  // Create a list of all unique dates
  const allDates = [
    ...(new Set(
      transactionsData?.transactionsByPaymentProcessor?.flatMap((processor) =>
        processor.dates.map((date) => date.date)
      )
    ) as any),
  ];

  // Initialize an object to store the aligned data
  const alignedData = allDates.map((date) => {
    const entry = { date };
    transactionsData?.transactionsByPaymentProcessor?.forEach((processor) => {
      const dateEntry = processor.dates.find((d) => d.date === date);
      entry[processor._id] = dateEntry ? dateEntry.total : 0;
    });
    return entry;
  });

  return (
    <div className={styles.container}>
      <Container title="Year by year transactions">
        <div className={styles.yearPicker}>
          <h1>{dateRange.startDate.year()}</h1>

          <div className={styles.yearButtons}>
            <Button
              onClick={() =>
                setDateRange({
                  startDate: dateRange.startDate.subtract(1, 'year'),
                  endDate: dateRange.endDate.subtract(1, 'year'),
                })
              }
              type="text"
              shape="circle"
              icon={<IoIosArrowBack />}
            />
            <Button
              onClick={() =>
                setDateRange({
                  startDate: dateRange.startDate.add(1, 'year'),
                  endDate: dateRange.endDate.add(1, 'year'),
                })
              }
              type="text"
              shape="circle"
              icon={<IoIosArrowForward />}
            />
          </div>
        </div>
        {isError && <Error error={error} />}
        {isLoading && <Loader title="Fetching Transactions" />}{' '}
        {transactionsData && !showGraph ? (
          transactionsData?.transactionsByPaymentProcessor?.map(
            (transaction) => (
              <Transaction key={transaction._id} transaction={transaction} />
            )
          )
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <RechartsLineChart data={alignedData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {transactionsData?.transactionsByPaymentProcessor?.map(
                (processor) => (
                  <Line
                    key={processor._id}
                    type="monotone"
                    dataKey={processor._id}
                    name={processor._id}
                    stroke="#8884d8"
                  />
                )
              )}
            </RechartsLineChart>
          </ResponsiveContainer>
        )}
      </Container>
    </div>
  );
};

export default TransactionsView;
