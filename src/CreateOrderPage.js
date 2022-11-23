import mainPageStyles from "./MainPage.module.css";
import {useNavigate} from "react-router-dom";
import styles from "./CreateOrderPage.module.css";
import stylesStartPage from "./StartPage.module.css";

const CreateOrderPage = (props) => {
    const navigate = useNavigate();

    return <>
        <div className={mainPageStyles.ellipsesWrapper}>
            <div className={mainPageStyles.ellipse}></div>
        </div>
        <p>Страница создания заявки</p>
        <button onClick={() => navigate(-1)}>Назад</button>
        <div className={stylesStartPage.contacts}>
            <p className={stylesStartPage.comment}>Желаете связаться с оператором?</p>
            <p className={stylesStartPage.comment}>+7(911)222-33-44</p>
        </div>
    </>;
}

export default CreateOrderPage;