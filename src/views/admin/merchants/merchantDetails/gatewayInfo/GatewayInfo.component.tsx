import React from 'react';
import styles from './GatewayInfo.module.scss';
import formStyles from '@/Form.module.scss';
import { Button, Divider, Form, Input } from 'antd';
import useFetchData from '@/state/useFetchData';
import { useRouter } from 'next/router';
import capitalizeWords from '@/utils/capitalizeWords';
import NmiForms from './forms/NmiForms.component';
import useUpdateData from '@/state/useUpdateData';
import Paynetworx from './forms/Paynetworx.component';
import Paybright from './forms/Paybright.component';
import Celero from './forms/Celero.component';

const GatewayInfo = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;
  const { data, isLoading } = useFetchData({
    url: `/admin/agent/${id}`,
    key: 'merchant',
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
  const { mutate: updateMerchant } = useUpdateData({
    queriesToInvalidate: ['merchants', 'merchant'],
    successMessage: 'Merchant updated successfully',
  });
  const onFinish = async (values: any) => {
    updateMerchant({ url: `/admin/agent/${id}`, formData: { ...values } });
  };
  React.useEffect(() => {
    if (id && data?.payload) {
      form.setFieldsValue(data.payload);
    }
  }, [data?.payload]);

  const merchant = data?.payload;
  return (
    <div className={styles.container}>
      <Form
        form={form}
        layout="vertical"
        className={formStyles.form}
        initialValues={{}}
        onFinish={onFinish}
      >
        <NmiForms form={form} />
        <Paynetworx form={form} />
        {/* <Paybright form={form} /> */}
        {/* <Celero form={form} /> */}
        <div className={formStyles.form__buttonContainer}>
          <Button className={formStyles.button} htmlType="submit">
            {id ? 'Update Merchant' : 'Invite Merchant'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default GatewayInfo;
