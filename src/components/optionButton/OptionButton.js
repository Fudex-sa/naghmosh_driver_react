import React, { Component } from "react";
import { connect } from "react-redux";
import { StyleSheet, Dimensions } from "react-native";
import {
  AppView,
  AppText,
  AppButton,
  AppIcon,
  getColors,
  AppImage,
  moderateScale
} from "../../common";
import styles from "./styles";
import colors from "../../common/defaults/colors";
import I18n from "react-native-i18n";

export default class OptionButton extends Component {

  renderCategoriesFilterScroll = () => {
    const {
      tagScroll,
      style,
      onPress,
      value,
      index,
      selected,
      data,
      ...rest
    } = this.props;
    return (
      <AppView stretch style={style} centerX {...rest}>
        <AppView
          backgroundColor={selected ? colors.primaryAccent : "#fff"}
          center
          onPress={() => {
            onPress(value);
          }}
          borderRadius={20}
          width={16} height={12}
          elevation={5}
          margin={2}
        // touchableOpacity
        >
          <AppImage resizeMode='contain' source={{ uri: data.img_url }} equalSize={12} />
          <AppText size={7} color={selected ? "#FFF" : colors.darkgrey} center marginTop={1} >
            {data.name}
          </AppText>
        </AppView>
      </AppView>
    );
  };

  renderDefault = () => {
    const {
      tagScroll,
      style,
      onPress,
      value,
      index,
      selected,
      text,
      name,
      checkBox,
      gender,
      ...rest
    } = this.props;
    return (
      <AppView stretch style={style} centerX flex={!gender} {...rest}>
        <AppView
          borderWidth={1.5}
          borderColor={selected ? getColors().primary : getColors().grey}
          circleRadius={12}
          center
          onPress={() => {
            onPress(value);
          }}
          touchableOpacity
          marginHorizontal={2}
        >
          {name && (
            <AppImage
              source={name}
              marginHorizontal={1}
              resizeMode="contain"
              equalSize={12}
            />
          )}
        </AppView>
        {text && (
          <AppView center marginTop={2}>
            <AppText
              color={selected ? "#676767" : "#8B8B8B"}
              center
              size={4.5}
              bold={selected}
            >
              {text}
            </AppText>
          </AppView>
        )}
      </AppView>
    );
  };

  render() {
    const {
      tagScroll,
      style,
      onPress,
      value,
      index,
      selected,
      text,
      name,
      checkBox,
      CategoriesFilter,
      ...rest
    } = this.props;
    return (
      <React.Fragment>
        {CategoriesFilter
          ? this.renderCategoriesFilterScroll()
          : this.renderDefault()}
      </React.Fragment>
    );
  }
}
