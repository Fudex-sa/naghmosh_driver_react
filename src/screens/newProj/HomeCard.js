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
      source,
      ...rest
    } = this.props;
    return (
      <AppView
        stretch
        height={12}
        row
        linearBackgroundGradient={{ colors: ['#23A636', '#88C80A'], start: { x: 1, y: 1 }, end: { x: 0, y: 0 } }}
        marginHorizontal={10}
        paddingHorizontal={10}
        // elevation={1.5}
        marginBottom={7}
        borderRadius={5}
        {...rest}
      >
        <AppView flex>
          <AppImage source={source} width={10} height={10} resizeMode={'contain'} />
        </AppView>
        <AppView flex={4}>
          <AppText color="white" bold size={7}>
            {label}
          </AppText>
          <AppText color="white" size={5} >
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
      </AppView >
    );
  }
}

export default Home;
