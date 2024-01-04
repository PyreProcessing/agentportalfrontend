import { navigation } from '@/data/navigation';
import PageLayout from '@/layout/page/Page.layout';
import BatchesView from '@/views/home/batches/Batches.view';
BatchesView;

const Batches = () => {
  return (
    <>
      <PageLayout pages={[navigation().home.links.batches]}>
        <BatchesView />
      </PageLayout>
    </>
  );
};

export default Batches;
