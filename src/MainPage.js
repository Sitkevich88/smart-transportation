import CustomerHeader from "./CustomerHeader";
import styles from "./MainPage.module.css";
import mapService from "./service/MapService";
import {useRef, useState} from "react";
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
    const [isBannerVisible, setIsBannerVisible] = useState(false);

    const showBanner = (e) => {
        setIsBannerVisible(true);
        setTimeout(() => {
            setIsBannerVisible(false);
        }, 3000);
    };

    return <>
        <CustomerHeader buttonId={1}/>
        <div className={styles.ellipsesWrapper}>
            <div className={styles.ellipse}></div>
        </div>
        <span className={styles.callToAction}>
            Выберите, между какими станциями доставить груз
        </span>
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
        {isBannerVisible && <div className={styles.banner}>
            Выберите станции кликом по полю "От" и "До"
        </div>}
        <div className={styles.mapWrapper}>
            <div style={{gridArea: "1 / 1"}}>
                <Map station1={station1} station2={station2}/>
            </div>
            <div className={styles.overlay } onClick={(e) => showBanner(e)}></div>
        </div>
        <button className={styles.addOrderButton}
                onClick={() => navigate(`/addorder?station1=${!!station1 ? station1 : ''}&station2=${!!station2 ? station2 : ''}`)}
        >
            {!!station1 && !!station2 ? "Продолжить заполнение заявки" : "Оставить заявку"}
        </button>
        <div className={stylesStartPage.contacts} style={{display: "flex"}}>
            <p className={stylesStartPage.comment}>Контакты:</p>
            <p className={stylesStartPage.comment}>+7(911)222-33-44</p>
        </div>
    </>;
}

export default MainPage;