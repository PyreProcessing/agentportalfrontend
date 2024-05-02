import React from 'react';
import styles from './MerchantDetails.module.scss';
import { Tabs } from 'antd';
import MerchantInfo from './merchantInfo/MerchantInfo.component';
import GatewayInfo from './gatewayInfo/GatewayInfo.component';

const MerchantDetails = () => {
  const tabs = [
    {
      title: 'Merchant Details',
      key: '1',
      content: <MerchantInfo />,
    },
    {
      title: 'Merchant Gateway Permissions',
      key: '2',
      content: <GatewayInfo />,
    },
  ];

  return (
    <div className={styles.container}>
      <Tabs defaultActiveKey="1" type="card">
        {tabs.map((tab) => (
          <Tabs.TabPane tab={tab.title} key={tab.key}>
            {tab.content}
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default MerchantDetails;
