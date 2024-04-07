import React, {useEffect, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import PhonePePaymentSDK from 'react-native-phonepe-pg';
import {MERCHANT_ID, SALT_KEY} from '@env';
import {ConvertJsonToBase64, ConvertToSHA256} from './utils';

function PhonePe(): React.JSX.Element {
  const [payment, setPayment] = useState<string>();
  const [message, setMessage] = useState<string | undefined>();

  const handleStartTransaction = () => {
    setMessage(undefined);
    const objJsonB64 = ConvertJsonToBase64({
      merchantId: MERCHANT_ID,
      merchantTransactionId: 'MMT',
      amount: payment,
      callbackUrl: 'https://webhook.site/callback-url',
      mobileNumber: '9999999999',
      paymentInstrument: {
        type: 'PAY_PAGE',
      },
    });
    const checkSum = ConvertToSHA256(`${objJsonB64}/pg/v1/pay${SALT_KEY}`);

    PhonePePaymentSDK.startTransaction(
      objJsonB64,
      `${checkSum}###1`,
      'org.reactjs.native.example.PhonePeDemo',
      'PhonePeDemo',
    )
      .then(a => {
        setMessage('PaymentInfo:' + JSON.stringify(a));
      })
      .catch(error => {
        setMessage('error:' + error.message);
      });
  };

  const initPhonePeSDK = () => {
    PhonePePaymentSDK.init('SANDBOX', MERCHANT_ID ?? '', SALT_KEY ?? '', true)
      .then(result => {
        setMessage('Message: SDK Initialization ->' + JSON.stringify(result));
      })
      .catch(error => {
        setMessage('error:' + error.message);
      });
  };

  useEffect(() => {
    initPhonePeSDK();
  }, []);

  const backgroundStyle = {
    paddingHorizontal: 10,
    paddingTop: 10,
  };

  return (
    <KeyboardAvoidingView behavior="padding">
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View>
          <Text>Phone Pe Demo</Text>
          {message && (
            <Text style={{color: 'white', fontSize: 10}}>{message}</Text>
          )}
          <View style={{paddingVertical: 50}}>
            <Text>{'Enter Amount to Generate Transaction (in paisa)'}</Text>
            <TextInput
              value={payment}
              editable={!!message}
              onChangeText={text => setPayment(text)}
              placeholder="Amount to pay in paisa"
              keyboardType="number-pad"
              style={style.TextInputPayment}
            />
          </View>
          <Pressable
            style={style.ButtonStyle}
            disabled={!message}
            onPress={() =>
              (payment ? Number(payment) > 0 : false)
                ? handleStartTransaction()
                : Alert.alert('Enter Valid Amount')
            }>
            <Text style={{fontSize: 15, color: 'white'}}>
              {'Start Transaction'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export const style = StyleSheet.create({
  TextInputPayment: {
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 5,
    paddingTop: 5,
  },
  ButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 40,
    backgroundColor: 'blue',
    elevation: 4,
  },
});

export default PhonePe;
