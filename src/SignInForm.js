import styles from "./RegistartionForm.module.css";
import {useNavigate} from 'react-router-dom';
import {useForm} from "react-hook-form";

const SignInForm = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const onSubmit = data => {
        console.log(data);
        navigate('/main');
    };
    const goToRegistrationPage = () => navigate('/registration');

    return (<div className={styles.wrapper}>
        <div className={styles.headerWrapper}>
            <h1 className={styles.header}>Вход</h1>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputs}>
                <label className={styles.input}>
                    <span className={styles.inputFieldName}>Логин</span>
                    <input {...register("login", { required: true, minLength: 8, maxLength: 30 })}
                           aria-invalid={errors.companyName ? "true" : "false"}
                           className={styles.inputField} placeholder="Введите ваш логин"
                           type="text"
                    />
                    {
                        {
                            'required': <span role="alert" className={styles.error}>Это поле обязательно</span>,
                            'minLength': <span role="alert" className={styles.error}>Минимальная длина логина 8 символов</span>,
                            'maxLength': <span role="alert" className={styles.error}>Максимальная длина логина 30 символов</span>,
                        }[errors.login?.type]
                    }
                </label>
                <label className={styles.input}>
                    <span className={styles.inputFieldName}>Пароль</span>
                    <input {...register("password", { required: true, minLength: 8, maxLength: 30 })}
                           aria-invalid={errors.password ? "true" : "false"}
                           className={styles.inputField} placeholder="Введите ваш пароль"
                           type="password"
                    />
                    {
                        {
                            'required': <span role="alert" className={styles.error}>Это поле обязательно</span>,
                            'minLength': <span role="alert" className={styles.error}>Минимальная длина пароля 8 символов</span>,
                            'maxLength': <span role="alert" className={styles.error}>Максимальная длина пароля 30 символов</span>,
                        }[errors.password?.type]
                    }
                </label>
            </div>
            <div className={styles.bottom}>
                <p className={styles.suggestion}>Ещё не зарегестрированы? <span className={styles.link} onClick={goToRegistrationPage}>Зарегестрируйтесь</span> </p>
                <input type="submit" value="Войти" className={styles.sendFormButton}/>
            </div>
        </form>
    </div> );
}

export default SignInForm;