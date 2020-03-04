import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppScrollView, AppButton, showSuccess, showError } from "../../common";
import { AppHeader } from "../../components";
import I18n from "react-native-i18n";
import colors from '../../common/defaults/colors';
import { useSelector, useDispatch } from 'react-redux';
import Axios from 'axios';
import Map from './Map';
import { ActivityIndicator, Linking } from 'react-native';
import { refreshList } from '../../actions/list';


export default OrderDetails = props => {
  const [loading, setLoading] = useState(false);
  const [loadingDelivered, setLoadingDelivered] = useState(false);
  const [loadingReturned, setLoadingReturned] = useState(false);
  const [order, setOrder] = useState(null);
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.userData ? state.auth.userData.data.api_token : null)
  useEffect(() => {
    setLoading(true)
    Axios.get(`driverorderdetails?api_token=${token}&orderId=${props.orderID}`)
      .then((res) => {
        setOrder(res.data.data)
        setLoading(false)
      }).catch((error) => {
        setLoading(false)
        if (!error.response) {
          showError(I18n.t("ui-networkConnectionError"));
        } else {
          showError(I18n.t("ui-error-happened"));
        }
        return I18n.t("ui-networkConnectionError");
      })
  }
    , []);

  const OrderStatusUpdate = (id, status) => {
    Axios.post('driver/orderstatus/update',
      {
        api_token: token,
        orderId: id,
        orderStatus: status,
      })
      .then(async (res) => {
        showSuccess(res.data.message);
        setLoadingDelivered(false);
        setLoadingReturned(false);
        dispatch(refreshList(['refreshDeliveredOrderList']))
        AppNavigation.pop();
      })
      .catch((error) => {
        setLoadingDelivered(false);
        setLoadingReturned(false);
        if (!error.response) {
          showError(I18n.t("ui-networkConnectionError"));
        } else {
          showError(I18n.t("ui-error-happened"));
        }
      });
  }
  return (
    <AppView flex stretch>
      <AppHeader title={I18n.t('orderDetails')} transparent />
      {!order ?
        <AppView flex stretch center>
          <ActivityIndicator />
        </AppView>
        :
        <AppScrollView stretch>
          <AppView stretch height={35}>
            <Map destination={order.order_map_location} />
          </AppView>
          <AppView stretch flex paddingTop={10}>
            <Row label={I18n.t('OrderNumber')} value={order.order_id} marginBottom={10} />
            <RowDetails
              labelHeader={I18n.t('orderDetails')}
              data={[
                { label: I18n.t('address'), value: `${order.order_client_first_name} ${order.order_client_last_name}` },
                { label: I18n.t('address'), value: order.order_full_address },
                { label: I18n.t('signup-phone'), value: order.order_client_mobile },
                { label: I18n.t('paymentMethod'), value: order.payment_way }
              ]}
            />
            <Row label={I18n.t('The amount required')} value={order.order_final_total_after_delivery} real />
          </AppView>
          {order.status === 'Delivered' || order.status === 'تم التسليم' ||
            order.status === 'Returned' || order.status === 'تم الإرجاع' ?
            <AppButton
              title={order.status}
              flex
              stretch
              height={7}
              borderRadius={7}
              margin={5}
              backgroundColor="#23A636"
            />
            :
            <AppView spaceBetween stretch row paddingHorizontal={7}>
              <AppButton
                title={I18n.t('deliverOrder')}
                flex
                stretch
                height={7}
                borderRadius={7}
                backgroundColor="#23A636"
                processing={loadingDelivered}
                onPress={() => {
                  setLoadingDelivered(true)
                  OrderStatusUpdate(order.order_id, 'delivered ')
                }}
              />
              <AppView width={5} />
              <AppButton
                title={I18n.t('returneOrder')}
                flex
                stretch
                height={7}
                borderRadius={7}
                backgroundColor="#E3000F"
                processing={loadingReturned}
                onPress={() => {
                  setLoadingReturned(true)
                  OrderStatusUpdate(order.order_id, 'returned ')
                }}
              />
            </AppView>

          }
        </AppScrollView>
      }
    </AppView>
  );
}

const Row = props => (
  <AppView
    stretch
    height={7}
    elevation={1}
    marginTop={3}
    marginHorizontal={7}
    row
    spaceBetween
    centerY
    borderRadius={7}
    marginBottom={10}
    paddingHorizontal={7}
    borderWidth={0.5}
    {...props.rest}
  >
    <AppText bold> {props.label}</AppText>
    <AppView stretch row>
      <AppText color="foreground">{props.value}</AppText>
      {props.real && <AppText> {I18n.t('sar')} </AppText>}
    </AppView>
  </AppView>
);

const RowDetails = props => (
  <AppView
    stretch
    elevation={1}
    marginHorizontal={7}
    spaceBetween
    centerY
    borderWidth={0.5}
    borderRadius={7}
    paddingHorizontal={7}
    marginBottom={10}
    {...props.rest}
  >
    <AppText bold marginVertical={5} color="#4C4C4C">
      {props.labelHeader}
    </AppText>
    {props.data.map(item => (
      <AppView stretch row spaceBetween paddingBottom={5}>
        <AppText > {item.label}</AppText>
        <AppText color="#C9C9C9" numberOfLines={2}> {item.value}</AppText>
      </AppView>
    ))}
  </AppView>
);

