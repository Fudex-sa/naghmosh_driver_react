import ApiAuth from "../api/auth";
import AsyncStorage from "@react-native-community/async-storage";

export default class Auth {
  constructor() {
    this.apiAuth = new ApiAuth();
  }

  signUp = async (data) => {
    const userData = await this.apiAuth.signUp(data);
    return userData;
  };


  signIn = async (data) => {
    const userData = await this.apiAuth.signIn(data);
    return userData;
  };

  verifyCode = async (
    data = {
      phone,
      confirmationCode
    }
  ) => {
    const userData = await this.apiAuth.verifyCode(data);
    return userData;
  };

  setPrincipalUser = async userData => {
    try {
      await AsyncStorage.setItem("@UserData", JSON.stringify(userData));
    } catch (error) {
    }
  };

  checkPrincipalUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("@UserData");
      const convertedUserData = JSON.parse(userData);
      return convertedUserData;
    } catch (error) {
      return null;
    }
  };

  logoutPrincipalUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("@UserData");
      const oldUserData = JSON.parse(userData);
      oldUserData.isLogout = true;
      await this.setPrincipalUser(oldUserData);
      await this.notificationRepo.unSubscribe(oldUserData.user.id);
      return oldUserData;
    } catch (error) {
      return null;
    }
  };

  getPrincipalUserProfileData = async clientId => {
    const userData = await this.apiAuth.getPrincipalUserProfileData(clientId);
    return userData;
  };

  updatePrincipalUserProfileData = async (clientId, data) => {
    const userData = await this.apiAuth.updatePrincipalUserProfileData(
      clientId,
      data
    );
    return userData;
  };
}
