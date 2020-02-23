import React, { Component } from "react";

import { AppView, AppText, AppImage, AppIcon } from "../../common";

import { AppHeader } from "../../components";
import notification from "../../assets/imgs/notification.png";

import avatar from "../../assets/imgs/upload.png";

class Home extends Component {
  // redesign code replace image with code
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
        height={15}
        row
        backgroundColor="white"
        marginHorizontal={10}
        paddingHorizontal={10}
        elevation={1.5}
        marginBottom={7}
        borderRadius={5}
        {...rest}
      >
        <AppView equalSize={20}>
          <AppImage source={avatar} equalSize={20} />
        </AppView>
        <AppView stretch centerY flex marginHorizontal={2} top>
          <AppText bold>label</AppText>
          <AppText size={4.3} numberOfLines={1}>
            hint
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
