import { Navigation } from '@/types/navigation';
import { RiHome2Fill } from 'react-icons/ri';
import { HiOutlineChartSquareBar } from 'react-icons/hi';
import { MdAttachMoney } from 'react-icons/md';
import { FaStore, FaUsers } from 'react-icons/fa';
import checkRole from '@/utils/checkRole';

export const navigation = (options?: {
  loggedInData?: { user: any };
  liveData?: { success: any; video: any };
}) => {
  const userRoleArray = options?.loggedInData?.user?.role;

  const navigation: Navigation = {
    home: {
      title: 'Home',
      links: {
        home: {
          title: 'Home',
          link: '/home',
          hideIf: !checkRole(userRoleArray, ['admin']),
          icon: <RiHome2Fill />,
        },
        transactions: {
          title: 'Transactions',
          link: '/home/transactions',
          hideIf: !checkRole(userRoleArray, ['admin']),

          icon: <MdAttachMoney />,
        },
        batches: {
          title: 'Batches',
          link: '/home/batches',
          hideIf: !checkRole(userRoleArray, ['admin']),

          icon: <HiOutlineChartSquareBar />,
        },
        // deposits: {
        //   title: 'Deposits',
        //   link: '/home/deposits',
        //   icon: <IoIosNotifications />,
        // },
        // scheduled: {
        //   title: 'Scheduled',
        //   link: '/home/scheduled',
        //   icon: <IoIosNotifications />,
        // },
        // analytics: {
        //   title: 'Analytics',
        //   link: '/home/analytics',
        //   icon: <SiGoogleanalytics />,
        // },
      },
    },
    // pages: {
    //   title: 'Pages',
    //   links: {
    //     pages: {
    //       title: 'Pages',
    //       link: '/pages/pages',
    //       icon: <RiHome2Fill />,
    //     },
    //   },

    //   subLinks: {
    //     editVideo: {
    //       title: 'New Page',
    //       link: '/pages/new',
    //     },
    //   },
    // },

    // organization: {
    //   title: 'Organization',

    //   links: {
    //     assets: {
    //       title: 'Assets',
    //       link: `/organization/assets`,
    //       icon: <BsBroadcastPin />,
    //     },
    //     apiKeys: {
    //       title: 'API Keys',
    //       link: '/organization/api-keys',
    //       icon: <MdLiveTv />,
    //     },
    //     customers: {
    //       title: 'Customers',
    //       link: '/organization/customers',
    //       icon: <MdLiveTv />,
    //     },
    //     inventory: {
    //       title: 'Inventory',
    //       link: '/organization/inventory',
    //       icon: <MdLiveTv />,
    //     },
    //     organizations: {
    //       title: 'Organizations',
    //       link: '/organization/organizations',
    //       icon: <MdLiveTv />,
    //     },
    //     gateways: {
    //       title: 'Gateways',
    //       link: '/organization/gateways',
    //       icon: <MdLiveTv />,
    //     },
    //   },
    // },
    admin: {
      title: 'Admin',
      hideIf: !checkRole(userRoleArray, ['admin']),
      links: {
        agents: {
          title: 'Agents',
          link: '/admin/agents',
          icon: <FaUsers />,
          hideIf: !checkRole(userRoleArray, ['admin']),
        },
        merchants: {
          title: 'Merchants',
          link: '/admin/merchants',
          icon: <FaStore />,
        },
        //     deployments: {
        //       title: 'Deployments',
        //       link: '/admin/deployments',
        //       icon: <BiDonateHeart />,
        //     },
        //     createApiClient: {
        //       title: 'Create API Client',
        //       link: '/admin/create-api-client',
        //       icon: <BiDonateHeart />,
        //     },
        //     applications: {
        //       title: 'Applications',
        //       link: '/admin/applications',
        //       icon: <BiDonateHeart />,
        //     },
        //     ipManager: {
        //       title: 'IP Manager',
        //       link: '/admin/ip-manager',
        //       icon: <BiDonateHeart />,
        //     },
        //     custonImport: {
        //       title: 'Custom Import',
        //       link: '/admin/custom-import',
        //       icon: <BiDonateHeart />,
        //     },
        //     monthlyVolume: {
        //       title: 'Monthly Volume',
        //       link: '/admin/monthly-volume',
        //       icon: <BiDonateHeart />,
        //     },
      },
    },
    // account: {
    //   title: 'Account',
    //   links: {
    //     settings: {
    //       title: 'Account Settings',
    //       link: '/account/settings',
    //       icon: <MdSettings />,
    //     },
    //   },
    // },
  };

  return navigation;
};
