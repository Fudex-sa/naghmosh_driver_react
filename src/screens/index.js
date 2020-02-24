import React, { Component } from "react";
import { Navigation } from "react-native-navigation";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

import { Provider } from "react-redux";
import store from "../store";

import ContactUs from "./contactUs/ContactUs";
import AboutBalsam from "./aboutBalsam/AboutBalsam";

import PhotoSelection from "./photoSelection/PhotoSelection";
import SignUp from "./signUp/SignUp";
// import SignIn from "./signIn/SignIn";

import MapScreen from "./mapScreen/MapScreen";

// new proj

import HomeScreen from "./newProj/Home";
import ProfileScreen from "./newProj/Profile";
import NotificationScreen from "./newProj/Notification";
import SignInScreen from "./newProj/signIn/SignIn";
import FinishedOrderScreen from "./newProj/FinishedOrder";
import DeliverOrderScreen from "./newProj/DeliverOrder";
import OrderDetails from "./newProj/OrderDetails";
import FollowOrder from "./newProj/FollowOrder";
import AppSetting from "./newProj/AppSetting";
import ForgetPassword from "./newProj/ForgetPassword/ForgetPassword";
import ChangePassword from "./newProj/ChangePassword/ChangePassword";

export default function() {
  const createScene = InternalComponent => () =>
    gestureHandlerRootHOC(
      class SceneWrapper extends Component {
        render() {
          return (
            <Provider store={store}>
              <InternalComponent {...this.props} />
            </Provider>
          );
        }
      }
    );

  Navigation.registerComponent("contactUs", createScene(ContactUs));
  Navigation.registerComponent("aboutBalsam", createScene(AboutBalsam));

  Navigation.registerComponent("photoSelection", createScene(PhotoSelection));
  Navigation.registerComponent("signUp", createScene(SignUp));
  // Navigation.registerComponent("signIn", createScene(SignIn));

  Navigation.registerComponent("mapScreen", createScene(MapScreen));

  // new Proj
  Navigation.registerComponent("homeScreen", createScene(HomeScreen));
  Navigation.registerComponent("ProfileScreen", createScene(ProfileScreen));
  Navigation.registerComponent(
    "NotificationScreen",
    createScene(NotificationScreen)
  );
  Navigation.registerComponent("SignInScreen", createScene(SignInScreen));
  Navigation.registerComponent(
    "FinishedOrderScreen",
    createScene(FinishedOrderScreen)
  );
  Navigation.registerComponent(
    "DeliverOrderScreen",
    createScene(DeliverOrderScreen)
  );
  Navigation.registerComponent("OrderDetails", createScene(OrderDetails));
  Navigation.registerComponent("FollowOrder", createScene(FollowOrder));
  Navigation.registerComponent("AppSetting", createScene(AppSetting));
  Navigation.registerComponent("ForgetPassword", createScene(ForgetPassword));
  Navigation.registerComponent("ChangePassword", createScene(ChangePassword));

}
