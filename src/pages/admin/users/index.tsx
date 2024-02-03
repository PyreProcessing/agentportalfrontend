import Head from 'next/head';
import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
import UsersView from '@/views/admin/users/Users.view';
const Users = () => {
  return (
    <>
      <PageLayout pages={[navigation()?.admin?.links?.users]}>
        <UsersView />
      </PageLayout>
    </>
  );
};

export default Users;
