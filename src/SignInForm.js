import styles from "./RegistartionForm.module.css";
import {useNavigate} from 'react-router-dom';

const SignInForm = () => {
    const navigate = useNavigate();
    const logIn = () => navigate('/user/main');
    const goToRegisterPage = () => navigate('/registration');

    return (<div className={styles.wrapper}>
        <div className={styles.headerWrapper}>
            <h1 className={styles.header}>Вход</h1>
        </div>
        <form className={styles.form}>
            <div className={styles.inputs} style={{height: "250px"}}>
                <div className={styles.input}>
                    <label htmlFor="login" className={styles.inputFieldName}>Логин</label>
                    <input type="text" className={styles.inputField} placeholder="Введите ваш логин" min={8} max={16} name="login"/>
                </div>
                <div className={styles.input}>
                    <label htmlFor="password" className={styles.inputFieldName}>Пароль</label>
                    <input type="password" className={styles.inputField} placeholder="Введите ваш пароль" min={8} max={16} name="password"/>
                </div>
            </div>
            <div className={styles.bottom}>
                <p className={styles.suggestion}>Ещё не зарегестрированы? <span className={styles.link} onClick={goToRegisterPage}>Зарегестрируйтесь</span> </p>
                <input type="button" value="Войти" className={styles.sendFormButton} onClick={logIn}/>
            </div>
        </form>
    </div> );
}

export default SignInForm;