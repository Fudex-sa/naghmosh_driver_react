import React from "react";
import { connect } from "react-redux";
import I18n from "react-native-i18n";
import {
  AppModal,
  AppView,
  AppText,
  AppIcon,
  AppButton,
  AppScrollView,
  AppNavigation
} from "../common";

class SubCatModal extends React.Component {
  state = {
    isModalVisible: false,
    items: []
  };

  show = items => {
    this.setState({
      isModalVisible: true,
      items
    });
  };

  hide = () => {
    this.setState({
      isModalVisible: false
    });
  };

  renderModalContent = () => {
    const { items } = this.state;
    return (
      <AppView
        marginHorizontal={5}
        height={60}
        marginTop={12}
        stretch
        borderRadius={15}
        paddingHorizontal={5}
        backgroundColor="white"
      >
        <AppScrollView stretch marginTop={10}>
          {items.length > 0 ? (
            items.map((item, key) => (
                <AppView
                  touchableOpacity
                  onPress={() => {
                    this.hide();
                    AppNavigation.push({
                      name: "productsScreen",
                      passProps: {
                        title: item.sub_cat_name,
                        endPoint: "productssubcatsfilter",
                        params: [`subCatsIds=${item.cat_id}`],
                        slectedId: this.props.slectedId
                      }
                    });
                  }}
                  stretch
                  center
                  height={6}
                  key={item.cat_id}
                >
                  <AppText>{item.sub_cat_name}</AppText>
                </AppView>
              ))
          ) : (
            <AppView flex stretch center>
              <AppText>{I18n.t("no-sub-cats")}</AppText>
            </AppView>
          )}
        </AppScrollView>
      </AppView>
    );
  };

  render = () => {
    const { ...rest } = this.props;
    return (
      <AppModal
        backdropOpacity={0.1}
        animationIn="bounceIn"
        animationOut="bounceOut"
        isVisible={this.state.isModalVisible}
        closeable
        backdropDissmiss
        // onBackdropPress={this.hide}
        changeState={v => {
          this.setState({
            isModalVisible: v
          });
        }}
        {...rest}
      >
        {this.renderModalContent()}
      </AppModal>
    );
  };
}

export default connect(
  null,
  null,
  null,
  { forwardRef: true }
)(SubCatModal);
