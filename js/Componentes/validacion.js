// ================== COMPONENTE VALIDACIÓN  ====================================================
//  Despliegue del componente validación de la aplicación
// ===============================================================================================

// Inicialización del evento al cargar la vista validación

$$(document).on('page:init', '.page[data-name="validacion"]', function (e) { 
   
   let registros = JSON.parse(localStorage.getItem("Productos"))
   let contenidoreg = document.getElementById("contenidoregistros2")
   let contprodreg = 1
   let conteobiyuyos = 0
   obtenerBiyuyos();
  
   $('#barcode2').keypress(function (e) {
    if (e.which === 13) {
            
          // Keyboard.hide();
    }
   });
  
    if(registros === null){
  
  
      document.getElementById('conproductos2').style.display = "none"
      document.getElementById('sinproductos2').style.display = "block"
      $('.biyuyosinval').html(`0 BIYUYOS SIN VALIDAR`)
  
    } else {
  
      document.getElementById('conproductos2').style.display = "block"
      document.getElementById('sinproductos2').style.display = "none"
  
      let zonaconteobiyuyos = document.getElementById('cantidadbiyuyos')
      
  
  
    registros.forEach(function(producto){
       
      let newregistro = document.createElement("div");
      conteobiyuyos = conteobiyuyos +  parseInt(producto.Valor)
      console.log(`El numero de biyuyos totales es: ${conteobiyuyos}`)
  
      if(contprodreg === 1){
        
        newregistro.innerHTML = `<div class="card cardproduc prodregistrados card1 card-outline">
        <div class="card-content card-content-padding">
          
          <div> 
            <img class="hojitaregis" src=${producto.url} alt="">
          </div>
          
          <div class="formcard">
          
          <p>${producto.Nombre}</p> 
          <p>${producto.Contenido}  </p>
          <p> Valor: ${producto.Valor} biyuyos </p>
          </div>
          
        
        </div>
      </div>`
  
      } else {
      newregistro.innerHTML = `<div class="card cardproduc prodregistrados card-outline">
      <div class="card-content card-content-padding">
        
        <div> 
          <img class="hojitaregis" src="imagenes/RCLHojita.png" alt="">
        </div>
        
        <div class="formcard">
        <p>${producto.Nombre}</p> 
        <p>${producto.Contenido}  </p>
        <p> Valor: ${producto.Valor} biyuyos </p>
        </div>
        
      
      </div>
    </div>`
        
      }
     
    contprodreg = contprodreg+1;
     
    contenidoreg.appendChild(newregistro);
           
    })
  
    localStorage.setItem('biyuyosreg',conteobiyuyos)
    zonaconteobiyuyos.innerHTML= `${conteobiyuyos} biyuyos`
    $('.biyuyosinval').html(`${conteobiyuyos} BIYUYOS SIN VALIDAR`)
  }
  
  
  
    $$("#validacionmanual2").on("click",function(){
      
      let codigovalidacion = document.getElementById("barcode2").value.trim()
      let id = localStorage.getItem("idusuario")
      var db = firebase.firestore();
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
  
      console.log(`El número de productos es: ${numerodeprod}`)
  
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
  
         console.log(biyuyosregistrados)
         console.log(biyuyosvalidados)
         console.log(nuevosbiyuyos)
  
         app.preloader.show()
  
         producregistr.forEach(function(producto){
  
          db.collection("usuarios")
         .doc(usuario.uid).update({
           Biyuyos: nuevosbiyuyos
         })
                   
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
         })
         .then(function(){
         
          app.preloader.hide()
          mainView.router.navigate('/exitoval/', { transition: 'f7-fade' })
          localStorage.removeItem("Productos")
  
         })
           
         }); 
  
         
          
      } else {
      app.toast.create({
          text: 'El código es erróneo',
          closeTimeout: 2000,
        }).open();
      }
  
      }else {
  
       
       alert("Hay un problema con tu ID, consulta al equipo RCL porfavor")
  
      }
       
      
  
      
  })
  
    
  
  var db = firebase.firestore();
  var usuarios = firebase.auth().currentUser;
    db.collection("usuarios").doc(usuarios.uid)
    .collection("validados").get().then(function(documentos){
             
      console.log(documentos)
      let urlinfo
      documentos.forEach(function(doc){
  
        console.log(doc)
             
        let lugardepublicar = document.getElementById("productosvalidados")
  
        let newregistro = document.createElement("div");
        
         if(doc.data().url !== undefined ){
          urlinfo = doc.data().url
         } else {
           urlinfo = "imagenes/RCLHojita.png"
         }
      
      if(contprodreg === 1){
        
        newregistro.innerHTML = `<div class="card cardproduc card2 card-outline">
        <div class="card-content card-content-padding">
          
          <div> 
            <img class="hojitaregis" src="${urlinfo}" alt="">
          </div>
          
          <div class="formcard">
          
          <p>${doc.data().Nombre}</p> 
          <p>${doc.data().Contenido}  </p>
          <p> Valor: ${doc.data().Valor} biyuyos </p>
          </div>
          
        
        </div>
      </div>`
  
      } else {
      newregistro.innerHTML = `<div class="card cardproduc card-outline">
      <div class="card-content card-content-padding">
        
        <div> 
          <img class="hojitaregis" src="${urlinfo}" alt="">
        </div>
        
        <div class="formcard">
        <p>${doc.data().Nombre}</p> 
        <p>${doc.data().Contenido}  </p>
        <p> Valor: ${doc.data().Valor} biyuyos </p>
        </div>
        
      
      </div>
    </div>`
        
      }
     
    contprodreg = contprodreg+1;
     
    lugardepublicar.appendChild(newregistro);
           
  
      })
  
    }) 
  
  })