import BigLogo from "./BigLogo";
import styles from "./StartPage.module.css";
import MapPreview from "./MapPreview";

const StartPage = () => {
    return (<>
        <BigLogo/>
        <div className={styles.buttons_wrapper}>
            <button className={styles.button} id="registerButton">Новый пользователь</button>
            <button className={styles.button} id="signInButton">Войти</button>
        </div>
        <div className={styles.ellipses_wrapper}>
            <div className={styles.ellipse} id={styles["ellipseLeft"]}></div>
            <div className={styles.ellipse} id={styles["ellipseRight"]}></div>
        </div>
        <MapPreview/>
    </>);
}

export default StartPage;