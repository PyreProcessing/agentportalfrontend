import { navigation } from '@/data/navigation';
import PageLayout from '@/layout/page/Page.layout';
import ScheduledView from '@/views/home/scheduled/Scheduled.view';

const Scheduled = () => {
  return (
    <>
      <PageLayout pages={[navigation().home.links.scheduled]}>
        <ScheduledView />
      </PageLayout>
    </>
  );
};

export default Scheduled;
