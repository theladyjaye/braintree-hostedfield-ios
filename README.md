# HostedField iOS Embed

## Sandbox Tokenization Key
You will need a Sandbox Tokenization Key.
**From https://sandbox.braintreegateway.com/**

- Click the gear in the upper right
- select API
- Locate the Tokenization Keys section
- Copy an existing valid value or click the  `+ Generate New Tokenization Key`
  button and use the resulting generated key. It will be in the format
  of "sandbox_xxxxxxxx_xxxxxxxxxxxxxxxx"

## Setup
- From `HostedFieldUI/html` run `npm install`
- After successfully running `npm install` run `npm run build` from the same location (`HostedFieldUI/html`)
- You should now have a `HostedFieldUI/html/dist` folder. This folder will be copied
into the App resource bundle for loading the UI.


## Build the HTML
- From `HostedFieldUI/html` run `npm install`
- After successfully running `npm install` run `npm run build` from the same location (`HostedFieldUI/html`)
- You should now have a `HostedFieldUI/html/dist` folder. 

This folder will be copied into the App resource bundle for loading the UI.


## Verify In a Browser
With your Tokenization Key (See Above)
- Edit the file `HostedFieldUI/html/src/index.html`
- Locate the `<script>` element and uncomment the line that reads: 
```// var BRAINTREE_INIT_TOKEN = "sandbox_xxxxxxxx_xxxxxxxxxxxxxxxx"```

- Replace the value with your tokenization key
- From `HostedFieldUI/html` run `npm run start:dev`
- Open your browser to http://localhost:8000

**BE SURE YOU COMMENT OUT THIS VARIABLE WHEN YOU RUN IN THE APP**
**YOU WILL NEED TO RUN `npm run build` ONCE YOU COMMENT VAR AND ARE READY TO RUN IN THE APP**

## Run the iOS App

From `HostedFieldApp/HostedFieldApp/ViewController.swift` paste your
tokenization key obtained above into the value of: (~Line 27)

```
 let token = "sandbox_xxxxxxxx_xxxxxxxxxxxxxxxx"
```

Build and Run the app in the iOS Simulator or an iOS Device.

Once launched, open `Safari` and select `Develop -> {{ Simulator or Device Name }} -> {{ The WebView }}`
This will enable you to see the Web Inspector, specifically we are interested 
in the Network Inspector and the Console. 

Fill out the presented form in the app accordingly and press `Submit`.

The Web Inspector Console will reveal the error:
```
Unhandled Promise Rejection: SyntaxError: The string did not match the expected pattern.
```

But you will see in the Network Inspector that the request completed successfully.
