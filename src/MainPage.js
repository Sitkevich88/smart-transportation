import CustomerHeader from "./CustomerHeader";
import styles from "./MainPage.module.css";
import mapService from "./service/MapService";
import {useState} from "react";
import Map from "./Map";
import {useNavigate} from "react-router-dom";
import stylesStartPage from "./StartPage.module.css";

const MainPage = () => {
    const navigate = useNavigate();
    const stationsOptions = mapService.getUniqueStationNames().map(name => {
        return <option key={name + '_stationName'}>{name}</option>;
    });
    stationsOptions.unshift(
        <option disabled selected value style={{display: "none"}}></option>
    );
    const [station1, setStation1] = useState(null);
    const [station2, setStation2] = useState(null);

    return <>
        <CustomerHeader buttonId={1}/>
        <div className={styles.ellipsesWrapper}>
            <div className={styles.ellipse}></div>
        </div>
        <div className={styles.searchFieldsWrapper}>
            <label className={styles.fieldLabelWrapper}>
                <span className={styles.searchFieldLabel}>От</span>
                <select className={styles.searchField}
                        onChange={e => setStation1(e.target.value)}
                >
                    {stationsOptions}
                </select>
            </label>
            <label className={styles.fieldLabelWrapper}>
                <span className={styles.searchFieldLabel}>До</span>
                <select className={styles.searchField}
                        onChange={e => setStation2(e.target.value)}
                >
                    {stationsOptions}
                </select>
            </label>
        </div>
        <Map station1={station1} station2={station2}/>
        <button className={styles.addOrderButton}
                onClick={() => navigate(`/addorder?station1=${!!station1 ? station1 : ''}&station2=${!!station2 ? station2 : ''}`)}
        >Оставить заявку</button>
        <div className={stylesStartPage.contacts}>
            <p className={stylesStartPage.comment}>Желаете связаться с оператором?</p>
            <p className={stylesStartPage.comment}>+7(911)222-33-44</p>
        </div>
    </>;
}

export default MainPage;