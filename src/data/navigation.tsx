import { Navigation } from '@/types/navigation';
import { FEATURES, hasFeature } from '@/utils/hasFeature';
import { BiDonateHeart, BiLinkExternal } from 'react-icons/bi';
import { BsBox, BsBroadcastPin } from 'react-icons/bs';
import { BsFillPeopleFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FaExternalLinkAlt, FaMoneyCheckAlt, FaRegBell } from 'react-icons/fa';
import { HiCode } from 'react-icons/hi';
import { IoIosNotifications } from 'react-icons/io';
import {
  MdLiveHelp,
  MdLiveTv,
  MdPlaylistPlay,
  MdSettings,
  MdVideoLibrary,
} from 'react-icons/md';
import { RiHome2Fill } from 'react-icons/ri';
import { SiGoogleanalytics } from 'react-icons/si';

import { HiOutlineChartSquareBar } from 'react-icons/hi';
import { MdAttachMoney } from 'react-icons/md';

export const navigation = (options?: {
  loggedInData?: { user: any };
  liveData?: { success: any; video: any };
}) => {
  const notAdmin = () => {
    return options?.loggedInData?.user?.roleGuid !== '101uUKLJ8yN23I';
  };

  const navigation: Navigation = {
    home: {
      title: 'Home',
      links: {
        home: {
          title: 'Home',
          link: '/home',
          hideIf: notAdmin(),
          icon: <RiHome2Fill />,
        },
        transactions: {
          title: 'Transactions',
          link: '/home/transactions',
          hideIf: notAdmin(),

          icon: <MdAttachMoney />,
        },
        batches: {
          title: 'Batches',
          link: '/home/batches',
          hideIf: notAdmin(),

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
    // admin: {
    //   title: 'Admin',
    //   links: {
    //     users: {
    //       title: 'Users',
    //       link: '/admin/users',
    //       icon: <BiDonateHeart />,
    //     },
    //     roles: {
    //       title: 'Roles',
    //       link: '/admin/roles',
    //       icon: <BiDonateHeart />,
    //     },
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
    //   },
    // },
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
