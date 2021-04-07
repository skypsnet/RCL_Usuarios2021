// ================== COMPONENTE RECUPERACIÓN ====================================================
//  Despliegue del componente recuperación de la app RCL
// ===============================================================================================

// Inicialización del evento al cargar la vista recuperación
$$(document).on('page:init','.page[data-name="recuperacion"]', function (e) {
    
  
      $$('#Enviar').on('click', function(e){
        let emailAddress = document.getElementById("correoelectronico").value.trim();
        console.log(emailAddress);
        
        // Llamada a API para restauración de Contraseña
        auth.sendPasswordResetEmail(emailAddress).then(function() {
          console.log("mail enviado")
          let toastBottomAcierto = app.toast.create({
            text: 'Correo eléctronico enviado',
            closeTimeout: 2000,
          });
  
          toastBottomAcierto.open();
        }).catch(function(error) {

         //Manejo de errores
            
          console.log(error.code)
  
          if(error.code === "auth/invalid-email"){
            
            var toastBottomError = app.toast.create({
            text: 'Correo eléctronico incorrecto',
            closeTimeout: 2000,
          });
  
          } else if(error.code === "auth/user-not-found"){
  
            var toastBottomError = app.toast.create({
              text: 'Usuario no encontrado',
              closeTimeout: 2000,
            });
  
          } else {
  
            var toastBottomError = app.toast.create({
              text: 'Sin conexión a internet',
              closeTimeout: 2000,
            });
  
          }
  
          
          toastBottomError.open();
          
        });
    
  
      })
      
});