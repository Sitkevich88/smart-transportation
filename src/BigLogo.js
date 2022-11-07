import logotype from './logo.png';
import styles from './BigLogo.module.css';

const BigLogo = () => {
    return (<>
        <div className={styles.wrapper}>
            <img src={logotype} alt="Logo" className={styles.icon}/>
            <div className={styles.name_comment_wrapper}>
                <h1 className={styles.company_name}>Smart transportation</h1>
                <p className={styles.comment}>Логистический оператор</p>
            </div>
        </div>
    </>);
}

export default BigLogo;