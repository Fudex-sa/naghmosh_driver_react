import React, { Component } from "react";

import { AppView, AppText, AppImage, AppIcon } from "../../common";


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
        row
        backgroundColor="white"
        marginHorizontal={10}
        elevation={1.5}
        marginVertical={5}
        borderRadius={5}
        {...rest}
      >
        <AppView equalSize={20}>
          <AppImage source={require('../../assets/imgs/nn.png')} equalSize={20} resizeMode={'contain'} />
        </AppView>
        <AppView stretch centerY flex marginLeft={5} top>
          <AppText bold size={7}>label</AppText>
          <AppText size={6} numberOfLines={1}>hint</AppText>
          <AppText color='primary' numberOfLines={1}>{'02:30'}</AppText>
        </AppView>
        <AppView>
          
          <AppView
            equalSize={3}
            center
            borderRadius={7} marginRight={10}
            backgroundColor="primary"
          />

        </AppView>
      </AppView>
    );
  }
}

export default Home;
