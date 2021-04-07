// ================== COMPONENTE PERFIL ====================================================
//  Despliegue del componente perfil de la app RCL
// ===============================================================================================

// Inicialización del evento al cargar la vista perfil
$$(document).on('page:init','.page[data-name="perfil"]',function (e){
  
    let perfilimagen2 = document.getElementById("fotoperfil2");
    const user = auth.currentUser;
    const nombre=document.getElementById('perfilnombre');
    const telefono=document.getElementById('perfiltelefono');
    const fecha=document.getElementById('perfilfecha');
    const ruta=document.getElementById('perfilruta');
    const correo=document.getElementById('perfilcorreo');
    const direccion=document.getElementById('perfildireccion');
    const ref = db.collection("usuarios").doc(user.uid);

    console.log(perfilimagen2);
  
// Baja la imagen de perfil del storage y la manipula DOM
    storage.ref('usuarios/'+ user.uid + '/profile.jpg').getDownloadURL().then(imgUrl => {
      
         perfilimagen2.src=imgUrl      
         perfilimagen2.style.width="100px"
  
         user.updateProfile({
          photoURL: imgUrl
        }).then(function(){
          console.log("Actualización realizada")
        }).catch(function(e){
          // console.log(e.code);
          console.log(e);       
        });
  
    });
  
 // Realiza el cambio de la imagen de perfil y actualiza la nube
    $$('#file2').on('change',function chooseFile(e){
      let img = document.getElementById("fotoperfil2");
       file = e.target.files[0];
       urlfile = URL.createObjectURL(e.target.files[0]);
       img.src = urlfile
       img.style.width = "100px";
       img.style.borderRadius="100%";
  
       app.preloader.show();
       storage.ref('usuarios/'+ user.uid + '/profile.jpg').put(file)
          .then(auth =>{
            app.preloader.hide();
            console.log('Perfil actualizado correctamente')
          }).catch(error =>{
            console.log(error.message);
          })
       
    });

// Se despliegue la info del usuario de su perfil

    direccion.innerHTML = `Dirección: ${localStorage.getItem("Calle")}, ${localStorage.getItem("Colonia")}  <br>
            Alcaldía: ${localStorage.getItem("Alcaldia")}<br>
            C.P: ${localStorage.getItem("Postal")}`
    nombre.innerHTML= `${localStorage.getItem("Nombre")}`; 
    telefono.innerHTML= `Teléfono: ${localStorage.getItem("telefono")}`; 
    fecha.innerHTML= `${localStorage.getItem("Nacimiento")}`;     
    ruta.innerHTML= `ID de Usuario: ${localStorage.getItem("idusuario")}`;
    correo.innerHTML= `Correo: ${localStorage.getItem("Correo")}`; 

// Se despliegua la info de cambio de datos de perfil

    document.getElementById('nombrepe').value = localStorage.getItem("Nombre");
    document.getElementById("apellidospe").value = localStorage.getItem("Apellidos");
    document.getElementById('telefonope').value = localStorage.getItem("telefono");
    document.getElementById('calendariope').value = localStorage.getItem("Nacimiento");
    document.getElementById('emailpe').value = localStorage.getItem("Correo");
    document.getElementById('callepe').value = localStorage.getItem("Calle");
    document.getElementById('coloniape').value = localStorage.getItem("Colonia");
    document.getElementById('pickerpe').value = localStorage.getItem("Alcaldia");
    document.getElementById('cppe').value = localStorage.getItem("Postal");

// Se cambia de modo para mostrar modificación de usuario perfil, así como lógica de modificación de datos

$$("#cambiarinfo").on("click",function(){
                
    document.getElementById("bodyperfil").style.display = "none"
    document.getElementById("cambioinfo").style.display = "block"
    document.getElementById("cambiarinfo").style.display = "none"

  })

  $$("#regresarinfo").on("click",function(){

    document.getElementById("cambioinfo").style.display = "none"      
    document.getElementById("bodyperfil").style.display = "block"
    document.getElementById("cambiarinfo").style.display = "block"

  })

  $$("#savechanges").on("click",function(){

    const nombre2=document.getElementById('nombrepe').value.trim();
    const apellidos = document.getElementById("apellidospe").value.trim();
    const telefono2=document.getElementById('telefonope').value.trim();
    const fecha2=document.getElementById('calendariope').value.trim();
    const correo2=document.getElementById('emailpe').value.trim();
    const calle =document.getElementById('callepe').value.trim();
    const colonia =document.getElementById('coloniape').value.trim();
    const alcaldia =document.getElementById('pickerpe').value.trim();
    const CP = document.getElementById('cppe').value.trim();


       user.updateEmail(correo2).then(function(){
        db.collection("usuarios")
        .doc(user.uid).update({
          Nombre: nombre2,
          Apellidos: apellidos,
          Calle: calle,
          Colonia: colonia,
          Postal: CP,
          Nacimiento: fecha2,
          telefono: telefono2,
          Alcaldia: alcaldia,
          Correo: correo2
        }).then(function(){

          user.sendEmailVerification().then(function() {
            // Email sent.
                 
            localStorage.setItem("Correo",correo2);
          var toastBottom = app.toast.create({
        text: 'Se actualizó de forma correcta la información, se envio un correo para validar el correo, favor de reiniciar sesión',
        closeTimeout: 2000,
          }).open();
          
          }).catch(function(error) {
            // An error happened.
          });

          
        })  
         
      }).catch(function(error) {
        let errorde = error.code
         console.log(error)
        if (errorde === "auth/requires-recent-login"){
          var toastBottom = app.toast.create({
            text: "Por motivos de seguridad, para esta operación, se requiere que vuelvas a iniciar sesión",
            closeTimeout: 2000,
              }).open();
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


        } else if (errorCode === "auth/network-request-failed"){
          app.preloader.hide();
          var toastBottom = app.toast.create({
            text: 'No hay conexión de internet',
            closeTimeout: 2000,
          });
        }

        });

  });

  // Dinámica de cierre de sesión

  $$('#cerrarsesion').on('click',function(e){
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        localStorage.clear()
        mainView.router.navigate('/login-screen/',{animate:true});
        console.log("Sesión cerrada")
      }).catch(function(error) {
        // An error happened.
        console.log("Algo falló")
      });
      
      
});
  
});
  