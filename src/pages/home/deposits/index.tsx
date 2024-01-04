import { navigation } from '@/data/navigation';
import PageLayout from '@/layout/page/Page.layout';
import DepositsView from '@/views/home/deposits/Deposits.view';
DepositsView;

const Deposits = () => {
  return (
    <>
      <PageLayout pages={[navigation().home.links.deposits]}>
        <DepositsView />
      </PageLayout>
    </>
  );
};

export default Deposits;
