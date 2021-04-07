// ================== COMPONENTE VALIDACIÓN REGISTROS ====================================================
//  Despliegue del componente registros de la aplicación
// ===============================================================================================

// Inicialización del evento al cargar la vista registros
$$(document).on('page:init','.page[data-name="registros"]', function(e){
  
   let registros = JSON.parse(localStorage.getItem("Productos"))
   let contenidoreg = document.getElementById("contenidoregistros")
   let contprodreg = 1
   let conteobiyuyos = 0
   obtenerBiyuyos();
  
   $('#barcode').keypress(function (e) {
    if (e.which === 13) {
            
          // Keyboard.hide();
    }
   });
  
    if(registros === null){
  
  
      document.getElementById('conproductos').style.display = "none"
      document.getElementById('sinproductos').style.display = "block"
      document.getElementById('biyuyosinval').innerHTML = `0 BIYUYOS SIN VALIDAR`
  
    } else {
  
      document.getElementById('conproductos').style.display = "block"
      document.getElementById('sinproductos').style.display = "none"
  
      let zonaconteobiyuyos = document.getElementById('cantidadbiyuyos')
      let zonaconteoproductos = document.getElementById('cantidadProductos')
  
  
    registros.forEach(function(producto){
       
      let newregistro = document.createElement("div");
      newregistro.setAttribute('data-id',producto.IdRegistro);
      newregistro.className = "card cardproduc prodregistrados card-outline"
      conteobiyuyos = conteobiyuyos +  parseInt(producto.Valor)
      console.log(`El numero de biyuyos totales es: ${conteobiyuyos}`)
  
      if(contprodreg === 1){
        
        // newregistro.className += " card1"

        newregistro.innerHTML = `
        <div class="card-content card-content-padding">
          
          <div> 
            <img class="hojitaregis" src=${producto.url} alt="">
          </div>
          
          <div class="formcard">
          
          <p>${producto.Nombre}   <span data-biyuyo="${producto.Valor}" data-id="${producto.IdRegistro}" style="float:right; margin-right: 2vw;" class="eliminarprod material-icons-outlined">cancel</span> </p> 
          <p>${producto.Contenido}  </p>
          <p data-biyuyo="${producto.Valor}" > Valor: ${producto.Valor} biyuyos </p>
          </div>
          
        
        </div>
      `

      // Se dispara la información de validación  
      } else {
      newregistro.innerHTML = `
      <div class="card-content card-content-padding">
        
        <div> 
          <img class="hojitaregis" src=${producto.url} alt="">
        </div>
        
        <div class="formcard">
        <p>${producto.Nombre} <span data-biyuyo="${producto.Valor}" data-id="${producto.IdRegistro}" style="float:right; margin-right: 2vw;" class="eliminarprod material-icons-outlined">cancel</span></p> 
        <p>${producto.Contenido}  </p>
        <p> Valor: ${producto.Valor} biyuyos </p>
        </div>
        
      
      </div>
    `
        
      }
     
    contprodreg = contprodreg+1;
     console.log(newregistro)
    contenidoreg.appendChild(newregistro);
           
    });

    if( ((contprodreg-1)%5 === 0 | (contprodreg-1) === 1) && statusinfo === true ){
      // Se dispara la información de validación
      $('#inforegistro').trigger('click');
      statusinfo = false;
    }
  
    localStorage.setItem('biyuyosreg',conteobiyuyos)
    zonaconteobiyuyos.innerHTML= `${conteobiyuyos} biyuyos | ${contprodreg-1} productos`
    // zonaconteoproductos.innerHTML = `${contprodreg} productos`
    document.getElementById('biyuyosinval').innerHTML = `${conteobiyuyos} BIYUYOS SIN VALIDAR`

    $$('.eliminarprod').on('click', function(e){

     let IdRegistro = $$(this).attr('data-id');
     let valorBiyuyo = $$(this).attr('data-biyuyo');
     conteobiyuyos = conteobiyuyos - valorBiyuyo;
     let registros = JSON.parse(localStorage.getItem("Productos"))
     let indBorrar = registros.findIndex(c => c.IdRegistro === parseInt(IdRegistro));
     
     // Eliminar el producto
      console.log(IdRegistro);
      console.log(valorBiyuyo);
      console.log(indBorrar);

    let domEliminar = Array.from($$('.prodregistrados')).find( card => card.getAttribute('data-id') === IdRegistro);

    console.log(domEliminar) 
      
    registros.splice(parseInt(indBorrar),1);

    localStorage.setItem('Productos',JSON.stringify(registros));


    console.log(registros)
        
    contenidoreg.removeChild(domEliminar);
    
    contprodreg = contprodreg-1; 
    // Modificar el numero de biyuyos y cantidad
     
    if(contprodreg === 1){
      localStorage.removeItem('Productos');
      document.getElementById('conproductos').style.display = "none"
      document.getElementById('sinproductos').style.display = "block"
      document.getElementById('biyuyosinval').innerHTML = `0 BIYUYOS SIN VALIDAR`
    }else{
    
    zonaconteobiyuyos.innerHTML= `${conteobiyuyos} biyuyos | ${contprodreg-1} productos`
    document.getElementById('biyuyosinval').innerHTML = `${conteobiyuyos} BIYUYOS SIN VALIDAR`

    }

    
    });
  
  }
  
    let popovervali = app.popover.create({
      targetEl: '.popover-validacion',
      content: ` <div class="popover popover-links">
      <div class="popover-inner">
        <div class="list">
          <ul>
            <li><a class="list-button item-link" id="Codigoalfa" href="#">Recolector/Centro de acopio</a></li>
            <li><a class="list-button item-link" id="Codigoqr" onClick="validaQRCamiones()" href="#">Camiones</a></li>
            
          </ul>
        </div>
      </div>
    </div>`,
     on: {
       opened:function(){
          
         console.log("Hola mundo")
  
         $$("#Codigoqr").on('click',function(){
           popovervali.close()
           
         }) 
  
         $$("#Codigoalfa").on('click',function(){
          popovervali.close() 
          ac3.open();
  
        }) 
  
       }
     } 
  
  
    });
  
    var ac3 = app.actions.create({
      buttons: [
        // First group
        [
          {
            text: 'Elige forma de validación',
            label: true
          },
          {
            text: 'Códifo alfanúmerico',
            onClick: function(){
              console.log("Hola mundo")
          document.getElementById("valmanual").style.display="block"
          document.getElementById("valprincipal").style.display="none"
            }
          },
          {
            text: 'Código QR',
            onClick: function(){
              console.log("Hola mundo codigoQR")
              validaQR()
            }
          }
        ],
        // Second group
        [
          {
            text: 'Cancelar',
            color: 'red'
          }
        ]
      ]
    });
  
  
    
  
    $$(".popover-validacion").on("click",function(){
      popovervali.open()
      console.log("Hola mundo")
    });
  
    $$("#regresar").on("click",function(){
      document.getElementById("valprincipal").style.display="block"
      document.getElementById("valmanual").style.display="none"
    });
  
    $$("#validacionmanual").on("click",function(){
      
      let codigovalidacion = document.getElementById("barcode").value.trim()
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
  
         console.log(recolectornum)
         console.log(calidadmaterial)
  
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
           
  
      });
  
    });
  
  // Se lanza el evento de información


  
  });
