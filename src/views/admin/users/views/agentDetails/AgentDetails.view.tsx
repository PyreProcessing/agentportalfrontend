import React, { useEffect } from 'react';
import Error from '@/components/error/Error.component';
import useFetchData from '@/state/useFetchData';
import { Button, Form, Input, Select, Tooltip } from 'antd';
import { useRouter } from 'next/router';
import styles from './AgentDetails.module.scss';
import formStyles from '@/Form.module.scss';
import generateRandomPassword from '@/utils/generateRandomPassword';
import { FaPlusCircle, FaRandom } from 'react-icons/fa';
import { BiLogOutCircle } from 'react-icons/bi';

const AgentDetails = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { id } = router.query;

  const { data, isFetching, isLoading, isError, error } = useFetchData({
    url: `/admin/agent/${id}`,
    key: 'agent',
  });

  useEffect(() => {
    if (data?.payload) {
      form.setFieldsValue(data.payload);
    }
  }, [data]);

  if (isError) {
    return <Error error={error} />;
  }

  return (
    <div className={styles.container}>
      <Form
        form={form}
        layout="vertical"
        className={formStyles.form}
        initialValues={{
          role: ['agent'],
        }}
      >
        <div className={formStyles.editContainer}>
          <div className={formStyles.group}>
            <Form.Item label="First Name" name="firstName">
              <Input type="text" className={formStyles.input} required />
            </Form.Item>
            <Form.Item label="Last Name" name="lastName">
              <Input type="text" className={formStyles.input} />
            </Form.Item>
          </div>
          <div className={formStyles.group}>
            <Form.Item label="Email Address" name="email">
              <Input type="email" className={formStyles.input} required />
            </Form.Item>
            <div className={styles.inputContainer}>
              <div className={styles.input}>
                <Form.Item label="Password" name="password">
                  <Input className={formStyles.input} />
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
            <Form.Item label="Role" name="role">
              <Select
                mode="tags"
                style={{ width: '100%' }}
                allowClear
                className={formStyles.input}
                tokenSeparators={[',']}
              >
                <Select.Option value="agent">Agent</Select.Option>
                <Select.Option value="admin">Admin</Select.Option>
                <Select.Option value="developer">Developer</Select.Option>
                <Select.Option value="merchant">Merchant</Select.Option>
              </Select>
            </Form.Item>
          </div>
        </div>
        <div className={formStyles.buttonGroup}>
          <Button
            type="primary"
            htmlType="submit"
            className={formStyles.button}
            icon={<FaPlusCircle />}
          >
            Invite Agent
          </Button>
          <Button
            type="default"
            className={formStyles.button}
            icon={<BiLogOutCircle />}
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default AgentDetails;
