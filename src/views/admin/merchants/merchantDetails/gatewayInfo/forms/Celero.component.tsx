import React from 'react';
import formStyles from '@/Form.module.scss';
import styles from './FormStyles.module.scss';
import { Form, Image, Input } from 'antd';

interface CeleroProps {
  form: any;
}
const Celero = (props: CeleroProps) => {
  return (
    <div className={formStyles.form__formContainer}>
      <div className={styles.container}>
        <div className={styles.logoContainer}>
          <Image
            className={styles.logo}
            src="https://celerocommerce.com/wp-content/uploads/2023/12/Celero-commerce-Alternate-300x90.png"
            alt="Celero Logo"
          />
        </div>
        <div className={styles.formFields}>
          <div className={formStyles.form__formGroup}>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label={'Merchant Id'}
                name={['paymentGateways', 'celero', 'merchantUser']}
                rules={[]}
                tooltip=""
              >
                <Input disabled />
              </Form.Item>
            </div>
            <div className={formStyles.form__inputGroup}>
              <Form.Item
                label={'Merchant Password'}
                name={['paymentGateways', 'celero', 'merchantPass']}
                rules={[]}
                tooltip=""
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

export default Celero;
