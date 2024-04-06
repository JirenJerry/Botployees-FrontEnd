
// Load the JavaScript SDK asynchronously


// Facebook Login with JavaScript SDK
function launchWhatsAppSignup() {
    // Conversion tracking code
   
    //fbq && fbq('trackCustom', 'WhatsAppOnboardingStart', { appId: '1551154382287367', feature: 'whatsapp_embedded_signup' });

    // Launch Facebook login
    FB.login(function (response) {
        if (response.authResponse) {
            const accessToken = response.authResponse.accessToken;
            //Use this token to call the debug_token API and get the shared WABA's ID
            console.log(accessToken)
        } else {
            console.log('User cancelled login or did not fully authorize.');
        }
    }, {
        scope: 'whatsapp_business_management, whatsapp_business_messaging',
        extras: {
            feature: 'whatsapp_embedded_signup',
            "version": 2,
            setup: {

            }
        }
    });
}


let retryCount = 0;

function waitForFBQ(callback) {
    // check for the generic script
    // easiest check to prevent race condition
    if (window.fbq && window.fbq.version) {
        callback();
    } else {
        retryCount += 1;
        if (retryCount < 10) {
            console.log('Retrying')
            setTimeout(waitForFBQ.bind(null, callback), 1000);
        }
    }
}

waitForFBQ(() => { console.log('Done') })

