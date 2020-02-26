import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FlatList, RefreshControl, View as NativeView } from "react-native";
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider
} from "recyclerlistview";
import I18n from "react-native-i18n";

import View from "./View";
import Text from "./Text";
import Indicator from "./Indicator";
import Button from "./Button";
import {
  expResponsiveHeight,
  moderateScale,
  responsiveHeight,
  windowHeight,
  APPBAR_HEIGHT
} from "./utils/responsiveDimensions";
import { getThemeColor } from "./utils/colors";
import { getTheme } from "./Theme";
import {
  BasePropTypes,
  dimensionsStyles,
  borderStyles,
  backgroundColorStyles,
  paddingStyles,
  textDirectionStyles,
  marginStyles,
  childrenLayoutStyles
} from "./Base";
import Network from "./Base/Network";

class List extends Network {
  static propTypes = {
    ...BasePropTypes,
    ...Network.propTypes,
    columns: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.object),
    noResultsLabel: PropTypes.string,
    rowRenderer: PropTypes.func,
    rowHeight: PropTypes.number,
    indicatorColor: PropTypes.string,
    errorLabelColor: PropTypes.string,
    noResultsLabelColor: PropTypes.string,
    retryButtoncolor: PropTypes.string,
    retryButtonBackgroundColor: PropTypes.string
  };

  static defaultProps = {
    ...Network.defaultProps,
    ...getTheme().list,
    columns: 1,
    data: [],
    rowHeight: 20,
    withBottomNav: false
  };

  constructor(props) {
    super(props);

    this.dataProvider = new DataProvider((r1, r2) => r1 !== r2);
    this.mainIndicator = "loading";
    this.currentFlatListScrollOffset = 0;

    this.state = {
      ...super.state,
      firstFetchDone: !props.apiRequest && !props.firebaseRequest,
      refreshing: false,
      loading: false,
      layoutProvider: null,
      dataProvider: props.flatlist
        ? { _data: props.data }
        : this.dataProvider.cloneWithRows(props.data),
      errorLabel: "",
      layoutReady: false
    };
  }

  // componentDidMount() {
  //   if (this.props.flatlist) {
  //     super.componentDidMount();
  //   }
  // }

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);
    if (nextProps.refreshControl !== this.props.refreshControl) {
      if (this.props.onRefresh) this.props.onRefresh();
      if (this.state.loading) return;
      this.reload();
    }
  }

  componentWillUnmount() {
    super.componentWillUnmount();
  }

  setStartFetching() {
    this.setState({
      errorLabel: ""
    });
  }

  setData = (data, cb) => {
    this.setState(
      {
        firstFetchDone: true,
        dataProvider: this.props.flatlist
          ? { _data: data }
          : this.dataProvider.cloneWithRows(data)
      },
      cb
    );
  };

  setError = errorLabel => {
    this.setState({
      firstFetchDone: true,
      errorLabel
    });
    this.loading = false;
  };

  setEndFetching = () => {
    this.setState({
      refreshing: false,
      loading: false
    });
  };

  addItemToList = item => {
    const { _data } = this.state.dataProvider;

    const newData = [..._data, item];

    this.setData(newData);
  };

  removeItemFromList = id => {
    const { _data } = this.state.dataProvider;
    const index = _data.findIndex(
      item => Object.getDeepProp(item, this.props.idPathInData) === id
    );
    _data.splice(index, 1);
    this.setData(_data);
  };

  updateItemInList = (id, changedData, changedDataCB = () => { }) => {
    const { _data } = this.state.dataProvider;

    const index = _data.findIndex(
      item => Object.getDeepProp(item, this.props.idPathInData || "id") === id
    );

    _data[index] = {
      ..._data[index],
      ...changedData,
      ...changedDataCB(_data[index])
    };
    this.setData(_data);
  };

  handleParentViewLayout = e => {
    if (this.state.layoutReady) return;

    if (this.props.flatlist) {
      this.setState({
        layoutReady: true
      });
    } else {
      const { width } = e.nativeEvent.layout;

      if (width < 1) return;

      this.setState({
        layoutReady: true,
        layoutProvider: new LayoutProvider(
          () => 1,
          (type, dim) => {
            dim.width = width / this.props.columns;
            dim.height = moderateScale(this.props.rowHeight, 0.2);
          }
        )
      });
    }
  };

  renderFooter = () => {
    const { noResultListHeight, withBottomNav } = this.props;
    const height = windowHeight - APPBAR_HEIGHT;

    if (
      (this.state.refreshing || this.loading) &&
      !(this.props.staticData && !this.props.data.length)
    )
      return null;

    if (this.state.errorLabel) {
      return (
        <View
          mv={30}
          centerX
          p={10}
          style={
            this.props.horizontal && this.props.rtl
              ? {
                transform: [
                  {
                    scale: -1
                  }
                ]
              }
              : noResultListHeight
                ? { height: noResultListHeight }
                : { height }
          }
        >
          <Text bold color={this.props.errorLabelColor}>
            {this.state.errorLabel}
          </Text>
          <Button
            stretch
            title={I18n.t("ui-retry")}
            backgroundColor={this.props.retryButtonBackgroundColor}
            color={this.props.retryButtoncolor}
            mv={8}
            mh={20}
            onPress={() => {
              this.setState({
                errorLabel: ""
              });
              if (this.props.onRefresh) this.props.onRefresh();
              this.reload();
            }}
            processing={this.state.refreshing}
            size={7.5}
            ph={10}
          />
        </View>
      );
    }

    if (
      this.state.dataProvider._data.length === 0 &&
      !this.state.loading &&
      this.state.firstFetchDone
    ) {
      if (this.props.noResultsComponent) {

        return React.cloneElement(this.props.noResultsComponent, {
          style:
            this.props.horizontal && this.props.rtl
              ? {
                transform: [
                  {
                    scale: -1
                  }
                ]
              }
              : noResultListHeight
                ? { height: noResultListHeight }
                : { height }
        });
      }
      return (
        <View
          centerX
          p={15}
          style={
            this.props.horizontal && this.props.rtl
              ? {
                transform: [
                  {
                    scale: -1
                  }
                ]
              }
              : noResultListHeight
                ? { height: noResultListHeight }
                : { height }
          }
        >
          <Text bold color={this.props.noResultsLabelColor}>
            {this.props.noResultsLabel || I18n.t("ui-noResultsFound")}
          </Text>
        </View>
      );
    }

    return null;
  };

  isCloseToBottom = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = 100; // Distance from the bottom you want it to trigger.

    if (this.props.horizontal) {
      return (
        layoutMeasurement.width + contentOffset.x >=
        contentSize.width - paddingToBottom
      );
    }
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  renderFlatListLoadingIndicator = () => {
    const { horizontal, rtl, staticData } = this.props;

    if (
      (this.page > this.pageCount && !this.loading) ||
      staticData ||
      this.state.errorLabel
    ) {
      return null;
    }

    return (
      <View center p={4} >
        <Indicator color={this.props.indicatorColor} size={12} />
      </View>
    );
  };

  renderFlatListItem = ({ item, index }) => {
    if (index == this.state.dataProvider._data.length) {
      return this.renderFlatListLoadingIndicator();
    }
    return React.cloneElement(this.props.rowRenderer(item), {
      addItemToList: this.addItemToList,
      updateItemInList: this.updateItemInList,
      removeItemFromList: this.removeItemFromList,
      style:
        this.props.horizontal && this.props.rtl
          ? {
            transform: [
              {
                scale: -1
              }
            ]
          }
          : {}
    });
  };

  onFlatListScroll = ({ nativeEvent }) => {
    if (this.props.horizontal) {
      const currentOffset = nativeEvent.contentOffset.x;
      const direction =
        currentOffset > this.currentFlatListScrollOffset ? "right" : "left";
      this.currentFlatListScrollOffset = currentOffset;
      if (this.props.onScroll) this.props.onScroll({ nativeEvent });
      if (direction === "left" || this.loading) return;
      if (this.isCloseToBottom(nativeEvent)) {
        if (this.page <= this.pageCount) {
          this.props.limitData ? null : this.fetch("loading");
        }
      }
    } else {
      const currentOffset = nativeEvent.contentOffset.y;
      const direction =
        currentOffset > this.currentFlatListScrollOffset ? "down" : "up";
      this.currentFlatListScrollOffset = currentOffset;

      if (this.props.onScroll) this.props.onScroll({ nativeEvent });

      if (direction === "up" || this.loading) return;

      if (this.isCloseToBottom(nativeEvent)) {
        if (this.page <= this.pageCount) {
          this.props.limitData ? null : this.fetch("loading");
        }
      }
    }
  };

  resetFlatListScroll = () => {
    if (this.flatList)
      this.flatList.scrollToIndex({ animated: true, index: 0 });
  };

  renderFlatList = props => (
    <FlatList
      ref={ref => (this.flatList = ref)}
      onContentSizeChange={this.props.onContentSizeChange}
      numColumns={this.props.columns}
      horizontal={this.props.horizontal}
      // removeClippedSubviews
      // getItemLayout={(data, index) => ({
      //   length: 70,
      //   offset: 70 * index,
      //   index,
      // })}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      initialNumToRender={27}
      maxToRenderPerBatch={30}
      contentContainerStyle={
        this.props.columns > 1
          ? {
            // flex: 1,
            flex: this.state.loading ? 1 : undefined,
            alignItems: this.state.loading ? 'center' : undefined,
            // flexDirection: this.props.rtl ? "row-reverse" : "row",
            // flexWrap: "wrap",
            justifyContent: this.state.loading ? "center" : "space-between"
          }
          : [paddingStyles(props),
          {
            // alignItems: this.state.loading ? 'center' : undefined,
            justifyContent: this.state.loading && this.props.horizontal? 'center' : 'space-around',
            flex: this.state.loading && this.props.horizontal ? 1 : undefined
          }]
      }
      data={[...this.state.dataProvider._data, {}]}
      keyExtractor={(item, index) => String(index)}
      renderItem={this.renderFlatListItem}
      onScroll={this.onFlatListScroll}
      scrollEventThrottle={1000}
      ListFooterComponent={this.renderFooter()}
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={() => {
            if (this.props.onRefresh) {
              this.props.onRefresh();
            }
            this.fetch("refreshing", true);
          }}
          colors={[getThemeColor(this.props.indicatorColor)]}
          tintColor={getThemeColor(this.props.indicatorColor)}
        />
      }
    />
  );



  render() {
    return (
      <NativeView
        style={[
          dimensionsStyles(this.props),
          backgroundColorStyles(this.props),
          marginStyles(this.props),
          // childrenLayoutStyles(this.props),
          {
            alignSelf: "stretch",
            paddingBottom: this.props.withBottomNav ? barHeight - 20 : 0,
            flex: this.props.height ? undefined : 1,
            transform:
              this.props.horizontal && this.props.rtl ? [{ scaleX: -1 }] : []
          },
          borderStyles(this.props)
        ]}
        onLayout={this.handleParentViewLayout}
      >
        {this.state.layoutReady && this.renderFlatList(this.props)}
      </NativeView>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl
});
export default connect(
  mapStateToProps,
  null,
  null,
  // { forwardRef: true }
)(List);
