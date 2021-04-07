// ================== COMPONENTE RECUPERACIÓN ====================================================
//  Despliegue del componente recuperación de la app RCL
// ===============================================================================================

// Inicialización del evento al cargar la vista recolector
$$(document).on('page:init','.page[data-name="recolector"]' , function (e) {

    
 // Creación de elementos para el formulario
    const calendario  = app.calendar.create({
      inputEl: '#calendario'
    });

    const pickerDevice = app.picker.create({
      inputEl: '#picker',
      cols: [
        {
          textAlign: 'center',
          values: ['Álvaro Obregón', 'Azcapotzalco' , 'Benito Juárez', 'Coyoacán','Venustiano Carranza','Tlalpan','Xochimilco', 'Cuajimalpa', 'Cuauhtémoc', 'Gustavo A. Madero', 'Iztacalco', 'Iztapalapa', 'Magdalena Contreras', 'Miguel Hidalgo', 'Milpa Alta', 'Tláhuac']
        }
      ]
    });

    const pickerGenero = app.picker.create({
      inputEl: '#pickerGenero',
      cols: [
        {
          textAlign: 'center',
          values: ['Hombre', 'Mujer' , 'Prefiero no decirlo']
        }
      ]
    });

 // Pasa del cuadro input al siguiente al presinar enter
    $('.inputrecolectordp').keypress(function (e) {
      if (e.which === 13) {
          
          var index = $('.inputrecolectordp').index(this) + 1;
          console.log(index)
          console.log($('.inputrecolectordp'));
          $('.inputrecolectordp').eq(index).focus();

          if(index===$('.inputrecolectordp').length){
            // Keyboard.hide();
          }
      }
     });

     $('.inputrecolectord').keypress(function (e) {
      if (e.which === 13) {
          
          var index = $('.inputrecolectord').index(this) + 1;
          console.log(index)
          console.log($('.inputrecolectord'));
          $('.inputrecolectord').eq(index).focus();

          if(index===$('.inputrecolectord').length){
            // Keyboard.hide();
          }
      }
     });

     $('.inputrecolectordr').keypress(function (e) {
      if (e.which === 13) {
          
          var index = $('.inputrecolectordr').index(this) + 1;
          console.log(index)
          console.log($('.inputrecolectordr'));
          $('.inputrecolectordr').eq(index).focus();

          if(index===$('.inputrecolectordr').length){
            // Keyboard.hide();
          }
      }
     });

    // Formato de selección para el formulario de recolección

    var candadore1 = 0
    var candadore2 = 0
    var candadore3 = 0
    
    // Evento de paso a la página 2 del formulario
    // Validaciones para pasar a la siguiente parte del formulario
    $$('#next').on("click", function(){
    let edadnac = document.getElementById("calendario").value
    let fechactual = new Date()
    let edadnacf = edadnac.split("/");
    let edadnacform = new Date(edadnacf[2], edadnacf[1] - 1, edadnacf[0])
    let edadmili = fechactual - edadnacform
    let genero = document.getElementById("#pickerGenero");

      console.log(edadnac)
      console.log(edadnacform)
      console.log(edadnacf)
      console.log(edadmili)


       if (telefono.value !== "" && nombre.value !== "" && apellidos.value !=="" && edadnac !==""  && genero !==""){
         if( edadmili > 5.676e+11){
       app.tab.show('#tab2')
       const prueba = $$(".tab-link-highlight")
       prueba.attr('style', "width:50%; transform: translate3d(0%, 0px, 0px);")
       candadore1 = 1
         }else{
          var toastBottom = app.toast.create({
            text: 'Tiene que ser mayor de edad',
            closeTimeout: 2000,
          });
  
          toastBottom.open();
         }

       } else {
        var toastBottom = app.toast.create({
          text: 'Rellena todos los campos',
          closeTimeout: 2000,
        });

        toastBottom.open();
       }
       
     });

    // Evento de paso a la página 3 del formulario
    // Validaciones para pasar a la siguiente parte del formulario

     $$('#next21').on("click", function(){
      let alcaldia = document.getElementById("picker").value;
      let postal = document.getElementById("cp").value;

      if(calle.value !== "" && colonia.value !== "" && alcaldia !=="" && postal !==""){

        app.tab.show('#tab3')
        const prueba = $$(".tab-link-highlight");
      
        prueba.attr('style', "width:75%; transform: translate3d(0%, 0px, 0px);")
        candadore2=1

      }else{
           
        var toastBottom = app.toast.create({
          text: 'Rellena todos los campos',
          closeTimeout: 2000,
        });

        toastBottom.open();

      }

    });


    // Evento de paso a la página 4 del formulario
    // Validaciones para pasar a la siguiente parte del formulario
    $$('#next2').on("click", function(){
      let password = document.getElementById("contraseña").value;
      let passwordrep = document.getElementById("comprobacion").value;

      if(password !== "" && passwordrep !== "" && email.value !=="" && ocupacion.value !==""){
       if(password.length>8){
        if(password === passwordrep){
          app.tab.show('#tab4')
      const prueba = $$(".tab-link-highlight")
      
      prueba.attr('style', "width:100%; transform: translate3d(0%, 0px, 0px);")
      candadore3=1        
        }else{

          var toastBottom = app.toast.create({
            text: 'Las contraseñas deben de ser iguales',
            closeTimeout: 2000,
          });
  
          toastBottom.open();

        }
       }else{
        var toastBottom = app.toast.create({
          text: 'La contraseña debe ser mayor a 8 digitos',
          closeTimeout: 2000,
        });

        toastBottom.open();
       }


      }else{
        var toastBottom = app.toast.create({
          text: 'Rellena todos los campos',
          closeTimeout: 2000,
        });

        toastBottom.open();
      }

      
    });

    // Acceso a pasos anteriores a partir del candado

    $$('.paso2').on("click", function(){

      if(candadore1 === 1){
      app.tab.show('#tab2')
      const prueba = $$(".tab-link-highlight")
      
      prueba.attr('style', "width:50%; transform: translate3d(0%, 0px, 0px);")
      }else{

        var toastBottom = app.toast.create({
          text: 'Tiene que completar el paso 1',
          closeTimeout: 2000,
        });

        toastBottom.open();

      }
      
    })

    // Acceso a pasos anteriores a partir del candado

    $$('.paso3').on("click", function(){

      if(candadore2===1){

       app.tab.show('#tab3')
      const prueba = $$(".tab-link-highlight")
      
      prueba.attr('style', "width:75%; transform: translate3d(0%, 0px, 0px);")

      }else {
        var toastBottom = app.toast.create({
          text: 'Tienes que completar el paso 2',
          closeTimeout: 2000,
        });

        toastBottom.open();
      }
  
      
    });
   
    // Acceso a pasos anteriores a partir del candado
    $$('.paso4').on("click", function(){

      if(candadore3===1){
      app.tab.show('#tab4')
      const prueba = $$(".tab-link-highlight")
      
      prueba.attr('style', "width:100%; transform: translate3d(0%, 0px, 0px);")
      }else{
       
        var toastBottom = app.toast.create({
          text: 'Tienes que completar el paso 3',
          closeTimeout: 2000,
        });

        toastBottom.open();

      }

    })
   
   // Agregar foto de perfil
   $$("#agregaimagen").on("click", function(){
      console.log("Hola mundo")

        navigator.camera.getPicture(onSuccess, onFail, { 
        quality: 25,
        destinationType: Camera.DestinationType.FILE_URI,
        correctOrientation: true,
        mediaType: Camera.MediaType.ALLMEDIA
        
      });
    
    function onSuccess(imageURI) {
        var image = document.getElementById('fotoperfil');
        image.src = imageURI;
        imgperfil = imageURI
      }
    
    function onFail(message) {
        
    }

   });

  // Registro del Usuario con los datos registrados

  $$('.boton_fin').on('click',function(e){
         
       let cumpleaños = document.getElementById("calendario").value.trim();
       let email = document.getElementById("email").value.trim();
       let password = document.getElementById("contraseña").value.trim();
       let passwordrep = document.getElementById("comprobacion").value.trim();
       let nombre = document.getElementById("nombre").value.trim();
       let apellidos = document.getElementById("apellidos").value.trim();
       let telefono = document.getElementById("telefono").value.trim();
       let calle = document.getElementById("calle").value.trim();
       let colonia = document.getElementById("colonia").value.trim();
       let alcaldia = document.getElementById("picker").value.trim();
       let genero = document.getElementById("pickerGenero").value.trim();
       let postal = document.getElementById("cp").value.trim();
       let ocupacion = document.getElementById("ocupacion").value.trim();
       var imagenRe2 = getBase64Image(document.getElementById("fotoperfil")).trim();

       const datosUsuario = {
           cumpleaños,
           email,
           password,
           nombre,
           apellidos,
           telefono,
           calle,
           colonia,
           alcaldia,
           postal,
           ocupacion,
           genero
       }

    if (email !== "" && password !== "" && nombre !== "" && apellidos !== "" && telefono !== ""  && calle !== "" && colonia !== "" && alcaldia !== "" && postal !== "" && ocupacion !== "" ){
      

    if(passwordrep === password){
    app.preloader.show()

    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(cuenta){
     
      let message = 'data:image/png;base64,' + imagenRe2;

      storage.ref('usuarios/'+ cuenta.user.uid + '/profile.jpg').putString(message,'data_url')
      .then(auth =>{
        console.log('Perfil subido correctamente')
      }).catch(error =>{
        console.log(error.message);
        alert("Ocurrio un error al subir las imagenes a la base de datos")
      })


     let user = auth.currentUser;
      user.sendEmailVerification().then(function() {
        app.preloader.hide();
        DialogoRCL(datosUsuario);      
      }).catch(function(error) {
        alert("Ocurrio un error al mandar el correo de verificación")
      });

        
     })
     .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        app.preloader.hide();
        if(errorCode === "auth/weak-password"){

          var toastBottom = app.toast.create({
            text: 'La contraseña debe de ser mayor a 8 caracteres',
            closeTimeout: 2000,
          });

        } else if (errorCode === "auth/invalid-email") {

          var toastBottom = app.toast.create({
            text: 'Correo eléctronico inválido',
            closeTimeout: 2000,
          });

        } else if (errorCode === "auth/email-already-in-use") {

          var toastBottom = app.toast.create({
            text: 'Cuenta de correo ya ocupada',
            closeTimeout: 2000,
          });


        }
        // ...
        toastBottom.open();
      });


    }else{

      var toastBottom = app.toast.create({
        text: 'Las contraseñas deben ser iguales',
        closeTimeout: 2000,
      });

      toastBottom.open();

    }

    }else{
      var toastBottom = app.toast.create({
        text: 'Todos los campos son obligatorios',
        closeTimeout: 2000,
      });

      toastBottom.open();

    };
    
       


  });

    

  });