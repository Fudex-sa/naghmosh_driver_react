import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import {
  AppView,
  AppScrollView,
  AppNavigation,
  showError,
  AppText,
  AppSpinner
} from "../../common";
import I18n from "react-native-i18n";
import ErrorView from "../../components/ErrorView";

export default props => {
  const [settings, setSettings] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const _getSettings = async () => {
    setIsLoading(true);
    if (error) setError("");
    try {
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    _getSettings();
  }, []);

  return (
    
            <AppView stretch flex marginHorizontal={10} center backgroundColor="red">
              <AppText>"SSS"</AppText>
            </AppView>
  );
};
