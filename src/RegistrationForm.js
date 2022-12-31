import styles from "./RegistartionForm.module.css";
import {useNavigate} from 'react-router-dom';
import {useForm} from "react-hook-form";
import profile from "./store/Profile";

const RegistrationForm = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const onSubmit = data => {
        profile.updateProfile(data.companyName, data.phoneNumber);
        navigate('/main');
    };
    const goToLogInPage = () => navigate('/login');

    return (<div className={styles.wrapper}>
        <div className={styles.headerWrapper}>
            <h1 className={styles.header}>Регистрация</h1>
        </div>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.inputs}>
                <label className={styles.input}>
                    <span className={styles.inputFieldName}>Название компании</span>
                    <input {...register("companyName", { required: true, minLength: 2 })}
                           aria-invalid={errors.companyName ? "true" : "false"}
                           className={styles.inputField}
                           placeholder="Введите название Вашей компании"
                           type="text"
                    />
                    {
                        {
                            'required': <span role="alert" className={styles.error}>Это поле обязательно</span>,
                            'minLength': <span role="alert" className={styles.error}>Слишком короткое название</span>
                        }[errors.companyName?.type]
                    }
                </label>
                <label className={styles.input}>
                    <span className={styles.inputFieldName}>Номер телефона</span>
                    <input {...register("phoneNumber", { required: true, minLength: 11, maxLength: 11 })}
                           aria-invalid={errors.phoneNumber ? "true" : "false"}
                           className={styles.inputField}
                           placeholder="89991112233"
                           type="text"
                    />
                    {
                        {
                            'required': <span role="alert" className={styles.error}>Это поле обязательно</span>,
                            'minLength': <span role="alert" className={styles.error}>Номер должен содержать 11 цифр</span>,
                            'maxLength': <span role="alert" className={styles.error}>Номер должен содержать 11 цифр</span>
                        }[errors.phoneNumber?.type]
                    }
                </label>
                <label className={styles.input}>
                    <span className={styles.inputFieldName}>Логин (8-30 символов)</span>
                    <input {...register("login", { required: true, minLength: 8, maxLength: 30 })}
                           aria-invalid={errors.companyName ? "true" : "false"}
                           className={styles.inputField} placeholder="Придумайте логин из 8-30 символов"
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
                    <span className={styles.inputFieldName}>Пароль (8-30 символов)</span>
                    <input {...register("password", { required: true, minLength: 8, maxLength: 30 })}
                           aria-invalid={errors.password ? "true" : "false"}
                           className={styles.inputField} placeholder="Придумайте пароль из 8-30 символов"
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
                <p className={styles.suggestion}>Уже зарегестрированы? <span className={styles.link} onClick={goToLogInPage}>Войдите</span> </p>
                <input type="submit" value="Создать аккаунт" className={styles.sendFormButton}/>
            </div>
        </form>
    </div> );
}

export default RegistrationForm;