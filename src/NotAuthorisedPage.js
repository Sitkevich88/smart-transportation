import BigLogo from "./BigLogo";
import startStyles from "./StartPage.module.css";
import styles from "./NotAuthorisedPage.module.css";
import {useNavigate} from 'react-router-dom';

const NotAuthorisedPage = () => {
    const navigate = useNavigate();
    const goToStartPage = () => navigate('/');

    return <>
        <BigLogo/>
        <div className={startStyles.ellipses_wrapper}>
            <div className={startStyles.ellipse} id={startStyles["ellipseLeft"]}></div>
            <div className={startStyles.ellipse} id={startStyles["ellipseRight"]}></div>
        </div>
        <div className={styles.popUp}>
            <h1 className={styles.explanation}>Вы не зарегестрированы</h1>
            <button className={styles.button} onClick={goToStartPage}>На главную</button>
        </div>
    </>
}

export default NotAuthorisedPage;