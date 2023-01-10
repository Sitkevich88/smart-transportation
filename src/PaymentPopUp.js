import styles from "./PaymentPopUp.module.css";

const PaymentPopUp = (props) => {

    return props.display ?
        <div className={styles.wrapper}>
            <div className={styles.headerWrapper}>
                <h1 className={styles.header}>Реквизиты</h1>
                <button type="button" onClick={() => (props.open(false))} className={styles.popUpCloser}>Закрыть</button>
            </div>
        <div className={styles.body}>
            <div className={styles.fields}>
                <div className={styles.fieldWithLabel}>
                    <span className={styles.label}>БИК банка получателя: </span>
                    <span className={styles.field}>1234567890</span>
                </div>
                <div className={styles.fieldWithLabel}>
                    <span className={styles.label}>Счёт получателя: </span>
                    <span className={styles.field}>1234567890</span>
                </div>
                <div className={styles.fieldWithLabel}>
                    <span className={styles.label}>Сумма: </span>
                    <span className={styles.field}>{props.price}</span>
                </div>
            </div>
        </div>
        </div>
        : null;
};

export default PaymentPopUp;