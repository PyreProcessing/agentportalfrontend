import Head from 'next/head';
import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
import IPManagerView from '@/views/admin/ipManager/IpManager.view';
const IPManager = () => {
  return (
    <>
      <PageLayout pages={[navigation()?.admin?.links?.ipManager]}>
        <IPManagerView />
      </PageLayout>
    </>
  );
};

export default IPManager;
