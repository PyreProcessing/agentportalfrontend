import currencyFormatter from '@/utils/currencyFormatter';
import styles from './Transaction.module.scss';

type Props = {
  transaction: {
    _id: string;
    total: string;
    count: number;
  };
};

const Transaction = (props: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <div className={styles.type}>{props.transaction._id}</div>
        <div className={styles.total}>
          {currencyFormatter(props.transaction.total)}
        </div>
      </div>
      <div className={styles.count}>
        {props.transaction.count} Transaction('s)
      </div>
    </div>
  );
};

export default Transaction;
