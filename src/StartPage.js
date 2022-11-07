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
        <p className={styles.comment} id={styles["advice"]}>Чтобы оставить заявку на доставку, нужно войти в аккаунт.</p>
        <div className={styles.contacts}>
            <p className={styles.comment}>Желаете связаться с оператором?</p>
            <p className={styles.comment}>+7(911)222-33-44</p>
        </div>
    </>);
}

export default StartPage;