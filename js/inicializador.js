// ================== ARCHIVO INICIALIZADOR ======================================================
//  Inicializa las dependencias: Firebase, Cordova, Framework7 y el registro de push notifications
// ===============================================================================================

// Inicialización de Firebase
// Credenciales del proyecto en producción
let firebaseConfig = {
  apiKey: "AIzaSyCtiy4LhhjVX5ASPJZYpMxXypWJDM0OYS8",
  authDomain: "reciclatelo-u.firebaseapp.com",
  databaseURL: "https://reciclatelo-u.firebaseio.com",
  projectId: "reciclatelo-u",
  storageBucket: "reciclatelo-u.appspot.com",
  messagingSenderId: "971647364330",
  appId: "1:971647364330:web:9183c72627a795f252bb93"
};

// Credenciales de desarrollo
// let firebaseConfig = {
//   apiKey: "AIzaSyAfJHDRkbqH7S4vEx815B13Eeb-AO1Bvhs",
//   authDomain: "rcl-usuarios-desarrollo.firebaseapp.com",
//   databaseURL: "https://rcl-usuarios-desarrollo-default-rtdb.firebaseio.com",
//   projectId: "rcl-usuarios-desarrollo",
//   storageBucket: "rcl-usuarios-desarrollo.appspot.com",
//   messagingSenderId: "54252149932",
//   appId: "1:54252149932:web:51117237960bec7c049309"
// };

firebase.initializeApp(firebaseConfig);

// Inicialización de Cordova
// Constructor de la aplicación Cordova
let app2 = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app2.receivedEvent('deviceready');
    },
    receivedEvent: function(id) {
    }
};

// Inicialización de Framework7

let app = new Framework7({
    // App root element
    root: '#app',
    // Views
    view:{
      iosDynamicNavbar: false,
    },
    // App Name
    name: 'My App',
    // App id
    id: 'com.myapp',
    // Enable swipe panel
    panel: {
      swipe: 'right',
    },
    // Add default routes
    routes: [
      {
        path: '/index/',
        url: 'index.html',
      },
      {
        path: '/login-screen/',
        url: 'vistas/login.html',
      },
      {
        path: '/formulario/',
        url: 'vistas/Formulario.html',
      },
      {
        path: '/home/',
        url: 'vistas/HomeRec.html',
      },
      {
        path: '/exitoval/',
        url: 'vistas/exitoval.html',
      },
      {
        path: '/recuperacion/',
        url: 'vistas/Recuperacion.html',
      },
      {
        path: '/formularioRec/',
        url: 'vistas/FormularioRec.html',
      },
      {
        path: '/saliomal/',
        url: 'vistas/Saliomal.html',
      },
      {
        path: '/perfil/',
        url: 'vistas/perfil.html'
      },
      {
        path: '/informate/',
        url: 'vistas/Informate.html'
      },
      {
        path: '/promociones/',
        url: 'vistas/Promociones.html'
      },
      {
        path: '/registros/',
        url: 'vistas/Registros.html'
      },
      {
        path: '/validacion/',
        url: 'vistas/Validacion.html'
      },
      {
        path: '/biyuyos/',
        url: 'vistas/biyuyos.html'
      },
      {
        path: '/catalogo/',
        url: 'vistas/catalogo.html',
      },
      {
        path: '/cupones/',
        url: 'vistas/cupones.html'
      }
  
    ],
  });

  // Se inicializan las push notifications

  document.addEventListener('deviceready', function () {
    //Remove this method to stop OneSignal Debugging 
    window.plugins.OneSignal.setLogLevel({logLevel: 6, visualLevel: 0});
    
    var notificationOpenedCallback = function(jsonData) {
      // alert('notificationOpenedCallback: ' + JSON.stringify(jsonData));
    };
    // Set your iOS Settings
    var iosSettings = {};
    iosSettings["kOSSettingsKeyAutoPrompt"] = false;
    iosSettings["kOSSettingsKeyInAppLaunchURL"] = false;
    
    window.plugins.OneSignal
      .startInit("b1ee76ab-da33-442b-b325-8deb210f190d")
      .handleNotificationOpened(notificationOpenedCallback)
      .iOSSettings(iosSettings)
      .inFocusDisplaying(window.plugins.OneSignal.OSInFocusDisplayOption.Notification)
      .endInit();
    
    // The promptForPushNotificationsWithUserResponse function will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step 6)
    window.plugins.OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
      console.log("User accepted notifications: " + accepted);
    });
    
  }, false);
  


   