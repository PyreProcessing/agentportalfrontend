import { useState } from 'react';
import styles from './Dashboard.module.scss';
import Card from './layout/card/Card.component';
import DashboardHeader from './layout/header/Header.layout';
import { useUser } from '@/state/auth';
import { title } from 'process';
import TransactionsThisMonth from './components/cards/transactionsThisMonth/TransactionsThisMonth.component';
import TopPerformingAgents from './components/cards/topPerformingAgents/TopPerformingAgents.component';
type Props = {};

type Card = {
  title?: string;
  component: React.ReactNode;
  gridKey: string;
  hideIf?: boolean;
  className?: string;
};

const Dashboard = (props: Props) => {
  const { data: loggedInData } = useUser();
  const dashboardCards = [
    {
      component: <TransactionsThisMonth />,
      gridKey: 'transactions',
      hideIf: !loggedInData,
      className: `containerLg`,
    },
    {
      title: 'Top Performing Agents',
      component: <TopPerformingAgents />,
      gridKey: 'topPerformingAgents',
      className: `containerXlg`,
    },
  ];

  const [cards, setCards] = useState(dashboardCards);

  return (
    <div className={styles.wrapper}>
      <DashboardHeader />
      <div className={styles.container}>
        {cards
          .filter((c: any) => !c.hideIf)
          .map((card: Card, index: number) => {
            return (
              <Card
                key={index}
                title={card.title}
                gridKey={card.gridKey}
                className={card.className}
              >
                {card.component}
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Dashboard;
