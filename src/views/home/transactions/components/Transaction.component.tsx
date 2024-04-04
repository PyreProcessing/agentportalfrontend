import styles from './Transaction.module.scss';

type Props = {
  transaction: {
    type: string;
    total: string;
    count: number;
  };
};

const Transaction = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <div className={styles.type}>{props.transaction.type}</div>
        <div className={styles.total}>${props.transaction.total}</div>
      </div>
      <div className={styles.count}>
        {props.transaction.count} Transaction('s)
      </div>
    </div>
  );
};

export default Transaction;
