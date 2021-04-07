// ================== ARCHIVO INDEX ============================================================
//  Programación de eventos y validaciones cada vez que se ingresa a la aplicación
// ===============================================================================================

// Validación para para mostrar el SplashScreen

if (localStorage.getItem('userve') === null){
    showSplashScreen()
}

// Evento que detecta cada vez que no hay conexión

document.addEventListener("offline", onOffline, false);

// Evento que detecta las credenciales del Usuario

auth.onAuthStateChanged(function(user) {

    console.log(localStorage.getItem('userve'))
    
    if (user) {
      console.log(user)
      if(user.emailVerified){
     
     if(localStorage.getItem('userve') !== null){
     mainView.router.navigate('/home/',{animate:true});
     console.log("Si esta verificado el usuario")
    }
     
      }else{

      }}else{
        
      }
     
   });

// ========= Eventos únicos que se registran para generar y redimir cupones ========= //
// =====================================================================================

   $$(document).on('click','#cuponespromo',function(){
        
    console.log(this);

    datoscupon.push($$(this).attr('data-empresa'))
    datoscupon.push($$(this).attr('data-fechacaducidad'))
    datoscupon.push($$(this).attr('data-codigoid'))
    
    mainView.router.navigate('/cupones/', { transition: 'f7-fade' })

  });



$$(document).on('click','.hacercanjeo',function(){
console.log("Hola mundo")
console.log(this)
let valordecupon= parseInt($$(this).attr('data-valor'))
let empresacup = $$(this).attr('data-empresa')
let fechacad = $$(this).attr('data-fechacaducidad')
let cantidadbiyuyos = parseInt(localStorage.getItem("Biyuyos"))
let idpromocion = $$(this).attr('data-idcupon')
let biyuyosusados = parseInt(localStorage.getItem("BiyuyosUsados"))
let cuponesdisponibles =  parseInt($$(this).attr('data-numcuponactual'))

datoscupon.push(empresacup) 
datoscupon.push(fechacad)
console.log(datoscupon)

if(cuponesdisponibles === 0){
 
app.toast.create({
  text: 'Se agotaron los cupones de esta promoción',
  closeTimeout: 2000,
}).open();

} else {





let dialogopromo =  app.dialog.create({
title: `<img src="imagenes/I017.png" style="width: 20%" >`,
text: `<p>Vas a canjear</p> 
       <p>${valordecupon} Biyuyos</p>
       <div class="botonpromcanje"> <p>Si, quiero canjear</p></div>
       <div class="botonpromcancel"> <p>Cancelar</p></div>       `,

on: {
  open: function(dialogo){
    $$(".botonpromcanje").on("click",function(){
      if(valordecupon > cantidadbiyuyos){
        dialogo.close()
        app.toast.create({
          text: 'No tienes suficientes biyuyos',
          closeTimeout: 2000,
        }).open();

      }else{

        app.preloader.show()

         var user = firebase.auth().currentUser
         var db = firebase.firestore();

        let nuevosbiyuyos = cantidadbiyuyos-valordecupon
        biyuyosusados=biyuyosusados+valordecupon
        newcuponesdisponibles = cuponesdisponibles - 1

        console.log(newcuponesdisponibles)
        console.log(cuponesdisponibles)
        console.log(idpromocion)

        db.collection('promociones').doc(idpromocion)
        .update({
          cuponesdisponibles: newcuponesdisponibles
        })

        db.collection('usuarios').doc(user.uid).collection("promocionestrans").add({
          idpromo : idpromocion,
          fechaobtencion: Date.now(),
          valor: valordecupon,
          fechauso: "No usado",
          Empresa: empresacup,
          fechacad: fechacad,
          idusuario: user.uid
        }).then(function(registro){

          datoscupon.push(registro.id)

             biyuyosusados=biyuyosusados+valordecupon;
            localStorage.setItem("biyuyosUsados",biyuyosusados);
             
           db.collection("usuarios")
         .doc(user.uid).update({
          Biyuyos: nuevosbiyuyos,
          BiyuyosUsados: biyuyosusados
        }).then(function(){
          app.preloader.hide()
          dialogo.close()

         
          mainView.router.navigate('/cupones/', { transition: 'f7-fade' })
        })

        })

        


      }
    })

    $$(".botonpromcancel").on("click",function(){
      dialogopromo.close()

      console.log(app.dialog)
     
    } )
  },
  close: function(){
    //  dialogopromo.destroy()
  },
  dialogClosed: function(dialog){
    console.log(dialog)
         dialog.destroy()
         console.log("Hola mundo")
  }
},


})
 
dialogopromo.open() 

}

});


   $$(document).on('click','.cuponfrente',function(){
    console.log("Hola mundo")
     console.log(this)
     numcupon = $$(this).attr('data-cupon')
  
     document.getElementById(`cuponreverso${numcupon}`).style.display="inline-block"
     document.getElementById(`cuponfrente${numcupon}`).style.display="none"
     document.getElementById(`cupon${numcupon}`).style.display="block"
     document.getElementById(`cuponnum${numcupon}`).style.display="none"
  
  
  });
  
  $$(document).on('click','.cuponreverso',function(){
   console.log("Hola mundo")
    console.log(this)
    numcupon = $$(this).attr('data-cupon')
  
    document.getElementById(`cuponreverso${numcupon}`).style.display="none"
    document.getElementById(`cuponfrente${numcupon}`).style.display="inline-block"
    document.getElementById(`cupon${numcupon}`).style.display="none"
     document.getElementById(`cuponnum${numcupon}`).style.display="block"
  });