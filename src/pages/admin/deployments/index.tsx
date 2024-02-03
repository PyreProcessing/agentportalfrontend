import Head from 'next/head';
import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
import DeploymentsView from '@/views/admin/deployments/Deployments.view';
const Deployments = () => {
  return (
    <>
      <PageLayout pages={[navigation()?.admin?.links?.deployments]}>
        <DeploymentsView />
      </PageLayout>
    </>
  );
};

export default Deployments;
