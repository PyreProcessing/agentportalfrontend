import styles from './Card.module.scss';
type Props = {
  children: React.ReactNode;
  title?: string;
  gridKey: string;
  className?: string; // add className prop, i.e. containerMd, containerLg
};

const Card = (props: Props) => {
  const dynamicStyles = styles[props.className || 'containerMd'];
  return (
    <div
      className={`${styles.container} ${dynamicStyles}`}
      style={{
        gridArea: props.gridKey,
      }}
    >
      <div className={styles.header}>
        <h1 className={styles.title}>{props?.title}</h1>
      </div>
      <div className={styles.content}>{props.children}</div>
    </div>
  );
};

export default Card;
