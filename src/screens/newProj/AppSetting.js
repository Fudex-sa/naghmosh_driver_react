import React from "react";
import { ImageBackground } from "react-native";
import * as Animatable from "react-native-animatable";
import { Navigation } from "react-native-navigation";
import I18n from "react-native-i18n";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  AppView,
  AppText,
  AppIcon,
  AppImage,
  AppNavigation,
  AppList
} from "../../common";
import { AppHeader } from "../../components";
import { initLang, setLang } from "../../actions/lang";
// import * as NotificationsRepo from '../../repo/NotificationsRepo';
import ItemMore from "./ItemMore";
import AppLanguageModal from "./LanguageModal";
import NotificationModal from "./NotificationModal";

class Setting extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notificationModal: false,
      languageModal: false,
      loading: false,
      data: [
        {
          onPress: () => {
            this.setState({
              notificationModal: true
            });
          },
          title: I18n.t("notifications"),
          titleIcon: I18n.t("Allowed")
        },
        {
          onPress: () => {
            this.setState({
              languageModal: true
            });
          },
          title: I18n.t("app-lang"),
          titleIcon: I18n.t("english-lang")
        }
      ]
    };
  }

  renderItems = () => {
    const { data } = this.state;
    return (
      <AppView flex={4} stretch mt={2}>
        {data.map(this.renderItem)}
      </AppView>
    );
  };

  renderItem = (item, key) => (
    <Animatable.View
      useNativeDriver
      animation="fadeInUp"
      key={key}
      style={{ alignSelf: "stretch" }}
    >
      <ItemMore
        paddingHorizontal={12}
        paddingVertical={6}
        onPress={item.onPress}
        leftItem={
          <AppView row>
            <AppText marginHorizontal={5} size={5} color="#C4C4C4">
              {item.titleIcon}
            </AppText>
            <AppIcon
              name="ios-arrow-forward"
              type="ion"
              size={8}
              color="#CDD5D7"
            />
          </AppView>
        }
        rightItem={
          <AppView row>
            <AppText size={6}>{item.title}</AppText>
          </AppView>
        }
      />
    </Animatable.View>
  );

  componentDidUpdate(prevState) {
    if (prevState.rtl !== this.props.rtl) {
      console.log("JJJJJJJJJJJJJJJJJJJJJ");

      this.setState({
        ...this.props.rtl
      });
    }
  }

  onChangeLanguage = async lang => {
    try {
      const res = await NotificationsRepo.changeLanguage(lang);
      console.log("res", res);
      if (!res.data.Failed) {
        if (lang === "en") {
          this.props.setLang(lang, false);
        } else {
          this.props.setLang(lang, true);
        }
        this.setState({
          languageModal: false
        });
      }
    } catch (error) {
      this.setState({
        languageModal: false
      });
      console.log("error", error);
    }
  };

  onAllowNotification = async notifications => {
    this.setState({
      loading: true
    });
    try {
      const res = await NotificationsRepo.allowNotification(notifications);
      if (!res.data.Failed) {
        this.setState({
          notificationModal: false,
          loading: false
        });
      }
    } catch (error) {
      this.setState({
        notificationModal: false,
        loading: false
      });
    }
  };

  render() {
    return (
      <>
        <AppView flex stretch centerX>
          <AppHeader
            title="الاعدادات"
            showSearch={false}
            showNotification={false}
          />
          {this.renderItems()}
        </AppView>
        <AppLanguageModal
          isVisible={this.state.languageModal}
          changeState={val => {
            this.setState({
              languageModal: val
            });
          }}
          selected={this.props.lang}
          onConfirm={val => {
            console.log("lang", val);

            this.setState({
              languageModal: false
            });
            // this.onChangeLanguage(val);
          }}
        />
        <NotificationModal
          isVisible={this.state.notificationModal}
          changeState={val => {
            this.setState({
              notificationModal: val
            });
          }}
          onConfirm={notifications => {
            // this.onAllowNotification(notifications);
            this.setState({
              notificationModal: false
            });
          }}
          isLoading={this.state.loading}
        />
      </>
    );
  }
}

const mapStateToProps = state => ({
  connected: state.network.isConnected,
  lang: state.lang.lang,
  rtl: state.lang.rtl
});
const mapDispatchToProps = dispatch => ({
  setLang: bindActionCreators(setLang, dispatch),
  initLang: bindActionCreators(initLang, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);
