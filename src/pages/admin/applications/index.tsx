import Head from 'next/head';
import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
import ApplicationsView from '@/views/admin/applications/Applications.view';
const Applications = () => {
  return (
    <>
      <PageLayout pages={[navigation().admin.links.applications]}>
        <ApplicationsView />
      </PageLayout>
    </>
  );
};

export default Applications;
