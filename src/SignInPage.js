import styles from "./SignInPage.module.css";
import SignInForm from "./SignInForm";
import BigLogo from "./BigLogo";

const SignInPage = () => {
    return (<>
        <BigLogo/>
        <div className={styles.ellipses_wrapper}>
            <div className={styles.ellipse} id={styles["ellipseLeft"]}></div>
            <div className={styles.ellipse} id={styles["ellipseRight"]}></div>
        </div>
        <SignInForm/>
        <div className={styles.contacts}>
            <p className={styles.comment}>Желаете связаться с оператором?</p>
            <p className={styles.comment}>+7(911)222-33-44</p>
        </div>
    </>);
}

export default SignInPage;