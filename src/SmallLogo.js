import logotype from './logo.png';
import styles from './SmallLogo.module.css';

const SmallLogo = () => {
    return (<>
        <div className={styles.wrapper}>
            <img src={logotype} alt="Logo" className={styles.icon}/>
            <div className={styles.rightContainer}>
                <h1 className={styles.companyName}>Smart transportation</h1>
                <span className={styles.phoneNumber}>+7(911)222-33-44</span>
            </div>
        </div>
    </>);
}

export default SmallLogo;