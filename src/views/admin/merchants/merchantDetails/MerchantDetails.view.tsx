import React from 'react';
import styles from './MerchantDetails.module.scss';
import formStyles from '@/Form.module.scss';
import { useRouter } from 'next/router';
import { Button, Divider, Form, Input, Select, Switch, Tooltip } from 'antd';
import { FaRandom } from 'react-icons/fa';
import generateRandomPassword from '@/utils/generateRandomPassword';
import usePostData from '@/state/usePostData';
import useUpdateData from '@/state/useUpdateData';
import useFetchData from '@/state/useFetchData';

const MerchantDetails = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const { id } = router.query;

  const { mutate: createMerchant } = usePostData({
    url: '/admin/merchant',
    key: 'merchant',
    queriesToInvalidate: ['merchants'],
    successMessage: 'Merchant invited successfully',
    redirectUrl: '/admin/merchants',
  });

  const { mutate: updateMerchant } = useUpdateData({
    queriesToInvalidate: ['merchants'],
    successMessage: 'Merchant updated successfully',
    redirectUrl: '/admin/merchants',
  });

  const { data, isLoading } = useFetchData({
    url: `/admin/agent/${id}`,
    key: 'merchant',
  });

  const onFinish = async (values: any) => {
    if (id) {
      updateMerchant({ url: `/admin/agent/${id}`, formData: { ...values } });
    } else {
      createMerchant(values);
    }
  };

  React.useEffect(() => {
    if (data?.payload) {
      form.setFieldsValue(data.payload);
    }
  }, [data?.payload]);
  return (
    <div className={styles.container}>
      <Divider orientation="left">Merchant Details</Divider>
      <Form
        form={form}
        layout="vertical"
        className={formStyles.form}
        initialValues={{
          status: 'active',
          role: 'merchant',
        }}
        onFinish={onFinish}
      >
        <div className={formStyles.form__formContainer}>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Business Name"
                name="businessName"
                rules={[
                  {
                    required: true,
                    message: 'Business Name is required',
                  },
                ]}
              >
                <Input type="text" placeholder="1234 holding company" />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Merchant First Name"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: 'Merchant First Name is required',
                  },
                ]}
              >
                <Input type="text" placeholder="John" />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item label="Merchant Last Name" name="lastName">
                <Input type="text" placeholder="Doe" />
              </Form.Item>
            </div>
          </div>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Email is required',
                  },
                ]}
              >
                <Input type="email" placeholder="something@email.com" />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Phone"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: 'Phone is required',
                  },
                ]}
                help="Format: 123-456-7890"
              >
                <Input
                  type="tel"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  placeholder="123-456-7890"
                />
              </Form.Item>
            </div>
            <div className={styles.inputContainer}>
              <div className={styles.input}>
                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      // if we are creating a merchant an initial password is required
                      required: !id,
                      message: 'Password is required',
                    },
                  ]}
                >
                  <Input.Password
                    className={formStyles.input}
                    autoComplete="new-password"
                  />
                </Form.Item>
              </div>
              {/* generate password button */}
              <div className={styles.iconContainer}>
                <Tooltip title="Generate Password">
                  <FaRandom
                    className={styles.icon}
                    onClick={async () => {
                      form.setFieldsValue({
                        password: generateRandomPassword(12),
                      });
                    }}
                  />
                </Tooltip>
              </div>
            </div>
          </div>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item label="Status" name="status">
                <Select
                  placeholder="Select Status"
                  allowClear
                  optionFilterProp="children"
                  options={[
                    { label: 'Active', value: 'active' },
                    { label: 'Inactive', value: 'inactive' },
                    { label: 'Suspended', value: 'deleted' },
                    { label: 'Pending', value: 'pending' },
                  ]}
                />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item label="Role" name="role">
                <Select
                  placeholder="Select Status"
                  mode="tags"
                  allowClear
                  optionFilterProp="children"
                  options={[{ label: 'Merchant', value: 'merchant' }]}
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <Divider orientation="left">Misc. Information</Divider>
        <div className={formStyles.form__formContainer}>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item label="Last Login Date" name="lastLogin">
                <Input type="text" readOnly disabled />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label="Email Verified"
                name="isEmailVerified"
                valuePropName="checked"
              >
                <Switch
                  unCheckedChildren="Not Verified"
                  checkedChildren="Verified"
                />
              </Form.Item>
            </div>
          </div>
        </div>
        <div className={formStyles.form__buttonContainer}>
          <Button className={formStyles.button} htmlType="submit">
            {id ? 'Update Merchant' : 'Invite Merchant'}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default MerchantDetails;
