import logotype from './logo.png';
import styles from './SmallLogo.module.css';

const SmallLogo = () => {
    return (<>
        <div className={styles.wrapper}>
            <img src={logotype} alt="Logo" className={styles.icon}/>
            <h1 className={styles.company_name}>Smart transportation</h1>
        </div>
    </>);
}

export default SmallLogo;