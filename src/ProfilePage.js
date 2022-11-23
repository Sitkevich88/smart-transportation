import CustomerHeader from "./CustomerHeader";
import mainPageStyles from "./MainPage.module.css";

const ProfilePage = () => {
    return (<>
        <CustomerHeader buttonId={0}/>
        <div className={mainPageStyles.ellipsesWrapper}>
            <div className={mainPageStyles.ellipse}></div>
        </div>
    </>);
}

export default ProfilePage;
