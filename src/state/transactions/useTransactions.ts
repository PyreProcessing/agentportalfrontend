import { QueryClient, useMutation, useQuery } from '@tanstack/react-query';
import axios from '@/utils/axios';
import { useQueryClient } from '@tanstack/react-query';
import errorHandler from '@/utils/errorHandler';
import { message } from 'antd';

export const fetchTransactions = async (startDate, endDate) => {
  // turn the date objects into ISO strings
  startDate = startDate.toISOString();
  endDate = endDate.toISOString();
   
  const { data } = await axios.get(
    `/owner/transaction?agent=true&startDate=${startDate}&endDate=${endDate}`
  );
  return data;
};

export const useTransactions = (options?: {
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
  startDate?: Date;
  endDate?: Date;
}) => {
  const query = useQuery(
    [
      'transactions',
      options?.startDate?.toDateString(),
      options?.endDate?.toDateString(),
    ],
    () => fetchTransactions(options?.startDate, options?.endDate),
    {
      onError: (error: any) => {
        errorHandler(error);
        options?.onError && options?.onError(error);
      },
      refetchOnWindowFocus: true,
      onSuccess: (data: any) => {
        options?.onSuccess && options?.onSuccess(data);
      },
    }
  );
  return query;
};
