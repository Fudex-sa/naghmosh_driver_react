import { AppNavigation } from "../common";
import Home from "./Home/Home";
import Settings from "./Settings/Settings";
import OrderDetails from './OrderDetails/OrderDetails';
import Profile from "./Profile/Profile";
import SignUp from "./signUp/SignUp";
import Login from "./Login/Login";
import Language from "./Settings/Language";
import ChangePassword from "./ChangePassword/ChangePassword";
import HowToUse from "./Settings/HowToUse";
import ForgetPassword from "./ForgetPassword/ForgetPassword";
import Notifications from "./Notification/Notification"
import DeliverOrder from "./DeliverOrder/DeliverOrder";
import FinishedOrders from "./FinishedOrders/FinishedOrders";
import Informations from "./Informations/Informations";

// register all screens of the app
export default () => {
  AppNavigation.registerScreen("DeliverOrder", DeliverOrder);
  AppNavigation.registerScreen("FinishedOrders", FinishedOrders);
  AppNavigation.registerScreen("Informations", Informations);
  AppNavigation.registerScreen("Notifications", Notifications);
  AppNavigation.registerScreen("ForgetPassword", ForgetPassword);
  AppNavigation.registerScreen("HowToUse", HowToUse);
  AppNavigation.registerScreen("ChangePassword", ChangePassword);
  AppNavigation.registerScreen("Language", Language);
  AppNavigation.registerScreen("Login", Login);
  AppNavigation.registerScreen("Home", Home);
  AppNavigation.registerScreen("Settings", Settings);
  AppNavigation.registerScreen("OrderDetails", OrderDetails);
  AppNavigation.registerScreen("Profile", Profile);
  AppNavigation.registerScreen("signUp", SignUp);
};
