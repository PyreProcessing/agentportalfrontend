import React from 'react';
import styles from './Invite.module.scss';
import formStyles from '@/Form.module.scss';
import { Button, Form, Input, Tooltip } from 'antd';
import { BiLogOutCircle } from 'react-icons/bi';
import { FaPlusCircle } from 'react-icons/fa';

const Invite = () => {
  const [form] = Form.useForm();
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Invite Agents</h1>
      </div>
      <div className={styles.content}>
        <p>
          Invite agents to your organization by entering their email address
          below. An email will be sent to the agent with instructions on how to
          join your organization.
        </p>
        <div className={formStyles.form}>
          <Form layout="vertical" form={form}>
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
                  <Form.Item
                    label="Password"
                    name="password"
                    className={formStyles.inputAddOnAfter}
                  >
                    <Input type="text" className={formStyles.input} />
                    <Tooltip title="Generate a random password">
                      <FaPlusCircle className={formStyles.icon} />
                    </Tooltip>
                  </Form.Item>
                <Form.Item label="Email Address" name="email">
                  <Input type="email" className={formStyles.input} />
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Invite;
