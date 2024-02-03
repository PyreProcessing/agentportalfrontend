import Head from 'next/head';
import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
import CreateAPIClientView from '@/views/admin/createApiClient/CreateApiClients.view';
const CreateAPIClient = () => {
  return (
    <>
      <PageLayout pages={[navigation()?.admin?.links?.createApiClient]}>
        <CreateAPIClientView />
      </PageLayout>
    </>
  );
};

export default CreateAPIClient;
