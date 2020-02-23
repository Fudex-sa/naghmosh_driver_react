import React, { Component } from "react";
import { connect } from "react-redux";
import { AppView, AppText, AppModal, AppButton, AppSpinner } from "../common";

class ConfirmationModal extends Component {
  static defaultProps = {
    isAsyncConfirmProgress: false
  };

  render() {
    const { isVisible, ...rest } = this.props;

    return (
      <AppModal
        animationIn="bounceIn"
        animationOut="bounceOut"
        isVisible={isVisible}
        lock
        {...rest}
      >
        <AppView width={75} backgroundColor="white" touchableOpacity>
          <AppText
            left
            color="foreground"
            bold
            marginTop={10}
            size={6}
            marginHorizontal={5}
          >
            {this.props.title}
          </AppText>

          {/* <AppView width={70}> */}
          <AppText
            marginTop={5}
            color="#5F5F5F"
            size={5.5}
            marginHorizontal={5}
          >
            {this.props.desc}
          </AppText>
          {/* </AppView> */}

          <AppView stretch row height={8} right marginTop={15} paddingLeft={25}>
            <>
              <AppButton
                title={this.props.yesLabel}
                backgroundColor="foreground"
                flex
                stretch
                margin={3}
                paddingVertical={0}
                touchableOpacity
                onPress={this.props.onConfirm}
              />

              <AppButton
                title={this.props.noLabel}
                backgroundColor="red"
                color="primary"
                bc="primary"
                br={1}
                bw={1}
                flex
                stretch
                margin={3}
                paddingVertical={0}
                touchableOpacity
                onPress={() => this.props.changeState(false)}
              />
            </>
          </AppView>
        </AppView>
      </AppModal>
    );
  }
}

const mapstateToProps = state => ({
  rtl: state.lang.rtl
});

export default connect(mapstateToProps)(ConfirmationModal);
