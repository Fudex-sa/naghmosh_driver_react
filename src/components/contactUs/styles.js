import { StyleSheet } from 'react-native';

import Colors from '../../common/defaults/colors';

import Fonts from '../../common/defaults/fonts';
import {
  responsiveWidth,
  responsiveHeight,
  moderateScale,
} from '../../common/utils/responsiveDimensions';

export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
  }
})