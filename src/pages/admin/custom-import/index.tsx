import Head from 'next/head';
import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
import CustomImportView from '@/views/admin/customImport/CustomImport.view';
const CustomImport = () => {
  return (
    <>
      <PageLayout pages={[navigation()?.admin?.links?.custonImport]}>
        <CustomImportView />
      </PageLayout>
    </>
  );
};

export default CustomImport;
