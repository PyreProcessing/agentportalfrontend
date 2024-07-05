import React from 'react';
import styles from './PreferredProcessor.module.scss';
import { Button, Form, Transfer } from 'antd';
import type { TransferProps } from 'antd';
import useUpdateData from '@/state/useUpdateData';
import { useRouter } from 'next/router';
import useFetchData from '@/state/useFetchData';

interface Processor {
  key: string;
  title: string;
  name?: string;
}

const PreferredProcessor = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;

  const [targetKeys, setTargetKeys] = React.useState<string[]>([]);
  const dataSource: Processor[] = [
    {
      key: '1',
      title: 'NMI',
      name: 'nmi',
    },
    {
      key: '2',
      title: 'PayNetWorx',
      name: 'paynetworx',
    },
    {
      key: '3',
      title: 'PayBright',
      name: 'paybright',
    },
    {
      key: '4',
      title: 'Celero',
      name: 'celero',
    },
    // add more processors here
  ];

  const { mutate: updatePreferredProcessor } = useUpdateData({
    queriesToInvalidate: ['merchant'],
    successMessage: 'Preferred Processor updated successfully',
  });
  const { data, isLoading } = useFetchData({
    url: `/admin/agent/${id}`,
    key: 'merchant',
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  const onChange: TransferProps<Processor>['onChange'] = (
    nextTargetKeys,
    direction,
    moveKeys
  ) => {
    console.log('targetKeys:', nextTargetKeys);
    console.log('direction:', direction);
    console.log('moveKeys:', moveKeys);
    // set the targetKeys array, place the moved item at the end of the array
    // if we are moving from right to left, filter out the moved item, if we are moving from left to right, add the moved item
    if (direction === 'right') {
      setTargetKeys([
        ...nextTargetKeys.filter((key) => !moveKeys.includes(key)),
        ...moveKeys,
      ]);
    } else if (direction === 'left') {
      setTargetKeys([...nextTargetKeys]);
    }
  };
  const onFinish = () => {
    const preferredProcessors =
      targetKeys
        .map(
          (key) => dataSource.find((processor) => processor.key === key)?.name
        )
        .filter((name) => name !== undefined) || [];

    const formData = {
      businessInfo: {
        // spread the rest of the businessInfo object, so that information isnt lost
        ...data?.payload?.businessInfo,
        preferredProcessors,
      },
    };

    console.log('FormData to send:', formData);

    updatePreferredProcessor({
      url: `/admin/agent/${id}`,
      formData,
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <p>
          Use this form to let the system know which processor to use first for
          this merchant, The system will attempt to use the preferred processor
          in position 1 as the processor to run transactions through first, if
          the preferred processor is not available or the transaction goes over
          the limit set in the processor settings the system will then attempt
          to use the processor in position 2 and so on.
        </p>
      </div>
      <div className={styles.formContainer}>
        <Transfer
          dataSource={dataSource}
          targetKeys={targetKeys}
          render={(item: Processor) => item.title}
          showSearch
          oneWay
          onChange={onChange}
        />

        <div className={styles.buttonContainer}>
          <Button
            type="primary"
            htmlType="submit"
            className={styles.button}
            onClick={onFinish}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreferredProcessor;
