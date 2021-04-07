// ================== ARCHIVO HELPERS ============================================================
//  Funciones auxiliadores que se ocupan dentro de los componentes
// ===============================================================================================

// Función que envia del Splash al Login
const showSplashScreen = function(){
    setTimeout(()=>{mainView.router.navigate('/login-screen/',{animate:true})},1000)
  }

// Crea de forma aleatoria el código de identificación de un Usuario
const ID = function () {
    return Math.random().toString(36).substr(2, 6);
  };

// Convierte un archivo imagen a URL para su subida al servidor Firebase
const getBase64Image = function(img){
    let canvas = document.createElement("canvas");
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    let dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

// Llama el plugin de la camara, guarda la foto y la coloca dentro de la app
const camarafoto = function(){
    console.log("Hola mundo")

    navigator.camera.getPicture(onSuccess, onFail, { quality: 20,
      destinationType: Camera.DestinationType.FILE_URI });
  
  function onSuccess(imageURI) {
      let image = document.getElementById('fotoperfilCO');
      image.src = imageURI;
      imgperfil = imageURI;
    }
  
  function onFail(message) {
  }

 };

 // Hace el registro y sube a la base de datos el registro de usuarios
 const DialogoRCL = function({nombre, apellidos, calle, colonia, postal, cumpleaños, telefono, ocupacion, alcaldia, email, password, genero }){
    app.dialog.create({
      title: '<img src="imagenes/RCL.LogoOficial2.png">',
      content: '<p class="Estilolet1">¡Gracias por registrarte!</p> <p class="Estilolet2">Verifica tu correo electrónico para terminar el proceso</p>',
      cssClass: 'estilocss',
      buttons: [
        {
          text: '<a id="botonregresa" href="/login-screen/">REGRESAR</a>',
          cssClass: 'botonlog',
          onClick:  function() {
            mainView.router.navigate('/login-screen/', { transition: 'f7-cover' }) }

        },
    
      ],
      verticalButtons: true,
      on: {
        opened: function(){

          let idusuario = ID().toUpperCase();
          const uidUsuario = auth.currentUser.uid;

          db.collection("usuarios").doc(uidUsuario).set({ 
          Nombre: nombre,
          Apellidos: apellidos,
          Calle: calle,
          Colonia: colonia,
          Postal: postal,
          Nacimiento: cumpleaños,
          telefono: telefono,
          Ocupacion: ocupacion,
          Alcaldia: alcaldia,
          Correo: email ,
          Contraseña: password ,
          Biyuyos: "0",
          BiyuyosUsados: "0",
          idusuario: idusuario,
          Genero: genero
         })
         .then(function(docRef) {
          console.log("Document written with ID: ", docRef);
          console.log("El documento fue escrito")
          firebase.auth().signOut().then(function(){
          });

           })
         .catch(function(error) {
           console.error("Hubo un error en el documento: ", error);
           console.log(error.code)
           console.log(error.message)
           console.log("No funciono esta vaina")
          });
         

        }
      }
    }).open();
  }

// Hace el procedimiento de búsqueda de productos en la base de datos y guarda

const escaner = function(){
    statusescaner = true
    statusinfo = true
    cordova.plugins.barcodeScanner.scan(
      function (result) {
  
        if(Object.keys(result.text).length === 0){
           
          return 
  
        }
  
        console.log(result.text)
  
        app.preloader.show()
        database.ref('/').orderByChild("codigobarras").equalTo(result.text).once('value', function(producto){
          
          if(producto.exists()){
  
            let Nombre
            let Marca
            let Contenido
            let CodigoBarras
            let Valor
            let claveproduc
            let IdRegistro
  
            producto.forEach(function(doc){
  
            Nombre = doc.val().Nombre
            Marca = doc.val().Marca
            Contenido = `${doc.val().Contenido} ${doc.val().Unidades}` 
            CodigoBarras = doc.val().codigobarras
            Valor = doc.val().valor
            claveproduc = doc.key
  
            console.log(doc.val())
        
          })
            
          let  Productosact = JSON.parse(localStorage.getItem("Productos"))
          console.log(Productosact)
        
            if(Productosact === null){
              console.log("Hola mundo")
              Productosact = []
              
            } 

         IdRegistro = Productosact.length;   
    
           storage.ref('productos/'+claveproduc+'/imagen.png').getDownloadURL()
        .then(function(url){
  
            let MiObjeto = { 'Nombre': Nombre, 'Marca': Marca, 'Contenido': Contenido, 'CodigoBarras': CodigoBarras,'Valor': Valor, 'url': url, 'IdRegistro':IdRegistro}
            console.log(MiObjeto)
  
            Productosact.push(MiObjeto)
        
            localStorage.setItem('Productos',JSON.stringify(Productosact))
            console.log(MiObjeto)
            app.preloader.hide()
            mainView.router.navigate('/registros/', { transition: 'f7-fade', reloadCurrent:true })
  
        }).catch(function(err){
                 
          let MiObjeto = { 'Nombre': Nombre, 'Marca': Marca, 'Contenido': Contenido, 'CodigoBarras': CodigoBarras,'Valor': Valor, 'url': "imagenes/RCLHojita.png", 'IdRegistro':IdRegistro}
            console.log(MiObjeto)
  
            Productosact.push(MiObjeto)
        
            localStorage.setItem('Productos',JSON.stringify(Productosact))
            console.log(MiObjeto)
            app.preloader.hide()
            mainView.router.navigate('/registros/', { transition: 'f7-fade', reloadCurrent:true })
  
        })
  
        
            
        
          } else {
  
            app.preloader.hide()
  
  
            mainView.router.navigate('/saliomal/', { transition: 'f7-fade' })
  
          }
  
        })
  
      },
      function (error) {
          
      },
      {
          preferFrontCamera : false, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt : "Coloca el código de barras dentro del área", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "UPC_A,UPC_E,EAN_13,EAN_8", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS and Android
      }
   );
  
  }

//// Validación de los productos con el códigoQR y método camiones

const validaQRCamiones = function(){

    cordova.plugins.barcodeScanner.scan(
      function (result) {
    
        if(Object.keys(result.text).length === 0){  
          return 
        }
  
        console.log(result.text)
  
      let idcamion = result.text
      var usuario = firebase.auth().currentUser;
      let producregistr = JSON.parse(localStorage.getItem("Productos"))
      let conteo = document.getElementsByClassName("prodregistrados")
      let biyuyosvalidados = parseInt(localStorage.getItem('Biyuyos'))
      let biyuyosregistrados = parseInt(localStorage.getItem('biyuyosreg'))
      let nuevosbiyuyos = biyuyosvalidados + biyuyosregistrados 
      app.preloader.show()
  
      console.log(idcamion)
  
      db.collection("Camiones").doc(result.text)
      .get()
      .then(function(doc){
         
        console.log(doc.exists)
  
        if(doc.exists){
  
        db.collection("usuarios")
         .doc(usuario.uid).update({
           Biyuyos: nuevosbiyuyos
         })
  
      producregistr.forEach(function(producto){
          
          
          console.log(producto)
               
          db.collection("usuarios")
         .doc(usuario.uid)
         .collection('validados')
         .add({
             
          CodigoBarras: producto.CodigoBarras,
          Contenido: producto.Contenido,
          Marca: producto.Marca,
          Nombre: producto.Nombre,
          Valor: producto.Valor,
          fecha: Date.now(),
          idusuario: usuario.uid,
          IdRecolector: doc.id,
          url:producto.url
          
           
         }
          )
         .then(function(){
  
          app.preloader.hide()
         
          mainView.router.navigate('/exitoval/', { transition: 'f7-fade' })
          localStorage.removeItem("Productos")
  
         })
           
         }); 
             
        
        }else{
  
          app.preloader.hide()
  
        var toastBottom = app.toast.create({
          text: 'Código QR no válido',
          closeTimeout: 2000,
        }).open();
  
        }
  
        
  
      }).catch(function(error){
  
        console.log(error)
  
        app.preloader.hide()
  
        var toastBottom = app.toast.create({
          text: 'Error inesperado, contactar con equipo RCL',
          closeTimeout: 2000,
        }).open();
      })
         
       
    
      },
      function (error) {
          alert("El escaner- falló: " + error);
      },
      {
          preferFrontCamera : false, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt : "Coloca el código QR del camión en el centro", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS and Android
      }
   );
  
  }

// Validación de los productos de forma tradicional con código recolectores
const validaQR = function(){
    statusescaner = true
    cordova.plugins.barcodeScanner.scan(
      function (result) {
  
        if(Object.keys(result.text).length === 0){
           
          return 
  
        }
  
        console.log(result.text)
  
      let codigovalidacion = result.text
      let id = localStorage.getItem("idusuario")
      var usuario = firebase.auth().currentUser;
      let producregistr = JSON.parse(localStorage.getItem("Productos"))
      
      
  
      if (id !== null ){
  
  
        let conteo = document.getElementsByClassName("prodregistrados")
        let numerodeprod = conteo.length
        console.log(numerodeprod)
  
        conta = 0;
        idarray = id.split("");
        idarray.forEach(element => {
          console.log(element);
          if( !isNaN(element)){
              idarray[conta]=parseFloat(element)
              console.log(element);
          }
        conta=conta+1
        })
  
      console.log(idarray)
      console.log(id)
  
     let codigodevalcom = AV_V3(idarray,numerodeprod)
  
     let codigorealval = codigovalidacion.slice(0,-4)
  
     console.log(codigodevalcom)
     console.log(codigorealval)
  
      if (codigodevalcom === codigorealval){
          
        let recolectornum = codigovalidacion.slice(7)
         let calidadmaterial = codigovalidacion.slice(6,-3) 
         let biyuyosvalidados = parseInt(localStorage.getItem('Biyuyos'))
         let biyuyosregistrados = parseInt(localStorage.getItem('biyuyosreg'))
         let nuevosbiyuyos = biyuyosvalidados + biyuyosregistrados 
  
         console.log(nuevosbiyuyos)
         console.log(biyuyosregistrados)
         console.log(biyuyosvalidados)
  
         app.preloader.show()
  
        db.collection("usuarios")
         .doc(usuario.uid).update({
           Biyuyos: nuevosbiyuyos
         })
              
         producregistr.forEach(function(producto){
          
          console.log(producto)
               
          db.collection("usuarios")
         .doc(usuario.uid)
         .collection('validados')
         .add({
             
          CodigoBarras: producto.CodigoBarras,
          Contenido: producto.Contenido,
          Marca: producto.Marca,
          Nombre: producto.Nombre,
          Valor: producto.Valor,
          fecha: Date.now(),
          idusuario: usuario.uid,
          IdRecolector: recolectornum,
          calidad: calidadmaterial,
          url: producto.url
           
         }
          )
         .then(function(){
  
          app.preloader.hide()
         
          mainView.router.navigate('/exitoval/', { transition: 'f7-fade' })
          localStorage.removeItem("Productos")
  
         })
           
         }); 
  
         
          
      } else {
         alert("Hubo un problema con el código, intenta porfavor con el alfanúmerico")
      }
  
      }else {
  
       
       alert("Hay un problema con tu ID, consulta al equipo RCL porfavor")
  
      }
       
          
       
  
      },
      function (error) {
          alert("El escaner- falló: " + error);
      },
      {
          preferFrontCamera : false, // iOS and Android
          showFlipCameraButton : true, // iOS and Android
          showTorchButton : true, // iOS and Android
          torchOn: false, // Android, launch with the torch switched on (if available)
          saveHistory: true, // Android, save scan history (default false)
          prompt : "Coloca el código QR de tu recolector en el centro", // Android
          resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
          formats : "QR_CODE", // default: all but PDF_417 and RSS_EXPANDED
          orientation : "portrait", // Android only (portrait|landscape), default unset so it rotates with the device
          disableAnimations : true, // iOS
          disableSuccessBeep: false // iOS and Android
      }
   );
  
  }

  // Función que saca de la app si el usuario lo indica
  const onConfirm = function(button) {
    if(button==2){//If User selected No, then we just do nothing
        return;
    }else{
        navigator.app.exitApp();// Otherwise we quit the app.
    }
  }

  // Checar conexión  de internet

  const checkConnection = function(){
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';
  
    return states[networkState]
  }

  // Indicar de conexión

const onOffline = function(){
    var toastBottom = app.toast.create({
      text: 'Sin conexión a internet',
      closeTimeout: 2000,
    });

    toastBottom.open();
  }

  // Función que baja información sobre la cantiadad de biuyos del usuario

  const obtenerBiyuyos = function(){
   
   var usuario = auth.currentUser;
   let biyuyos 

  db.collection("usuarios")
       .doc(usuario.uid)
       .get().then(function(doc){
         biyuyos = doc.data().Biyuyos
         localStorage.setItem("Biyuyos",biyuyos)
       }).then(function(){
         console.log(biyuyos)
         $('.biyuyosvalcan').text(`${biyuyos} BIYUYOS CANJEABLES`)
       })
  }


