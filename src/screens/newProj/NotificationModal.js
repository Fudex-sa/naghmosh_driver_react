import React, { Component } from "react";
import I18n from "react-native-i18n";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  AppView,
  AppText,
  AppModal,
  AppButton,
  showError,
  AppSpinner
} from "../../common";

class LogoutModal extends Component {
  render() {
    const { isVisible, ...rest } = this.props;
    return (
      <AppModal
        animationIn="bounceIn"
        animationOut="bounceOut"
        isVisible={isVisible}
        {...rest}
        backgroundColor="rgba(88,155,206,0.4)"
      >
        <AppView
          width={80}
          backgroundColor="white"
          paddingVertical={4}
          borderRadius={5}
          padding={5}
          centerX
        >
          <AppView
            marginHorizontal={6}
            marginBottom={7}
            marginTop={2}
            stretch
            center
          >
            <AppText center bold>
              {I18n.t("notefication")}
            </AppText>
            <AppView paddingVertical={7}>
              <AppText center lineHeight={8.5} color="#5F5F5F" marginTop={5}>
                {I18n.t("notefication-permission")}
              </AppText>
            </AppView>
          </AppView>

          <AppView row marginTop={5} stretch spaceAround>
            {this.props.isLoading ? (
              <AppView stretch center>
                <AppSpinner />
              </AppView>
            ) : (
              <>
                <AppButton
                  title={I18n.t("allow")}
                  touchableOpacity
                  height={6}
                  flex
                  color="secondary"
                  marginHorizontal={3}
                  transparent
                  onPress={() => this.props.onConfirm(true)}
                />
                <AppView
                  borderColor="inputBorderColor"
                  borderWidth={0.5}
                  stretch
                />
                <AppButton
                  title={I18n.t("dont-allow")}
                  touchableOpacity
                  transparent
                  flex
                  height={6}
                  onPress={() => this.props.onConfirm(false)}
                  color="secondary"
                />
              </>
            )}
          </AppView>
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
)(LogoutModal);
