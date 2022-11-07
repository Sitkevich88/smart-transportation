import logotype from './logo.png';
import styles from './BigLogo.module.css';

const BigLogo = () => {
    return (<>
        <div className={styles.wrapper}>
            <div className={styles.logo}>
                <img src={logotype} alt="Logo" className={styles.icon}/>
                <h1 className={styles.company_name}>Smart transportation</h1>
            </div>
            <p className={styles.comment}>Логистический оператор</p>
        </div>
    </>);
}

export default BigLogo;