import { useEffect } from 'react';

const useFacebookSDK = (appId, version = 'v18.0') => {
    useEffect(() => {
        // Check if the Facebook SDK script is already added
        if (document.getElementById('facebook-jssdk')) {
            return;
        }

        // Function to initialize Facebook SDK
        window.fbAsyncInit = function () {
            FB.init({
                appId: appId, // Use the app ID from the parameter
                cookie: true,
                autoLogAppEvents : true,
                
                xfbml: true,
                version: version,
            });

           
        };

        // Load Facebook SDK
        (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0];
            
                if (d.getElementById(id)) {
                return;
            }
            
            js = d.createElement(s);
            js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js';
            fjs.parentNode.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    }, [appId, version]); // Dependency array ensures it's loaded only once
};

export default useFacebookSDK;
