import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
import Invite from '@/views/admin/users/views/Invite.view';
const Users = () => {
  return (
    <>
      <PageLayout
        pages={[navigation()?.admin?.links?.agents]}
        largeSideBar={true}
      >
        <Invite />
      </PageLayout>
    </>
  );
};

export default Users;
