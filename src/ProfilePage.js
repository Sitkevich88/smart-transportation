import {useForm} from "react-hook-form";
import {useState} from "react";
import CustomerHeader from "./CustomerHeader";
import mainPageStyles from "./MainPage.module.css";
import stylesStartPage from "./StartPage.module.css";
import styles from "./ProfilePage.module.css";
import profile from "./store/Profile";
import {observer} from "mobx-react"
import editIcon from "./edit-icon.png";

const ProfilePage = observer(() => {
    const { register, formState: { errors }, handleSubmit, setValue } = useForm({
        defaultValues: {companyName: profile.companyName, phoneNumber: profile.phoneNumber}
    });

    const [ isEditingCompanyName, setIsEditingCompanyName] = useState(false);
    const [ isEditingPhoneNumber, setIsEditingPhoneNumber] = useState(false);

    const disableAll = () => {
        setIsEditingCompanyName(false);
        setIsEditingPhoneNumber(false);
    };
    
    const onSubmit = data => {
        disableAll();
        profile.updateProfile(data.companyName, data.phoneNumber);
    };

    const recoverCompanyName = () => {
        setValue('companyName', profile.companyName);
        setIsEditingCompanyName(false);
    }

    const recoverPhoneNumber = () => {
        setValue('phoneNumber', profile.phoneNumber);
        setIsEditingPhoneNumber(false);
    }

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
                        <input {...register("companyName", { minLength: 2, required: true})}
                               aria-invalid={errors.companyName ? "true" : "false"}
                               className={styles.inputField} placeholder="Введите название вашей компании"
                               type="text"
                               disabled={!isEditingCompanyName}
                        />
                        <div className={styles.fieldButtons}>
                            {isEditingCompanyName ?
                                <div className={styles.decisionButtons}>
                                    <input type="submit" value="✔" className={styles.approveFormButton}/>
                                    <input type="button" value="✖" className={styles.disapproveFormButton} onClick={() => recoverCompanyName()}/>
                                </div>
                                : <img src={editIcon} alt="Редактировать" className={styles.icon} onClick={() => setIsEditingCompanyName(true)}/>
                            }
                        </div>
                        {
                            {
                                'minLength': <span role="alert" className={styles.error}>Минимальная длина названия 2 символа</span>,
                                'required': <span role="alert" className={styles.error}>Обязательное поле</span>,
                            }[errors.companyName?.type]
                        }
                    </label>
                    <label className={styles.input}>
                        <span className={styles.inputFieldName}>Номер телефона</span>
                        <input {...register("phoneNumber", { required: true, minLength: 11, maxLength: 11})}
                               aria-invalid={errors.phoneNumber ? "true" : "false"}
                               className={styles.inputField} placeholder="Введите номер телефона вашей компании"
                               type="tel"
                               disabled={!isEditingPhoneNumber}
                        />
                        <div className={styles.fieldButtons}>
                            {isEditingPhoneNumber ?
                                <div className={styles.decisionButtons}>
                                    <input type="submit" value="✔" className={styles.approveFormButton}/>
                                    <input type="button" value="✖" className={styles.disapproveFormButton} onClick={() => recoverPhoneNumber()}/>
                                </div>
                                : <img src={editIcon} alt="Редактировать" className={styles.icon} onClick={() => setIsEditingPhoneNumber(true)}/>
                            }
                        </div>
                        {
                            {
                                'minLength': <span role="alert" className={styles.error}>Длина номера телефона 11 символов</span>,
                                'maxLength': <span role="alert" className={styles.error}>Длина номера телефона 11 символов</span>,
                                'required': <span role="alert" className={styles.error}>Обязательное поле</span>,
                            }[errors.phoneNumber?.type]
                        }
                    </label>
                </div>
            </form>
        </div>
        <div className={stylesStartPage.contacts}>
            <p className={stylesStartPage.comment}>Желаете связаться с оператором?</p>
            <p className={stylesStartPage.comment}>+7(911)222-33-44</p>
        </div>
        </>);
});

export default ProfilePage;
