import AdminHeader from "./AdminHeader";
import Map from "../Map";
import customerStyles from "../MainPage.module.css";

const AdminMainPage = () => {
    return <>
        <AdminHeader/>
        <div className={customerStyles.ellipsesWrapper}>
            <div className={customerStyles.ellipse}></div>
        </div>
        <span className={customerStyles.callToAction} style={{marginTop: "30px"}}>
            Здравствуй, админ
        </span>
        <Map />
    </>;
};

export default AdminMainPage;