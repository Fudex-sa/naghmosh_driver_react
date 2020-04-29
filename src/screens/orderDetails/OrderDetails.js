import React, { useState, useEffect } from 'react';
import { AppNavigation, AppView, AppText, AppScrollView, AppButton, showSuccess, showError, AppSpinner } from "../../common";
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
  const token = useSelector(state => state.auth.userData ? state.auth.userData.data.api_token : null);
  const [bg, setbg] = useState(colors.black);
  const [statusColor, setStatusColor] = useState(colors.primary);
  useEffect(() => {
    setLoading(true)
    Axios.get(`driverorderdetails?api_token=${token}&orderId=${props.orderID}`)
      .then((res) => {
        setOrder(res.data.data)
        const status = res.data.data.status;
        if (status === 'Returned' || status === 'تم الإرجاع') {
          setbg(colors.error);
          setStatusColor(colors.white)
        }
        if (status === "انتهى" || status === 'Done') {
          setbg(colors.black);
          setStatusColor(colors.primary)
        }
        if (status === 'تم التسليم' || status === 'Delivered') {
          setbg("#B4E3FF")
          setStatusColor("#047AC0")
        }
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

  const OrderStatusUpdate = (id, status, paymentWay = null) => {
    let values = {
      api_token: token,
      orderId: id,
      orderStatus: status,
      collectMethod: paymentWay,
    };
    if (values.collectMethod === null) { delete values.collectMethod }
    Axios.post('driver/orderstatus/update', values)
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
          <AppSpinner />
        </AppView>
        :
        <AppScrollView stretch>
          <AppView stretch height={35}>
            <Map destination={order.order_map_location} order={order} />
          </AppView>
          <AppView stretch flex paddingTop={5}>
            <Row label={I18n.t('OrderNumber')} value={order.order_id} />
            <RowDetails
              labelHeader={I18n.t('orderDetails')}
              data={
                order.status === 'Returned' || order.status === 'تم الإرجاع'
                  || order.status === 'Shipped' || order.status === 'تم الشحن' ?
                  [
                    { label: I18n.t('clientName'), value: `${order.order_client_first_name} ${order.order_client_last_name}` },
                    { label: I18n.t('address'), value: order.order_full_address },
                    { label: I18n.t('signup-phone'), value: order.order_client_mobile },
                    { label: I18n.t('paymentMethod'), value: order.payment_way }
                  ]
                  :
                  [
                    { label: I18n.t('clientName'), value: `${order.order_client_first_name} ${order.order_client_last_name}` },
                    { label: I18n.t('address'), value: order.order_full_address },
                    { label: I18n.t('signup-phone'), value: order.order_client_mobile },
                    { label: I18n.t('paymentMethod'), value: order.payment_way },
                    { label: I18n.t('totalCommission'), value: order.order_driver_commission }
                  ]
              }
            />
            <Row label={I18n.t('The amount required')} value={order.order_final_total_after_delivery} real />
          </AppView>
          {order.status === 'Shipped' || order.status === 'تم الشحن' ?
            <AppView spaceBetween stretch row paddingHorizontal={7} marginTop={5}>
              <AppButton
                title={I18n.t('deliverOrder')}
                flex
                stretch
                height={7}
                borderRadius={7}
                color={colors.black}
                processing={loadingDelivered}
                onPress={() => {
                  if (order.order_payment_id === 2) {
                    setLoadingDelivered(true)
                    OrderStatusUpdate(order.order_id, 'delivered ')
                  }
                  else {
                    AppNavigation.push({
                      name: 'PaymentWay',
                      passProps: {
                        onDone: (paymentWay) => {
                          setLoadingDelivered(true)
                          OrderStatusUpdate(order.order_id, 'delivered ', paymentWay)
                        }
                      }
                    })
                  }
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
            :
            <AppView
              flex
              stretch
              center
              height={7}
              borderRadius={7}
              margin={5}
              backgroundColor={bg}
            >
              <AppText color={statusColor} stretch center bold>{order.status}</AppText>
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
    paddingHorizontal={7}
    borderWidth={0.5}
    {...props.rest}
  >
    <AppText bold> {props.label}</AppText>
    <AppText color={colors.primary}>{`${props.value}  ${I18n.t('sar')}`}</AppText>
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
    marginVertical={5}
    paddingBottom={5}
    {...props.rest}
  >
    <AppText bold marginVertical={5} color={colors.black}>
      {props.labelHeader}
    </AppText>
    {props.data.map((item, index) => (
      <AppView stretch row spaceBetween
        // borderTopWidth={0.7} borderColor={'gray'}
        key={index}>
        <AppView flex={1} padding={2} stretch >
          <AppText > {item.label}</AppText>
        </AppView>
        <AppView padding={2} flex={2.5} stretch>
          <AppText color={colors.darkgrey} numberOfLines={index === 1 ? 2 : undefined}> {item.value}</AppText>
        </AppView>
      </AppView>
    ))}
  </AppView>
);

