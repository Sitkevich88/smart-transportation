import mainPageStyles from "./MainPage.module.css";
import {useNavigate} from "react-router-dom";
import styles from "./CreateOrderPage.module.css";
import stylesStartPage from "./StartPage.module.css";
import {useForm} from "react-hook-form";
import mapService from "./service/MapService";
import qs from 'query-string';
import orders from "./store/Orders";

const CreateOrderPage = () => {
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();
    let {station1, station2} = [null, null];
    const onSubmit = data => {
        console.log(data);
        orders.addActiveOrder(data);
        navigate('/orders');
    };
    const stationsOptions = mapService.getUniqueStationNames().map(name => {
        return <option key={name + '_stationName'} value={name}>{name}</option>;
    });

    stationsOptions.unshift(
        <option disabled selected value={null} style={{display: "none"}}></option>
    );

    const stations = qs.parse(window.location.search);

    if (!!stations.station1){
        station1 = stations.station1;
    }
    if (!!stations.station2){
        station2 = stations.station2;
    }

    const types = [
        <option disabled selected value style={{display: "none"}} key="empty"></option>,
        <option key="Нефть" value="Нефть">Нефть</option>,
        <option key="Пропан" value="Пропан">Пропан</option>,
        <option key="Песок" value="Песок">Песок</option>,
        <option key="Щебень" value="Щебень">Щебень</option>,
        <option key="Другое" value="Другое">Другое</option>
    ];

    return <>
        <div className={mainPageStyles.ellipsesWrapper}>
            <div className={mainPageStyles.ellipse}></div>
        </div>

        <button onClick={() => navigate(-1)} className={styles.goBackButton}>Назад</button>

        <div className={styles.wrapper}>
            <div className={styles.headerWrapper}>
                <h1 className={styles.header}>Новая заявка</h1>
            </div>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputs}>
                    <label className={styles.input}>
                        <span className={styles.inputFieldName}>От какой станции</span>
                        <select {...register("from", { required: true })}
                                aria-invalid={errors.from ? "true" : "false"}
                                className={styles.inputField}
                                defaultValue={station1}
                        >
                            {stationsOptions}
                        </select>
                        {
                            {
                                'required': <span role="alert" className={styles.error}>Обязательное поле</span>
                            }[errors.from?.type]
                        }
                    </label>
                    <label className={styles.input}>
                        <span className={styles.inputFieldName}>До какой станции</span>
                        <select {...register("to", { required: true })}
                                aria-invalid={errors.to ? "true" : "false"}
                                className={styles.inputField}
                                defaultValue={station2}
                        >
                            {[...stationsOptions]}
                        </select>
                    </label>
                    {
                        {
                            'required': <span role="alert" className={styles.error}>Обязательное поле</span>
                        }[errors.to?.type]
                    }
                    <label className={styles.input}>
                        <span className={styles.inputFieldName}>Тип груза</span>
                        <select {...register("type", { required: true })}
                                aria-invalid={errors.type ? "true" : "false"}
                                className={styles.inputField}
                        >
                            {types}
                        </select>
                    </label>
                    {
                        {
                            'required': <span role="alert" className={styles.error}>Обязательное поле</span>
                        }[errors.type?.type]
                    }
                    <label className={styles.input}>
                        <span className={styles.inputFieldName}>Вес груза (кг)</span>
                        <input {...register("weight", { min: 0.1, max: 10000, minLength: 1 })}
                               aria-invalid={errors.weight ? "true" : "false"}
                               className={styles.inputField} placeholder="Введите вес вашего груза в килограммах"
                               type="number"
                        />
                        {
                            {
                                'minLength': <span role="alert" className={styles.error}>Обязательное поле</span>,
                                'min': <span role="alert" className={styles.error}>Вес слишком маленький</span>,
                                'max': <span role="alert" className={styles.error}>Вес слишком большой</span>,
                            }[errors.weight?.type]
                        }
                    </label>
                    <label className={styles.input}>
                        <span className={styles.inputFieldName}>Комментарий</span>
                        <textarea {...register("comment")}
                               className={styles.inputField} placeholder="Введите комментарий по желанию"
                        />
                    </label>
                </div>
                <div className={styles.bottom}>
                    <input type="submit" value="Отправить" className={styles.sendFormButton}/>
                </div>
            </form>
        </div>
        <div className={stylesStartPage.contacts}>
            <p className={stylesStartPage.comment}>Желаете связаться с оператором?</p>
            <p className={stylesStartPage.comment}>+7(911)222-33-44</p>
        </div>
    </>;
}

export default CreateOrderPage;