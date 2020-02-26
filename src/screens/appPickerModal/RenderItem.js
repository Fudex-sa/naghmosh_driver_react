import React, { Component } from 'react';
import { Keyboard, FlatList } from 'react-native';
import { connect } from 'react-redux';

import { Navigation } from 'react-native-navigation';
import {
  AppView,
  AppIcon,
  AppButton,
  AppInput,
  AppRadioButton,
  AppRadioGroup,
} from '../../common';
import AppPickerHeader from './AppPickerHeader';

class RenderItem extends Component {
  renderPickerData = () => (
    <AppView
      stretch
      borderBottomColor="grey"
      borderBottomWidth={0.5}
      backgroundColor="#EEEEEE"
      row
      paddingHorizontal={10}
      onPress={() => {
        this.props.onChange(this.props.item);
        Navigation.dismissModal(this.props.componentId);
      }}
    >
      <AppView
        bc={this.props.selected ? 'grey' : '#ACB5BB'}
        bw={2}
        circle
        circleRadius={6}
        center
      >
        {this.props.selected ? (
          <AppView circle circleRadius={3} backgroundColor="primary" />
        ) : null}
      </AppView>
      <AppButton
        onPress={() => {
          // this.setState({
          //   selected: true,
          // });
          this.props.onChange(this.props.item);
          Navigation.dismissModal(this.props.componentId);
        }}
        center={false}
        title={this.props.item.label}
        stretch
        flex
        backgroundColor="transparent"
        height={7}
        color="#6A6A6A"
        // paddingHorizontal={15}
        size={5.5}
        bold
      />
      {/* </AppRadioGroup> */}
    </AppView>
  );

  render() {
    return <>{this.renderPickerData()}</>;
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RenderItem);
