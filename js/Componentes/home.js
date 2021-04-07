
// ================== COMPONENTE HOME ============================================================
//  Despliegue del componente Home en la aplicación Reciclatelo
// ================================================================================================

$$(document).on('page:init','.page[data-name="home"]',function (e){

  let perfilimagen = document.getElementById("perfilhome");
  let nombreperfil = document.getElementById("nombrehome");
  const user = auth.currentUser

    $$("#botonaparecer").on('click',function(){
      
     document.getElementById("normalmenu").style.display="none"
     document.getElementById("normalmenu2").style.display="none"
     document.getElementById("menudesapare").style.display = "inline-flex"

    });

    $$("#botonsalirdes").on('click',function(){
      
      document.getElementById("normalmenu").style.display="inline-flex"
      document.getElementById("normalmenu2").style.display="flex"
      document.getElementById("menudesapare").style.display = "none"
 
     });

  console.log(perfilimagen);

  // Llama la imagen correspondiente al usuario

  nombreperfil.innerHTML=`${localStorage.getItem("Nombre")}`

  storage.ref('usuarios/'+ user.uid + '/profile.jpg').getDownloadURL().then(imgUrl => {

       perfilimagen.src=imgUrl
       
  });

  // Se registra el comportamiento del evento backbutton para usuarios autenticados

  if(contadorpagina===0){
  
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
        
      if(user){
       console.log("Usuario autenticado")
       
      if (statusescaner) {
    
        statusescaner = false
        return false
    
      } else if  (  $$('.modal-in').length > 0 ) {
          
        console.log(typeof($$(".validasalir")))
        console.log($$(".validasalir"))
    
        if($$(".validasalir").length > 0){
          app.popup.close('.popup'); 
          mainView.router.navigate('/home/', { transition: 'f7-fade' })
    
        }else{
    
          console.log($$('.modal-in'))
         
          e.preventDefault();
        app.popup.close('.popup'); 
        
        console.log("Cierro el pop-up");
        console.log("Cierro el dialogo");
        app.dialog.close('.dialog');
        app.actions.close('.actions-modal');
        }
        
        
    
        
    
      } else if (mainView.router.currentRoute.url === "/home/") { 
        
    
        //    if(document.getElementById("registromanual").style.display === "block"){
    
        //   document.getElementById("escaner").style.display="block";
        //   document.getElementById("manual").style.display="block";
        //   document.getElementById("registromanual").style.display="none";
        //   console.log("Cambio al control de registros");
        //   return false
        // } else {
           
        e.preventDefault();
          console.log("Cierro la aplicación");
          navigator.app.exitApp();
          console.log("Bye Bye")
        // }
    
    
       } else {
        
        e.preventDefault()
           mainView.router.back();
           console.log("Regreso al home");
           return false
    
    
    
      } 
    
      }else{
        console.log("Usuario no autenticado")
         return false
      }
    
      // }
    
      
    
    
    }
    
    document.addEventListener('deviceReady',onDeviceReady,false);
      
    }
    
    console.log("Todo OK")
    
    contadorpagina=contadorpagina+1;
    
    console.log(`El numero de veces que se ha inicializado es: ${contadorpagina}`)

})