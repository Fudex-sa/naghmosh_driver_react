import { I18nManager } from "react-native";
import initApp from './src/App';

I18nManager.allowRTL(false);
console.disableYellowBox = true
initApp();