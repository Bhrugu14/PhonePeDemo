# PhonePe SDK Demo

### Development Steps for payment

Init Method (Initialization of SDK)
here environmentsForSDK are SANDBOX, PRODUCTION
appId is salt key

```sh
 PhonePePaymentSDK.init(environmentForSDK,merchantId,appId,isDebuggingEnabled)
    .then(result => {// handle promise})
```

transactionContext is base64encoded cart details which will be unique for each merchant.

```sh
{
	"orderContext": {
		"trackingInfo": {
			"type": "HTTPS",
			"url": "https://google.com"
		}
	},
	"fareDetails": {
		"totalAmount": 3900,
		"payableAmount": 3900
	},
	"cartDetails": {
		"cartItems": [{
			"category": "SHOPPING",
			"itemId": "1234567890",
			"price": 3900,
			"itemName": "TEST",
			"quantity": 1
		}]
	}
}
```

The base 64 encoded value will be :

```sh
ewoJIm9yZGVyQ29udGV4dCI6IHsKCQkidHJhY2tpbmdJbmZvIjogewoJCQkidHlwZSI6ICJIVFRQUyIsCgkJCSJ1cmwiOiAiaHR0cHM6Ly9nb29nbGUuY29tIgoJCX0KCX0sCgkiZmFyZURldGFpbHMiOiB7CgkJInRvdGFsQW1vdW50IjogMzkwMCwKCQkicGF5YWJsZUFtb3VudCI6IDM5MDAKCX0sCgkiY2FydERldGFpbHMiOiB7CgkJImNhcnRJdGVtcyI6IFt7CgkJCSJjYXRlZ29yeSI6ICJTSE9QUElORyIsCgkJCSJpdGVtSWQiOiAiMTIzNDU2Nzg5MCIsCgkJCSJwcmljZSI6IDM5MDAsCgkJCSJpdGVtTmFtZSI6ICJURVNUIiwKCQkJInF1YW50aXR5IjogMQoJCX1dCgl9Cn0=
```

Base64 encode request body. The body contains the parameters as given below

```sh
{
      merchantId: 'PGTESTPAYUAT',
      merchantTransactionId: 'MMT',
      amount: 100, //in paisa
      callbackUrl: 'https://webhook.site/callback-url',
      mobileNumber: '9999999999',
      paymentInstrument: {
        type: 'PAY_PAGE',
      },
}
```

after converting it to base64 we can send it as requestBody

Calculate X-Verify / checkSum
SHA256(base64 encoded payload + "/v3/transaction/sdk-less/initiate" + salt key) + '###' + salt index

Start Transaction API

```sh
PhonePePaymentSDK.startTransaction(body, checkSum, packageName, appSchema)
    .then( a => { console.log(a) })
```

## Imortant Links

PhonePe React Native SDK [link](https://developer.phonepe.com/v1/docs/react-native-sdk-integration-standard/)
PhonePe Payment Flow [link](https://developer.phonepe.com/v4/docs/step/)
PhonePe PayApi [link](https://developer.phonepe.com/v1/reference/pay-api-1/)
PhonePe UAT Testing [link](https://developer.phonepe.com/v1/docs/uat-testing/)
