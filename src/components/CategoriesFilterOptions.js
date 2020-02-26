import React, { Component } from 'react';
import I18n from 'react-native-i18n';

import { AppView, SelectionOptionsGroup } from '../common';

import OptionButton from './optionButton/OptionButton';

class CategoriesFilterOptions extends Component {
  static defaultProps = {};

  render() {
    const {
      name,
      injectFormProps,
      initialValue,
      onSelect,
      categories,
      selected,
      ...rest
    } = this.props;

    return (
      <AppView row {...rest} stretch marginTop={5} >
        <SelectionOptionsGroup
          name={name}
          initialValue={initialValue}
          onSelect={onSelect}
          horizontal
          scrollable
          center
        >
          {categories.map((item, index) => {
            return (
              <OptionButton
                data={item}
                value={item.id}
                key={item.id}
                CategoriesFilter
                // marginHorizontal={3}
                selected={selected}
              />
            )
          })}
        </SelectionOptionsGroup>
      </AppView>
    );
  }
}

export default CategoriesFilterOptions;
