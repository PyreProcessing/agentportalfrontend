import React from 'react';
import formStyles from '@/Form.module.scss';
import styles from './FormStyles.module.scss';
import { Button, Form, Image, Input } from 'antd';

interface PaynetworxProps {
  form: any;
}
const Paynetworx = (props: PaynetworxProps) => {
  return (
    <div className={formStyles.form__formContainer}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Image
            className={styles.logo}
            src="https://payment-api-docs.paynetworx.com/pnlogo.png"
            alt="Paynetworx Logo"
            preview={false}
          />
        </div>
        <div className={styles.formFields}>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label={'Merchant Id'}
                name={['paymentGateways', 'paynetworx', 'merchantUser']}
                rules={[]}
                tooltip=""
              >
                <Input />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label={'Merchant Password'}
                name={['paymentGateways', 'paynetworx', 'merchantPass']}
                rules={[]}
                tooltip=""
              >
                <Input />
              </Form.Item>
            </div>
          </div>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label={'Monthly Limit'}
                name={['paymentGateways', 'paynetworx', 'monthlyLimit']}
                rules={[]}
                tooltip="This is the monthly limit for the merchant. The system will use this value to calculate the remaining amount for the month."
              >
                <Input />
              </Form.Item>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.actionContainer}>
        {/* links to nmi platform for agent login */}
        <Button
          type="link"
          href="https://paynetworx.com/"
          target="_blank"
          rel="noreferrer"
        >
          Go to Paynetworx
        </Button>
      </div>
    </div>
  );
};

export default Paynetworx;
