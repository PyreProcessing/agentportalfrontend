import React from 'react';
import formStyles from '@/Form.module.scss';
import styles from './FormStyles.module.scss';
import { Button, Form, Image, Input } from 'antd';

interface NmiFormsProps {
  form: any;
}
const NmiForms = (props: NmiFormsProps) => {
  return (
    <div className={formStyles.form__formContainer}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Image
            className={styles.logo}
            src="https://www.nmi.com/wp-content/themes/nmi/images/NMI_Logo_Primary.webp"
            alt="NMI Logo"
            preview={false}
          />
        </div>
        <div className={styles.formFields}>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label={'Gateway API Key'}
                name={['paymentGateways', 'nmi', 'security_key']}
                rules={[]}
                tooltip="This is the API key provided by NMI for the merchant specific, and needs to be generated from the merchant dashboard."
              >
                <Input />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label={'Monthly Limit'}
                name={['paymentGateways', 'nmi', 'monthlyLimit']}
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
          href="https://www.nmi.com/logins/"
          target="_blank"
          rel="noreferrer"
        >
          Go to NMI
        </Button>
      </div>
    </div>
  );
};

export default NmiForms;
