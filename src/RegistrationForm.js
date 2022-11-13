import styles from "./RegistartionForm.module.css";
import {useNavigate} from 'react-router-dom';

const RegistrationForm = () => {
    const navigate = useNavigate();
    const register = () => navigate('/user/main');
    const goToLogInPage = () => navigate('/login');

    return (<div className={styles.wrapper}>
        <div className={styles.headerWrapper}>
            <h1 className={styles.header}>Регистрация</h1>
        </div>
        <form className={styles.form}>
            <div className={styles.inputs}>
                <div className={styles.input}>
                    <label htmlFor="companyName" className={styles.inputFieldName}>Название компании</label>
                    <input type="text" className={styles.inputField} placeholder="Введите название Вашей компании" min={2} name="companyName"/>
                </div>
                <div className={styles.input}>
                    <label htmlFor="login" className={styles.inputFieldName}>Логин</label>
                    <input type="text" className={styles.inputField} placeholder="Придумайте логин из 8-16 символов" min={8} max={16} name="login"/>
                </div>
                <div className={styles.input}>
                    <label htmlFor="password" className={styles.inputFieldName}>Пароль</label>
                    <input type="password" className={styles.inputField} placeholder="Придумайте пароль из 8-16 символов" min={8} max={16} name="password"/>
                </div>
            </div>
            <div className={styles.bottom}>
                <p className={styles.suggestion}>Уже зарегестрированы? <span className={styles.link} onClick={goToLogInPage}>Войдите</span> </p>
                <input type="button" value="Создать аккаунт" className={styles.sendFormButton} onClick={register}/>
            </div>
        </form>
    </div> );
}

export default RegistrationForm;