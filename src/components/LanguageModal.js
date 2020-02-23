import React, { Component } from "react";
import I18n from "react-native-i18n";
import { connect } from "react-redux";
import {
  AppView,
  AppText,
  AppModal,
  AppButton,
  showError,
  AppIcon
} from "../common";

const lang = ["العربيه", "الانجليزيه"];

class LanguageModal extends Component {
  render() {
    const { isVisible, ...rest } = this.props;
    return (
      <AppModal
        animationIn="bounceIn"
        animationOut="bounceOut"
        isVisible={isVisible}
        {...rest}
      >
        <AppView
          width={80}
          backgroundColor="white"
          paddingVertical={4}
          borderRadius={5}
          paddingHorizontal={4}
        >
          <AppView stretch center paddingVertical={5}>
            <AppText> {I18n.t("language")} </AppText>
          </AppView>
          {lang.map((item, index) => (
            <>
              <AppView stretch backgroundColor="white" row>
                <AppButton
                  center={false}
                  paddingVertical={3.5}
                  stretch
                  flex
                  backgroundColor="transparent"
                  onPress={() => {
                    this.props.onConfirm(item);
                    // AppNavigation.pop(this.props.componentId);
                  }}
                  paddingHorizontal={3}
                  height={6}
                  touchableOpacity
                >
                  <AppView stretch centerY>
                    <AppText size={5.5} color="#6A6A6A" bold>
                      {item}
                    </AppText>
                  </AppView>
                </AppButton>
                <AppView
                  circleRadius={6.5}
                  center
                  borderColor="grey"
                  borderWidth={0.5}
                >
                  {this.props.selected || index === 0 ? (
                    <AppView
                      backgroundColor="primary"
                      circleRadius={6.5}
                      center
                    >
                      <AppIcon name="check" type="entypo" color="white" />
                    </AppView>
                  ) : null}
                </AppView>
              </AppView>
              <AppView
                borderBottomColor={index === 1 ? undefined : "grey"}
                borderBottomWidth={index === 1 ? undefined : 0.5}
                stretch
                marginVertical={2}
              />
            </>
          ))}
        </AppView>
      </AppModal>
    );
  }
}
const mapStateToProp = state => ({
  currentUser: state.auth.currentUser
});
const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProp,
  mapDispatchToProps
)(LanguageModal);
