import React from 'react';
import styles from './BusinessInfo.module.scss';
import formStyles from '@/Form.module.scss';
import { Button, Form, Input, Select } from 'antd';
import { useRouter } from 'next/router';
import useUpdateData from '@/state/useUpdateData';
import useFetchData from '@/state/useFetchData';
import PhotoUpload from '@/components/photoUpload/PhotoUpload.component';

const BusinessInfo = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;
  const [logo, setLogo] = React.useState('' as string | ArrayBuffer | null);

  const { mutate: updateMerchant } = useUpdateData({
    queriesToInvalidate: ['merchants', 'merchant'],
    successMessage: 'Merchant updated successfully',
  });
  const { data, isLoading } = useFetchData({
    url: `/admin/agent/${id}`,
    key: 'merchant',
    refetchOnWindowFocus: false,
    enabled: !!id,
  });
  const onFinish = async (values: any) => {
    updateMerchant({
      url: `/merchant/${id}`,
      formData: {
        businessInfo: {
          // we want to spread out all other values that werent in the form,
          // and then add the form values
          ...data.payload.businessInfo,
          ...values.businessInfo,
        },
      },
    });
  };
  React.useEffect(() => {
    if (id && data?.payload) {
      form.setFieldsValue(data.payload);
    }
  }, [data?.payload]);

  // useEffect to update the logo if the logoUrl changes
  React.useEffect(() => {
    setLogo(form.getFieldValue(['businessInfo', 'logoUrl']));
  }, [form.getFieldValue(['businessInfo', 'logoUrl'])]);

  return (
    <div className={styles.container}>
      <Form
        form={form}
        layout="vertical"
        className={formStyles.form}
        onFinish={onFinish}
      >
        <div className={formStyles.form__formContainer}>
          <div className={styles.imageUploadContainer}>
            <div className={styles.imageContainer}>
              <PhotoUpload
                listType="picture-card"
                isAvatar={false}
                label="Buisness Logo"
                tooltip="This is the logo that will be displayed on your business page. It should be a square image. The recommended size is 200x200 pixels."
                name={['businessInfo', 'logoUrl']}
                aspectRatio={16 / 9}
                form={form}
                action={`${process.env.API_URL}/upload`}
                default={logo as string}
                data={{
                  businessName: form.getFieldValue(['businessInfo', 'name']),
                }}
              />
            </div>
            <Form.Item
              name={['businessInfo', 'logoUrl']}
              label="Business Logo URL"
              rules={[]}
            >
              <Input className={styles.input} />
            </Form.Item>
          </div>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                name={['businessInfo', 'name']}
                label="Business Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your Business Name',
                  },
                ]}
                tooltip="This is the name of your business, as it appears on your business license."
              >
                <Input className={styles.input} placeholder="Business Name" />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                name={['businessInfo', 'website']}
                label="Business Website"
                rules={[]}
              >
                <Input
                  className={styles.input}
                  placeholder="https://www.yourbusiness.com"
                />
              </Form.Item>
            </div>
          </div>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                name={['businessInfo', 'address']}
                label="Address"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your address',
                  },
                ]}
              >
                <Input className={styles.input} placeholder="XXX main st" />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                name={['businessInfo', 'city']}
                label="City"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your city',
                  },
                ]}
              >
                <Input className={styles.input} placeholder="City" />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                name={['businessInfo', 'state']}
                label="State"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your state',
                  },
                ]}
              >
                <Input className={styles.input} placeholder="State" />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                name={['businessInfo', 'zipcode']}
                label="Zip"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your zip',
                  },
                ]}
              >
                <Input className={styles.input} placeholder="Zip" />
              </Form.Item>
            </div>
          </div>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                name={['businessInfo', 'email']}
                label="Business Email"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your business email address',
                  },
                ]}
              >
                <Input
                  className={styles.input}
                  placeholder="example@yourbusiness.com"
                />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                name={['businessInfo', 'phone']}
                label="Business Phone Number"
                rules={[
                  {
                    required: true,
                    message: 'Please enter your phone number',
                  },
                ]}
              >
                <Input className={styles.input} placeholder="XXX-XXX-XXXX" />
              </Form.Item>
            </div>
          </div>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                name={['businessInfo', 'ein']}
                label={'EIN'}
                rules={[
                  {
                    required: true,
                    message: 'Please enter your EIN',
                  },
                ]}
                tooltip="This is the EIN or TIN of your business, as it appears on your business license, this is your Tax ID."
              >
                <Input className={styles.input} placeholder="EIN" />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                name={['businessInfo', 'expectedMonthlyRevenue']}
                label={'Expected Monthly Revenue'}
                rules={[]}
                tooltip="Expected monthly revenue from your business, Gross Revenue. This is the total amount of money your business makes before any expenses are deducted."
                initialValue={'0-10k'}
              >
                <Select
                  placeholder="Select"
                  className={styles.select}
                  options={[
                    { value: '0-10k', label: '0-10k' },
                    { value: '10k-50k', label: '10k-50k' },
                    { value: '50k-100k', label: '50k-100k' },
                    { value: '100k-500k', label: '100k-500k' },
                    { value: '500k-1M', label: '500k-1M' },
                    { value: '1M+', label: '1M+' },
                  ]}
                />
              </Form.Item>
            </div>
          </div>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Privacy Policy"
                tooltip="https link to the merchants privacy policy page"
                name={['businessInfo', 'privacyPolicy']}
              >
                <Input placeholder="Privacy Policy" />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Terms of Use/Service"
                tooltip="https link to the merchants terms of use page"
                name={['businessInfo', 'termsOfService']}
              >
                <Input placeholder="Terms of Use" />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className={formStyles.form__buttonContainer}>
          <Button className={formStyles.button} htmlType="submit">
            Update Merchant
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default BusinessInfo;
