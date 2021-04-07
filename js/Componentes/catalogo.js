// ================== COMPONENTE CATALOGO ====================================================
//  Despliegue del componente perfil del catalogo de la aplicación
// ===============================================================================================

// Inicialización del evento al cargar la vista catalogo
$$(document).on('page:init','.page[data-name="catalogo"]', function(e){
   
    let promise = [] 
    app.preloader.show();
  
    // Si no existe registro de la base de datos, en memoria, se pide a la base de datos
    if(items.length === 0){
  
    database.ref('/').once('value', function(querySnapshot){
              
      let contcata = 1
      querySnapshot.forEach(function(doc) {
        
        
      if(doc.val().foto !== undefined){
        
       const promises =  storage.ref('productos/'+doc.key+'/imagen.png').getDownloadURL()
        .then(function(img){
  
          // console.log(img)
        
        items.push({
          Nombre: doc.val().Nombre,
          Marca: doc.val().Marca,
          Contenido: doc.val().Contenido,
          Empresa: doc.val().Empresa,
          codigobarras: doc.val().codigobarras,
          valor: doc.val().valor,
          Unidades: doc.val().Unidades,
          Material:  doc.val().Material,
          contcata: contcata,
          urlfoto: img
        })
      });    
  
        promise.push(promises)
      } else {
  
            items.push({
              Nombre: doc.val().Nombre,
              Marca: doc.val().Marca,
              Contenido: doc.val().Contenido,
              Empresa: doc.val().Empresa,
              codigobarras: doc.val().codigobarras,
              valor: doc.val().valor,
              Unidades: doc.val().Unidades,
              Material:  doc.val().Material,
              contcata: contcata,
              urlfoto: "imagenes/RCLHojita.png"
               
            });
         
          }
         
            contcata= contcata + 1;
      });
  
      
  
    }).then(function(e){
      
  
      Promise.all(promise).then(function(){
  
       items.forEach(function(prod,index)
     { 
       prod.contcata = index 
      })
  
      }).then(function(){
      app.preloader.hide();

      // Se crea la lista virtual

     let virtualList = app.virtualList.create({
        el: '.virtual-list',
        items: items,
        searchAll: function (query, items) {
          var found = [];
          for (var i = 0; i < items.length; i++) {
            if (items[i].codigobarras.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '' || items[i].Nombre.toLowerCase().indexOf(query.toLowerCase()) >= 0) found.push(i);
          }
          return found; //Regresa un arreglo con los resultados de la búsqueda
        },
        on: {
          itemsAfterInsert: function (vl, frag) {
               
            let el = document.getElementsByClassName("card_producto")
  
            Array.from(el).forEach((card)=>{
        
            
              const height = card.offsetHeight + 8
              const id = parseInt(card.getAttribute("data-id"))
              items.find(c=> c.contcata === id).height = height
        
            }); 
                     
          }
        },
        itemTemplate: `
            <div class="card card_producto" style="position:relative;" data-id="{{contcata}}"> 
             
            <li id="producto{{contcata}}" class="item-content fondoblanco">         
             <div class="item-inner">
             <div class="productosregis"> 
                 <img class="hojitaregis2" id="url{{contcata}}" src={{urlfoto}} alt="">
               </div>             
               <div class="formcard">
               <p class="busquedaprod" id="Marca{{contcata}}" >{{Marca}}</p>  <p class="Nombrelargo" id="Nombre{{contcata}}">{{Nombre}} </p>  
               <p style="display:none" class="busquedaprod" id="codbarr{{contcata}}">{{codigobarras}}</p>
               <p id="Contenido{{contcata}}">{{Contenido}} {{Unidades}} </p>
               <p data-valor="{{valor}}" id="Valor{{contcata}}">Valor: {{valor}} biyuyos</p>
               </div>     
           </div>
          
           </li> 
  
           <div style="display:block" class="botonregistro" data-numero="{{contcata}}" id="registro{{contcata}}" >
           <div class="botondentroreg" >REGISTRAR ARTÍCULO </div>           
           </div>
  
  
           `,
           height : function(item) {
            return typeof item.height === 'undefined' ? 100 : item.height;
         }
    
      });
        
      });
  
      
  
    
  
    }).then(function(){
  
      // virtualList.get.update();
  
      $$(".virtual-list").on('click','.botonregistro',function(e){
  
  
        numeroprod = $$(this).attr('data-numero')
  
        
        let productonombre = document.getElementById(`Nombre${numeroprod}`).innerHTML
        let productocontenido = document.getElementById(`Contenido${numeroprod}`).innerHTML
        let IdRegistro
        // document.getElementById(`registro${numeroprod}`).style.display = "none"
        // document.getElementById(`validacion${numeroprod}`).style.display = "block"
  
        app.dialog.create({	
          title: `<p>${productonombre}</p>
                  <p> ${productocontenido} </p>`,
          content: `<p>Ingresa el código de barras para registrar el producto: </p>
                  <input type="number" id="codigoregistro">   
                    `,
        closeByBackdropClick: true,          
        buttons: [
        {
          text: 'Registrar',
          onClick:  function(hola){
      
            console.log(numeroprod)
            let codigobarras = document.getElementById(`codigoregistro`).value.trim()
             console.log(codigobarras)
           
           let codigobarrasprod = document.getElementById(`codbarr${numeroprod}`).innerHTML
             
             console.log(codigobarrasprod)
           
             console.log(codigobarrasprod.trim() === codigobarras.trim())
           
             if(codigobarras !== codigobarrasprod){
               var toastBottom = app.toast.create({
                 text: 'El código de barras es incorrecto',
                 closeTimeout: 2000,
               }).open();
           
             } else {
               
           
               Nombre = document.getElementById(`Nombre${numeroprod}`).innerHTML
               Marca = document.getElementById(`Marca${numeroprod}`).innerHTML
               Contenido = document.getElementById(`Contenido${numeroprod}`).innerHTML
               CodigoBarras = document.getElementById(`codbarr${numeroprod}`).innerHTML
               Valor = document.getElementById(`Valor${numeroprod}`).getAttribute("data-valor")
               Url = document.getElementById(`url${numeroprod}`).src
               console.log(Valor)
  
               console.log(Url)
           
               Productosact = JSON.parse(localStorage.getItem("Productos"))
           
               if(Productosact === null){
                 Productosact = []
               }

               IdRegistro = Productosact.length;
           
               let MiObjeto = { 'Nombre': Nombre, 'Marca': Marca, 'Contenido': Contenido, 'CodigoBarras': CodigoBarras,'Valor': Valor, 'url':Url, 'IdRegistro':IdRegistro}
           
               Productosact.push(MiObjeto)
           
               localStorage.setItem('Productos',JSON.stringify(Productosact))
               console.log(MiObjeto)

               statusinfo = true;
               mainView.router.navigate('/registros/', { transition: 'f7-fade' })
             
             }
             
          }
        },
        {
          text: 'Cancelar',
          color: 'red'
        }
      ],
      verticalButtons: true,
        }).open();
        
  
  
    })      
       
  
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
  
  } else { 
  
    let virtualList = app.virtualList.create({
      el: '.virtual-list',
      items: items,
      searchAll: function (query, items) {
        var found = [];
        for (var i = 0; i < items.length; i++) {
          if (items[i].codigobarras.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '' || items[i].Nombre.toLowerCase().indexOf(query.toLowerCase()) >= 0) found.push(i);
        }
        return found; //return array with mathced indexes
      },
      on: {
        itemsAfterInsert: function (vl, frag) {
             
          console.log("Se termino de insertar todo lo demás")
  
          let el = document.getElementsByClassName("card_producto")
  
      Array.from(el).forEach((card)=>{

      console.log(card)
       const height = card.offsetHeight+8;
       console.log("Este es el height: "+height);
       const id = parseInt(card.getAttribute("data-id"));
      console.log(id)
       items.find(c=> c.contcata === id).height = height;
       items.find(c=> c.contcata === id);
  
    })
                
        }
      },
      itemTemplate: `
          <div class="card card_producto" style="position:relative;"  data-id="{{contcata}}"> 
           
          <li id="producto{{contcata}}" class="item-content fondoblanco">         
           <div class="item-inner">
           <div class="productosregis"> 
               <img class="hojitaregis2" id="url{{contcata}}" src={{urlfoto}} alt="">
             </div>             
             <div class="formcard">
             <p class="busquedaprod" id="Marca{{contcata}}" >{{Marca}}</p>  <p class="Nombrelargo" id="Nombre{{contcata}}">{{Nombre}} </p>  
             <p style="display:none" class="busquedaprod" id="codbarr{{contcata}}">{{codigobarras}}</p>
             <p id="Contenido{{contcata}}">{{Contenido}} {{Unidades}} </p>
             <p data-valor="{{valor}}" id="Valor{{contcata}}">Valor: {{valor}} biyuyos</p>
             </div>     
         </div>
        
         </li> 
  
         <div style="display:block" class="botonregistro" data-numero="{{contcata}}" id="registro{{contcata}}" >
         <div class="botondentroreg" >REGISTRAR ARTÍCULO </div>           
         </div>
  
  
         `,
         height : function(item) {
          return typeof item.height === 'undefined' ? 10 : item.height;
       }
  
    });
  
    app.preloader.hide();
  
    // $$("virtual-list").on('itemsAfterInsert',function(){
    //   console.log("Hola mundo, me registre despues del catalogo")
    // })
  
    $$(".virtual-list").on('click','.botonregistro',function(e){
  
      console.log(this)
      console.log(e)
      numeroprod = $$(this).attr('data-numero')
  
      console.log(numeroprod)
  
      
  
      let productonombre = document.getElementById(`Nombre${numeroprod}`).innerHTML
      let productocontenido = document.getElementById(`Contenido${numeroprod}`).innerHTML
      
      // document.getElementById(`registro${numeroprod}`).style.display = "none"
      // document.getElementById(`validacion${numeroprod}`).style.display = "block"
  
      app.dialog.create({	
        title: `<p>${productonombre}</p>
                <p> ${productocontenido} </p>`,
        content: `<p>Ingresa el código de barras para registrar el producto: </p>
                <input type="number" id="codigoregistro">   
                  `,
      closeByBackdropClick: true,          
      buttons: [
      {
        text: 'Registrar',
        onClick:  function(hola){
    
          console.log(numeroprod)
          let codigobarras = document.getElementById(`codigoregistro`).value.trim()
           console.log(codigobarras)
         
         let codigobarrasprod = document.getElementById(`codbarr${numeroprod}`).innerHTML
           
           console.log(codigobarrasprod)
         
           console.log(codigobarrasprod.trim() === codigobarras.trim())
         
           if(codigobarras !== codigobarrasprod){
             var toastBottom = app.toast.create({
               text: 'El código de barras es incorrecto',
               closeTimeout: 2000,
             }).open();
         
           } else {
             
         
             Nombre = document.getElementById(`Nombre${numeroprod}`).innerHTML
             Marca = document.getElementById(`Marca${numeroprod}`).innerHTML
             Contenido = document.getElementById(`Contenido${numeroprod}`).innerHTML
             CodigoBarras = document.getElementById(`codbarr${numeroprod}`).innerHTML
             Valor = document.getElementById(`Valor${numeroprod}`).getAttribute("data-valor")
             Url = document.getElementById(`url${numeroprod}`).src
             console.log(Url)
             console.log(Valor)
  
             Productosact = JSON.parse(localStorage.getItem("Productos"))
         
             if(Productosact === null){
               Productosact = []
             }
             let IdRegistro = Productosact.length;
             let MiObjeto = { 'Nombre': Nombre, 'Marca': Marca, 'Contenido': Contenido, 'CodigoBarras': CodigoBarras,'Valor': Valor, 'url': Url, 'IdRegistro':IdRegistro }
        
             Productosact.push(MiObjeto)
         
             localStorage.setItem('Productos',JSON.stringify(Productosact))
             console.log(MiObjeto)

             statusinfo = true;
             mainView.router.navigate('/registros/', { transition: 'f7-fade' })
           
           }
           
        }
      },
      {
        text: 'Cancelar',
        color: 'red'
      }
    ],
    verticalButtons: true,
      }).open();
      
  
  
  })      
      
  }
  
  });