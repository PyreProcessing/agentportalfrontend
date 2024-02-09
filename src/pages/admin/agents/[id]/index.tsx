import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
import AgentDetails from '@/views/admin/users/views/agentDetails/AgentDetails.view';
const Users = () => {
  return (
    <>
      <PageLayout
        pages={[navigation()?.admin?.links?.agents]}
        largeSideBar={true}
      >
        <AgentDetails />
      </PageLayout>
    </>
  );
};

export default Users;
