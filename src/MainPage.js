import CustomerHeader from "./CustomerHeader";
import styles from "./MainPage.module.css";
import MapPreview from "./MapPreview";

const MainPage = () => {
    return <>
        <CustomerHeader/>
        <div className={styles.ellipses_wrapper}>
            <div className={styles.ellipse}></div>
        </div>
        <div className={styles.searchFieldsWrapper}>
            <div className={styles.fieldLabelWrapper}>
                <label htmlFor="from" className={styles.searchFieldLabel}>От</label>
                <select name="from" className={styles.searchField}></select>
            </div>
            <div className={styles.fieldLabelWrapper}>
                <label htmlFor="to" className={styles.searchFieldLabel}>До</label>
                <select name="to" className={styles.searchField}></select>
            </div>
        </div>
        <MapPreview/>
        <button className={styles.addOrderButton}>Оставить заявку</button>
    </>;
}

export default MainPage;