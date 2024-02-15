import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
import UsersView from '@/views/admin/users/Users.view';
import MerchantList from '@/views/admin/merchants/MerchantList.view';
const Users = () => {
  return (
    <PageLayout
      pages={[navigation()?.admin?.links?.merchants]}
      largeSideBar={true}
    >
      <MerchantList />
    </PageLayout>
  );
};

export default Users;
