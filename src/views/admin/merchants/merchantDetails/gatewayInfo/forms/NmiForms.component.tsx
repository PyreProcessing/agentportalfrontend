import React from 'react';
import formStyles from '@/Form.module.scss';
import styles from './FormStyles.module.scss';
import { Form, Image, Input } from 'antd';

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
          </div>
        </div>
      </div>
    </div>
  );
};

export default NmiForms;
