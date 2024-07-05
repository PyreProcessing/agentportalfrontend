import React from 'react';
import formStyles from '@/Form.module.scss';
import styles from './FormStyles.module.scss';
import { Form, Image, Input } from 'antd';

interface PaybrightProps {
  form: any;
}
const Paybright = (props: PaybrightProps) => {
  return (
    <div className={formStyles.form__formContainer}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Image
            className={styles.logo}
            src="https://paybrightgateway.com/branding/logo.png"
            alt="Paybright Logo"
            preview={false}
          />
        </div>
        <div className={styles.formFields}>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label={'Merchant Id'}
                name={['paymentGateways', 'paybright', 'merchantUser']}
                rules={[]}
                tooltip=""
              >
                <Input disabled />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label={'Merchant Password'}
                name={['paymentGateways', 'paybright', 'merchantPass']}
                rules={[]}
                tooltip=""
              >
                <Input disabled />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label={'Monthly Limit'}
                name={['paymentGateways', 'paybright', 'monthlyLimit']}
                rules={[]}
                tooltip="This is the monthly limit for the merchant. The system will use this value to calculate the remaining amount for the month."
              >
                <Input disabled />
              </Form.Item>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Paybright;
