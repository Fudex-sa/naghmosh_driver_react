import React, { Component } from "react";

import { AppView, AppText, AppImage, AppIcon } from "../../common";

import { AppHeader } from "../../components";

class Home extends Component {
  render() {
    const {
      iconName,
      iconType,
      label,
      hint,
      notification,
      ...rest
    } = this.props;
    return (
      <AppView
        stretch
        height={12}
        row
        backgroundColor="rgba(111, 176, 80, 0.5)"
        marginHorizontal={10}
        paddingHorizontal={10}
        // elevation={1.5}
        marginBottom={7}
        borderRadius={5}
        {...rest}
      >
        <AppView flex>
          <AppIcon name={iconName} type={iconType} color="white" size={15} />
        </AppView>
        <AppView flex={4}>
          <AppText color="white" bold>
            {label}
          </AppText>
          <AppText color="white" size={4.3} numberOfLines={1}>
            {hint}
          </AppText>
        </AppView>
        <AppView>
          {notification && (
            <AppView
              equalSize={6}
              center
              borderRadius={12}
              backgroundColor="red"
            >
              <AppText color="white">2</AppText>
            </AppView>
          )}
        </AppView>
      </AppView>
    );
  }
}

export default Home;
