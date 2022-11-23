import CustomerHeader from "./CustomerHeader";
import mainPageStyles from "./MainPage.module.css";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import styles from "./ProfilePage.module.css";
import {useState} from "react";
import stylesStartPage from "./StartPage.module.css";

const ProfilePage = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const [isEditing, setIsEditing] = useState(false);
    const onSubmit = data => {
        console.log(data);
        setIsEditing(false);
    };

    return (<>
        <CustomerHeader buttonId={0}/>
        <div className={mainPageStyles.ellipsesWrapper}>
            <div className={mainPageStyles.ellipse}></div>
        </div>
        <div className={styles.wrapper}>
            <div className={styles.headerWrapper}>
                <h1 className={styles.header}>Профиль</h1>
            </div>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputs}>
                    <label className={styles.input}>
                        <span className={styles.inputFieldName}>Название компании</span>
                        <input {...register("companyName", { minLength: 8, maxLength: 30 })}
                               aria-invalid={errors.companyName ? "true" : "false"}
                               className={styles.inputField} placeholder="Введите ваш название вашей компании"
                               type="text"
                               defaultValue="ООО Агроном"
                               disabled={!isEditing}
                        />
                        {
                            {
                                'minLength': <span role="alert" className={styles.error}>Минимальная длина логина 8 символов</span>,
                                'maxLength': <span role="alert" className={styles.error}>Максимальная длина логина 30 символов</span>,
                            }[errors.companyName?.type]
                        }
                    </label>
                    <label className={styles.input}>
                        <span className={styles.inputFieldName}>Номер телефона</span>
                        <input {...register("phoneNumber", { minLength: 6, maxLength: 12 })}
                               aria-invalid={errors.phoneNumber ? "true" : "false"}
                               className={styles.inputField} placeholder="Введите ваш пароль"
                               type="tel"
                               defaultValue={89112223344}
                               disabled={!isEditing}
                        />
                        {
                            {
                                'minLength': <span role="alert" className={styles.error}>Минимальная длина пароля 6 символов</span>,
                                'maxLength': <span role="alert" className={styles.error}>Максимальная длина пароля 12 символов</span>,
                            }[errors.phoneNumber?.type]
                        }
                    </label>
                </div>
                <div className={styles.bottom}>
                    {isEditing && <input type="submit" value="✔" className={styles.approveFormButton}/>}
                    <input type="button" value="Редактировать" className={styles.editFormButton} onClick={() => setIsEditing(!isEditing)}/>
                </div>
            </form>
        </div>
        <div className={stylesStartPage.contacts}>
            <p className={stylesStartPage.comment}>Желаете связаться с оператором?</p>
            <p className={stylesStartPage.comment}>+7(911)222-33-44</p>
        </div>
        </>);
}

export default ProfilePage;
