import React, { Component } from "react";

import { AppView, AppText, AppImage, AppIcon } from "../../common";

import colors from "../../common/defaults/colors";
import { useSelector } from "react-redux";

// create a component
const HomeCard = (props) => {
  const lang = useSelector(state => state.lang.lang);
  const {
    iconName,
    iconType,
    label,
    hint,
    notification,
    source,
    notifCount,
    ...rest
  } = props;
  return (
    <AppView
      stretch
      height={12}
      row
      linearBackgroundGradient={{
        colors: [colors.black, colors.thirdly],
        start: { x: lang === 'ar' ? 1 : 0, y: lang === 'ar' ? 1 : 0 },
        end: { x: lang === 'ar' ? 0 : 1, y: lang === 'ar' ? 0 : 1 }
      }}
      marginHorizontal={10}
      paddingHorizontal={10}
      marginBottom={7}
      borderRadius={5}
      {...rest}
    >
      <AppView flex>
        <AppImage source={source} width={10} height={10} resizeMode={'contain'} />
      </AppView>
      <AppView flex={4}>
        <AppText color={colors.primary} bold size={7}>
          {label}
        </AppText>
        <AppText color={colors.secondary} size={5} >
          {hint}
        </AppText>
      </AppView>
      <AppView>
        {notification && notifCount > 0 && (
          <AppView
            equalSize={7}
            center
            borderRadius={12}
            backgroundColor={colors.primary}
          >
            <AppText color={colors.secondary}>{notifCount}</AppText>
          </AppView>
        )}
      </AppView>
    </AppView >
  );
};


//make this component available to the app
export default HomeCard;
