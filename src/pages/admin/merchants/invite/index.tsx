import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
import MerchantList from '@/views/admin/merchants/MerchantList.view';
import MerchantDetails from '@/views/admin/merchants/merchantDetails/MerchantDetails.view';
const Users = () => {
  return (
    <PageLayout
      pages={[navigation()?.admin?.links?.merchants]}
      largeSideBar={true}
    >
      <MerchantDetails />
    </PageLayout>
  );
};

export default Users;
