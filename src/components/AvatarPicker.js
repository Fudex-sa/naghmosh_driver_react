import React, { Component } from "react";
import { connect } from "react-redux";
import {
  AppView,
  AppIcon,
  AppImage,
  AppNavigation,
  responsiveFontSize
} from "../common";

const placholder = require("../assets/imgs/empityPictue.png");

class Avatar extends Component {
  state = {
    imgUri: this.props.initialUriValue || null
  };

  selectProfileImg = uri => {
    this.setState({
      imgUri: uri
    });
    this.props.onChange(uri);
  };

  renderPlusIcon = () => (
    <AppView
      center
      equalSize={8}
      borderRadius={5}
      backgroundColor="primary"
      style={{
        position: "absolute",
        bottom: 0,
        right: this.props.rtl ? 0 : undefined,
        left: this.props.rtl ? undefined : 0
      }}
      onPress={() =>
        AppNavigation.push({
          name: "photoSelection",
          passProps: {
            action: this.selectProfileImg
          }
        })
      }
    >
      <AppIcon
        type="custom"
        name="upload"
        size={8}
        color="white"
        style={{
          lineHeight: responsiveFontSize(8)
        }}
      />
    </AppView>
  );

  render() {
    return (
      <AppView marginBottom={10} marginTop={5}>
        {this.state.imgUri ? (
          <AppView
            borderWidth={1}
            borderColor="grey"
            circleRadius={26}
            touchableOpacity
            onPress={() =>
              AppNavigation.push({
                name: "photoSelection",
                passProps: {
                  action: this.selectProfileImg
                }
              })
            }
            style={{
              overflow: "visible"
            }}
          >
            <AppImage
              source={{ uri: this.state.imgUri }}
              resizeMode="cover"
              flex
              stretch
              circleRadius={26}
            />
            {/* {this.renderPlusIcon()} */}
          </AppView>
        ) : (
          <React.Fragment>
            <AppView
              borderWidth={1}
              borderColor="grey"
              circleRadius={26}
              center
              onPress={() =>
                AppNavigation.push({
                  name: "photoSelection",
                  passProps: {
                    action: this.selectProfileImg
                  }
                })
              }
              style={{
                overflow: "visible"
              }}
            >
              <AppImage
                source={placholder}
                circleRadius={26}
                resizeMode="contain"
              />
              {/* {this.renderPlusIcon()} */}
            </AppView>
          </React.Fragment>
        )}
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl
});

export default connect(mapStateToProps)(Avatar);
