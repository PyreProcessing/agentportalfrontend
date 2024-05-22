import React from 'react';
import styles from './MerchantDetails.module.scss';
import { Tabs } from 'antd';
import MerchantInfo from './merchantInfo/MerchantInfo.component';
import GatewayInfo from './gatewayInfo/GatewayInfo.component';
import BusinessInfo from './businessInfo/BusinessInfo.component';
import AnimatedDiv from '@/components/UI/animatedDiv/AnimatedDiv.UI';
import { AnimatePresence } from 'framer-motion';

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
    {
      title: 'Business Info',
      key: '3',
      content: <BusinessInfo />,
    },
  ];

  return (
    <div className={styles.container}>
      <Tabs defaultActiveKey="1" type="card">
        {tabs.map((tab) => (
          <Tabs.TabPane tab={tab.title} key={tab.key}>
            <AnimatePresence mode="wait">
              <AnimatedDiv
                transitionType="fade"
                duration={0.5}
                key={`switchableView-${tab.key}`}
                type="whileInView"
                className={styles.heroContainer}
              >
                {tab.content}
              </AnimatedDiv>
            </AnimatePresence>
          </Tabs.TabPane>
        ))}
      </Tabs>
    </div>
  );
};

export default MerchantDetails;
