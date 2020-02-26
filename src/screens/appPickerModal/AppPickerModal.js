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
import RenderItem from './RenderItem';

class AppPickerModal extends Component {
  state = {
    searchText: '',
    data: this.props.data,
  };

  renderPickerData = () => (
    <FlatList
      style={{
        alignSelf: 'stretch',
      }}
      data={this.state.data}
      keyExtractor={(item, index) => String(index)}
      renderItem={({ item }) => {

        return (
          <RenderItem
            selected={item.label === this.props.label}
            item={item}
            onChange={this.props.onChange}
            componentId={this.props.componentId}
          />
          // <AppView
          //   stretch
          //   borderBottomColor="grey"
          //   borderBottomWidth={1}
          //   backgroundColor="#EEEEEE"
          //   row
          //   paddingHorizontal={10}
          // >
          //   {/* <AppRadioGroup
          //     onSelect={() => {
          //       this.props.onChange(item);
          //       Navigation.dismissModal(this.props.componentId);
          //     }}
          //   >
          //     <AppRadioButton
          //       key={item.label}
          //       value={item.label}
          //       label={item.label}
          //       touchableOpacity
          //       reverse
          //       stretch
          //     /> */}
          //   <AppView
          //     bc={this.state.selected ? 'grey' : '#ACB5BB'}
          //     bw={2}
          //     circle
          //     circleRadius={6}
          //     center
          //   >
          //     {this.state.selected && item.label ? (
          //       <AppView circle circleRadius={3} backgroundColor="primary" />
          //     ) : null}
          //   </AppView>
          //   <AppButton
          //     onPress={() => {
          //       this.setState({
          //         selected: true,
          //       });
          //       this.props.onChange(item);
          //       Navigation.dismissModal(this.props.componentId);
          //     }}
          //     center={false}
          //     title={item.label}
          //     stretch
          //     flex
          //     backgroundColor="transparent"
          //     height={7}
          //     color="#000"
          //     // paddingHorizontal={15}
          //     size={5.5}
          //     bold
          //   />

          // </AppView>
        );
      }}
    />
  );

  renderSearchInput = () => {
    const {} = this.props;
    return (
      <AppView
        stretch
        paddingHorizontal={5}
        paddingVertical={6}
        borderBottomWidth={0.1}
        elevation={2}
      >
        <AppInput
          picker
          stretch
          noValidation
          initialValue={this.state.searchText}
          onChange={text => {
            const filterData = this.props.data.filter(item =>
              item.label.toLowerCase().includes(text.toString().toLowerCase()),
            );

            this.setState({
              searchText: text,
              data: filterData,
            });
          }}
          placeholder={this.props.searchTitle}
          leftItems={[
            <AppIcon
              color="#8A8A8A"
              name={this.props.iconName}
              type={this.props.iconType}
              size={8}
              marginHorizontal={5}
              flip
            />,
          ]}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
          borderRadius={5}
          height={7}
          paddingHorizontal={5}
          backgroundColor="#EEEEEE"
        />
      </AppView>
    );
  };

  render() {
    const { title, hideSearch } = this.props;

    return (
      <AppView flex stretch>
        <AppPickerHeader showClose title={title} />
        {/* {!hideSearch && this.renderSearchInput()} */}
        {this.renderPickerData()}
      </AppView>
    );
  }
}

const mapStateToProps = state => ({
  rtl: state.lang.rtl,
});

const mapDispatchToProps = dispatch => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppPickerModal);
