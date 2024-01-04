import Head from 'next/head';
import PageLayout from '@/layout/page/Page.layout';
import { navigation } from '@/data/navigation';
import RolesView from '@/views/admin/roles/Roles.view';
const Roles = () => {
  return (
    <>
      <PageLayout pages={[navigation().admin.links.roles]}>
        <RolesView />
      </PageLayout>
    </>
  );
};

export default Roles;
