import styles from "./RegistartionForm.module.css";
import {useNavigate} from 'react-router-dom';
import {useForm} from "react-hook-form";
import {useState} from "react";
import authenticationService from "./service/AuthenticationService";

const RegistrationForm = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const onSubmit = user => {
        setErrorMessage('');
        authenticationService.signUp(user)
            .then(response => {
                if (response.success)
                    navigate('/main');
                else
                    setErrorMessage(response.errorMessage);
            });
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
                    <span className={styles.inputFieldName}>Логин (4-30 символов)</span>
                    <input {...register("username", { required: true, minLength: 4, maxLength: 30 })}
                           aria-invalid={errors.companyName ? "true" : "false"}
                           className={styles.inputField + " " + styles.visibleField} placeholder="Придумайте логин из 4-30 символов"
                           type="text"
                    />
                    {
                        {
                            'required': <span role="alert" className={styles.error}>Это поле обязательно</span>,
                            'minLength': <span role="alert" className={styles.error}>Минимальная длина логина 4 символов</span>,
                            'maxLength': <span role="alert" className={styles.error}>Максимальная длина логина 30 символов</span>,
                        }[errors.username?.type]
                    }
                </label>
                <label className={styles.input}>
                    <span className={styles.inputFieldName}>Пароль (4-30 символов)</span>
                    <input {...register("password", { required: true, minLength: 4, maxLength: 30 })}
                           aria-invalid={errors.password ? "true" : "false"}
                           className={styles.inputField + " " + styles.visibleField} placeholder="Придумайте пароль из 4-30 символов"
                           type="password"
                    />
                    {
                        {
                            'required': <span role="alert" className={styles.error}>Это поле обязательно</span>,
                            'minLength': <span role="alert" className={styles.error}>Минимальная длина пароля 4 символов</span>,
                            'maxLength': <span role="alert" className={styles.error}>Максимальная длина пароля 30 символов</span>,
                        }[errors.password?.type]
                    }
                </label>
            </div>
            {errorMessage && <span className={styles.logInError}>{errorMessage}</span>}
            <div className={styles.bottom}>
                <p className={styles.suggestion}>Уже зарегестрированы? <span className={styles.link} onClick={goToLogInPage}>Войдите</span> </p>
                <input type="submit" value="Создать аккаунт" className={styles.sendFormButton}/>
            </div>
        </form>
    </div> );
}

export default RegistrationForm;