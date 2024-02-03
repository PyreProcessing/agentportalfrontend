import Head from 'next/head';
import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
import MonthlyVolumeView from '@/views/admin/monthlyVolume/MonthlyVolume.view';
const MonthlyVolume = () => {
  return (
    <>
      <PageLayout pages={[navigation()?.admin?.links?.monthlyVolume]}>
        <MonthlyVolumeView />
      </PageLayout>
    </>
  );
};

export default MonthlyVolume;
