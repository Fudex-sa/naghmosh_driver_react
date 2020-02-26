import React, { Component } from "react";
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
        <AppView
          stretch
          marginHorizontal={7}
          stretch
          borderRadius={10}
          backgroundColor="white"
          touchableOpacity
        >
          <AppText left bold marginVertical={5} size={6} marginHorizontal={5}>
            {this.props.title}
          </AppText>

          <AppView stretch center>
            <AppText color="#5F5F5F" size={5.5} center marginHorizontal={5}>
              {this.props.desc}
            </AppText>
          </AppView>

          <AppView stretch row height={10} center>
            {this.props.isAsyncConfirmProgress ? (
              <AppView stretch center flex>
                <AppSpinner size={12} />
              </AppView>
            ) : (
              <AppView stretch row height={8} center>
                {this.props.noLabel && this.props.onCancel && (
                  <AppButton
                    bold={false}
                    title={this.props.noLabel}
                    backgroundColor="white"
                    color="#000000"
                    stretch
                    width={15}
                    touchableOpacity
                    onPress={this.props.onCancel}
                  />
                )}

                {this.props.yesLabel && this.props.onConfirm && (
                  <AppButton
                    bold={false}
                    title={this.props.yesLabel}
                    backgroundColor="white"
                    color="#000000"
                    stretch
                    width={15}
                    touchableOpacity
                    onPress={this.props.onConfirm}
                  />
                )}
              </AppView>
            )}
          </AppView>
        </AppView>
      </AppModal>
    );
  }
}

export default ConfirmationModal;
