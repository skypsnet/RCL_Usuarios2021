
// ================== COMPONENTE LOGIN ============================================================
//  Despliegue del componente login de la app RCL
// ===============================================================================================

// Inicialización del evento al cargar la vista login-screen
$$(document).on('page:init', '.page[data-name="login-screen"]', function(e){


// Evento click que busca en la DB la existencia del registro y permite login    
    $$("#login").on('click',function(e){

        // Definición de variables y constantes necesarias
        let emaillogin = document.getElementById("mailRCL").value.trim();
        let passwordlogin = document.getElementById("passwordRCL").value.trim();

        app.preloader.show();

        // Llamada de API para credenciales de acceso
        auth.signInWithEmailAndPassword(emaillogin, passwordlogin)
        .then(function(acceso){

        const user = auth.currentUser;

        // Verificación de confirmación de correo eléctronico

            if(!acceso.user.emailVerified){
  
              console.log("El usuario actual es: " + user)
              user.sendEmailVerification()
  
              let toastBottom = app.toast.create({
                text: 'Cuenta no validada, se volvio a enviar un correo de verificación',
                closeTimeout: 2000,
              });
  
              app.preloader.hide();
              toastBottom.open();
              firebase.auth().signOut().then(function(){
                console.log("Usuario cerrado")
              });

            }else{
              localStorage.setItem('userve', 'Tom');
              console.log(acceso)
              // Se llama a la base de datos para obtener toda la información
              db.collection("usuarios").doc(acceso.user.uid).get()
              .then(function(doc) {
            
              // Se guarda la información en el localStorage

              localStorage.setItem('Biyuyos',doc.data().Biyuyos)
              localStorage.setItem("Alcaldia",doc.data().Alcaldia)
              localStorage.setItem("Apellidos",doc.data().Apellidos)
              localStorage.setItem("Calle",doc.data().Calle)
              localStorage.setItem("Colonia",doc.data().Colonia)
              localStorage.setItem("Correo",doc.data().Correo)
              localStorage.setItem("Nacimiento",doc.data().Nacimiento)
              localStorage.setItem("Nombre",doc.data().Nombre)
              localStorage.setItem("Postal",doc.data().Postal)
              localStorage.setItem("telefono",doc.data().telefono)
              localStorage.setItem('idusuario',doc.data().idusuario)
              localStorage.setItem('BiyuyosUsados',doc.data().BiyuyosUsados)
  
              app.preloader.hide();
              // Se navega hacia la vista home
              mainView.router.navigate('/home/',{
                animate:true,
              });
  
              let nombreperfil = document.getElementById("nombrehome");
              nombreperfil.innerHTML = `${localStorage.getItem("Nombre")}`
           })
          .catch(function(error) {
            console.log("existe un error", error);
            app.preloader.hide();
           });
              
              
            }
            
        })
        .catch(function(error) {
            // Manejo de errores en la autenticación
            var errorCode = error.code;
            var errormail = "auth/invalid-email"
            var errorausencia = 'auth/user-not-found'
            var errorcontraseña = "auth/wrong-password"
          
            if (errorCode === errormail){
              app.preloader.hide();
              var toastBottom = app.toast.create({
                text: 'Correo eléctronico inválido',
                closeTimeout: 2000,
              });
  
            } else if (errorCode === errorausencia){
              app.preloader.hide();
              var toastBottom = app.toast.create({
                text: 'Usuario no encontrado',
                closeTimeout: 2000,
              });
  
            } else if (errorCode === errorcontraseña){
              app.preloader.hide();
              var toastBottom = app.toast.create({
                text: 'Contraseña incorrecta',
                closeTimeout: 2000,
              });
  
            } else if (errorCode === "auth/network-request-failed"){
              app.preloader.hide();
              var toastBottom = app.toast.create({
                text: 'No hay conexión de internet',
                closeTimeout: 2000,
              });
            }
  
            toastBottom.open()
            
            console.log(errorCode);

          });
    }); 


    // Registro del evento backbutton para usuarios no autenticados

    if(contadorpagina1===0){

        document.addEventListener("offline", onOffline, false);
    
        function onOffline() {
          var toastBottom = app.toast.create({
            text: 'Sin conexión a internet',
            closeTimeout: 2000,
          });
      
          toastBottom.open();
        }
           
        document.addEventListener("online", onOnline, false);
    
        function onOnline() {
          var toastBottom = app.toast.create({
            text: 'Conexión reestablecida',
            closeTimeout: 2000,
          });
      
          toastBottom.open();
        }
    
    
        function onDeviceReady() {
         // Register the event listener
         document.addEventListener("backbutton", onBackKeyDown, false);
         // document.addEventListener("keydown",function(e){
         //     e.preventDefault()
         //     app.dialog.alert('prueba');               
         // },false);
         console.log("Ya se registro el evento escuchador")
         
       }
       
       function onBackKeyDown(e) {
         // if (e.which === 97){
         var user = firebase.auth().currentUser;
         if(user){
          console.log("Usuario autenticado") 
          return false 
       
         }else{
           console.log("Usuario no autenticado")
           console.log(user)
    
            if( $$('.modal-in').length > 0){
              e.preventDefault()
              app.popup.close('.popup');    
    
            } else { 
             
       
             if( mainView.router.currentRoute.url !== "/login-screen/" ){
             e.preventDefault();
             mainView.router.back();
             } else {
              e.preventDefault();     
              navigator.notification.confirm("¿Seguro que quieres salir?", onConfirm, "Confirmacion", "Si, No"); 
              console.log("Bye Bye")
       
             }
       
             
       
       
             } 
           
            return false
         }
       
       
       }
       
       document.addEventListener('deviceReady',onDeviceReady,false);
       
       
       }
       
       console.log("Todo OK")
       
       contadorpagina1=contadorpagina1+1;
       console.log(`El numero de veces que se ha inicializadoes: ${contadorpagina1}`)

});