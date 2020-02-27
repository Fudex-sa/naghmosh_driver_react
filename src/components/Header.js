import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Platform, SafeAreaView, StatusBar } from 'react-native';
import { connect } from 'react-redux';

import {
  AppView,
  AppText,
  AppNavigation,
  AppButton,
  AppIcon,
  getColors,
  AppImage,
} from '../common';
import colors from '../common/defaults/colors';
import { Navigation } from 'react-native-navigation';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 54 : 56;

class Header extends Component {
  static propTypes = {
    hideBack: PropTypes.bool,
    rowItems: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
  };

  static defaultProps = {
    hideBack: false,
    rowItems: [],
  };

  goBack = () => {
    if (this.props.backHandler) {
      this.props.backHandler();
    } else {
      AppNavigation.pop();
    }
  };

  renderNotification = () => {

    return (
      <AppView
        width={10}
        stretch
        transparent
        marginRight={10}
        // onPress={() => AppNavigation.push({ name: '' })}
        ph={2}
        flexInnerTouchable
        center
      >
        <AppIcon name="ios-notifications" type="ion" size={12} />
      </AppView>
    );
  };

  renderRight = () => {
    const { rowItems, showSettings, rtl, showNotif, hideCart, cartCount } = this.props;
    return (
      <AppView stretch center flex  >
        {/* {hideCart ? null
          : <>
            <AppImage source={require('../assets/imgs/cart.png')} width={10} height={5}
              resizeMode={'contain'}
              onPress={() => {
                Navigation.popToRoot('bottomTabs');
                Navigation.mergeOptions('bottomTabs', {
                  bottomTabs: {
                    currentTabIndex: rtl ? 3 : 1,
                  }
                });
              }} />
            {cartCount > 0 && <AppView circleRadius={6} backgroundColor='red' center
              style={{ position: 'absolute', top: 2, right: 0 }} >
              <AppText color={'white'} >{cartCount}</AppText>
            </AppView>}
          </>
        } */}
        {/* {showSettings ? (
          <AppView
            row
            marginRight={20}
            // center
            padding={3}
          // onPress={() => AppNavigation.push({ name: '' })}
          >

            <AppIcon
              name="ios-settings"
              type="ion"
              size={10}
            />
          </AppView>
        ) :
          <AppView
            row
            marginRight={20}
            center
          />
        }
        {showNotif && this.renderNotification()} */}
      </AppView>
    );
  };

  renderLeft = () => {
    const { hideBack, showMenu } = this.props;
    if (hideBack) {
      return <AppView stretch flex />;
    }
    return (
      <AppView flex marginHorizontal={3} >
        <AppButton
          flex
          backgroundColor="transparent"
          center
          onPress={this.goBack}
        >
          <AppIcon
            flip
            name="md-arrow-back"
            type="ion"
            size={12}
            color="black"
          />
        </AppButton>
      </AppView>
    );
  };

  render() {
    const { title } = this.props;
    return (
      <SafeAreaView
        style={{
          alignSelf: 'stretch',
          backgroundColor: getColors().primary,
        }}
      >
        <AppView
          stretch
          style={{
            height: APPBAR_HEIGHT,
            marginTop: StatusBar.currentHeight
          }}
          row
          spaceBetween
          backgroundColor={"white"}
          borderBottomWidth={0.5}
          borderBottomColor="grey"
        >
          {this.renderLeft()}
          <AppView flex={4} center marginRight={5} >
            <AppText size={9} bold numberOfLines={1} color="black">
              {title}
            </AppText>
          </AppView>
          {this.renderRight()}
        </AppView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
  cartCount: state.auth.count,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
