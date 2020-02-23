import React, { Component } from "react";
import PropTypes from "prop-types";
import { Platform, SafeAreaView, StatusBar } from "react-native";
import { connect } from "react-redux";

import {
  AppView,
  AppText,
  AppNavigation,
  AppButton,
  AppIcon,
  getColors,
  AppImage,
  moderateScale
} from "../common";
import colors from "../common/defaults/colors";

const APPBAR_HEIGHT = Platform.OS === "ios" ? 54 : 56;

class Header extends Component {
  static propTypes = {
    hideBack: PropTypes.bool,
    rowItems: PropTypes.oneOfType([PropTypes.array, PropTypes.node]),
    showCart: PropTypes.bool,
    showSearch: PropTypes.bool
  };

  static defaultProps = {
    hideBack: false,
    rowItems: [],
    showCart: false,
    showSearch: false
  };

  goBack = () => {
    if (this.props.backHandler) {
      this.props.backHandler();
    } else {
      AppNavigation.pop();
    }
  };

  renderRight = () => {
    const { rowItems, showCart, showSearch, rtl, currentUser } = this.props;
    if (rowItems.length > 0 || showCart) {
      return (
        <AppView row stretch bottom>
          {rowItems.length > 0 &&
            rowItems.map(item =>
              React.cloneElement(item, {
                key: String(Math.random())
              })
            )}
          {showSearch && (
            <AppButton
              transparent
              onPress={() => AppNavigation.push("productSearch")}
            >
              <AppView>
                <AppIcon name="search" type="font-awesome5" size={8} />
              </AppView>
            </AppButton>
          )}

          {showCart && (
            <AppButton
              marginLeft={5}
              transparent
              onPress={() => AppNavigation.push("cart")}
            >
              <AppView>
                <AppIcon name="shopping-basket" type="font-awesome5" size={8} />
                {
                  <AppView
                    style={{
                      position: "absolute",
                      top: -moderateScale(3.5),
                      ...(rtl
                        ? { left: -moderateScale(5) }
                        : { right: -moderateScale(5) })
                    }}
                    circleRadius={6.5}
                    backgroundColor={colors.primary}
                    center
                  >
                    <AppText color="foreground" size={5}>
                      {currentUser !== null
                        ? `${this.props.items_count}`
                        : this.props.cart.length}
                    </AppText>
                  </AppView>
                }
              </AppView>
            </AppButton>
          )}
        </AppView>
      );
    }

    return <AppView stretch flex />;
  };

  renderNavigatorBtn = () => {
    const { showMenu, hideBack } = this.props;
    if (showMenu) {
      return (
        <AppButton
          leftIcon={
            <AppIcon name="menu" type="feather" size={14} color="grey" />
          }
          onPress={AppNavigation.openMenu}
          paddingHorizontal={8}
          backgroundColor="transparent"
        />
      );
    }
    if (hideBack) {
      return <AppView paddingHorizontal={8} backgroundColor="transparent" />;
    }
    return (
      <AppButton
        leftIcon={
          <AppIcon name="ios-arrow-forward" type="ion" size={12} color="grey" />
        }
        onPress={this.goBack}
        paddingHorizontal={8}
        backgroundColor="transparent"
      />
    );
  };

  renderLeft = () => (
    <AppView stretch row>
      {this.renderNavigatorBtn()}
    </AppView>
  );

  renderTitle = () => {
    const { title } = this.props;

    return (
      <AppView stretch center flex={4}>
        {title ? (
          <AppText size={7} bold numberOfLines={1} color="black">
            {title}
          </AppText>
        ) : (
          this.renderLogo()
        )}
      </AppView>
    );
  };

  renderLogo = () => {
    const { title } = this.props;
    return (
      <AppView flex={3} right stretch centerY>
        <AppImage
          source={{ uri: null }}
          resizeMode="contain"
          width={25}
          height={25}
        />
      </AppView>
    );
  };

  render() {
    const { title, showLogo, transparent } = this.props;
    return (
      <SafeAreaView
        style={{
          alignSelf: "stretch",
          backgroundColor: transparent ? "transparent" : "white",
          elevation: 1.5
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
          backgroundColor={transparent ? "transparent" : "white"}
          borderBottomWidth={0.5}
          borderBottomColor="grey"
        >
          {this.renderLeft()}
          {this.renderTitle()}

          {this.renderRight()}
        </AppView>
      </SafeAreaView>
    );
  }
}
const mapStateToProps = state => ({
  rtl: state.lang.rtl,
  items_count: state.cart.items_count,
  cart: state.cart.cart,
  currentUser: state.auth.currentUser
});

export default connect(mapStateToProps)(Header);
