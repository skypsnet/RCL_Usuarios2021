// ================== COMPONENTE PROMOCIONES ====================================================
//  Despliegue del componente promoción de la aplicación
// ===============================================================================================

// Inicialización del evento al cargar la vista promociones
$$(document).on('page:init','.page[data-name="promociones"]', function(e){
    let buscador = document.getElementById("buscapromos")
    let candadonuevos = true
    let candadosvali = true
    var storage = firebase.storage();
    var user = firebase.auth().currentUser
    var db = firebase.firestore();
    var referencia = document.getElementById("socioscont")
    let registros = JSON.parse(localStorage.getItem("Productos"))
    
    obtenerBiyuyos();
  
    if(registros === null){
  
     $('.biyuyosinval').html(`0 BIYUYOS SIN VALIDAR`)
  
    } else {
  
      
      $('.biyuyosinval').html( `${localStorage.getItem('biyuyosreg')} BIYUYOS SIN VALIDAR`)
  
    }
  
    db.collection("aliados")
     .get()
      .then(function(querySnapshot){
        
  
        console.log(querySnapshot)
  
            querySnapshot.forEach(function(doc){
  
              console.log(doc)
                
              storage.ref('Aliados/'+doc.id+'/Aliados.png').getDownloadURL()
              .then(function(img){
  
                console.log(img)
  
                 let nuevoelemento = document.createElement('div')
  
                 nuevoelemento.innerHTML = `<img src="${img}" style="width : 100%">`
  
                 referencia.appendChild(nuevoelemento);
  
              })
  
            })
  
      })
  
  
      $$("#cuponesnuevos").on("click",function(){
        let formaCupones = [ '/CuponFrente.png', '/CuponReverso.png']
        let campoproductos = document.getElementById('productosnuevos')
        let index = 0
        
        // Se inicializa el buscador

        buscador.style.display = "block";
            
        if(candadonuevos)
        {
          app.preloader.show();
  
           db.collection("promociones")
        .get()
         .then(function(querySnapshot){
           
     
           console.log(querySnapshot)
  
           console.log(querySnapshot.empty);
  
           if(querySnapshot.empty){
             app.preloader.hide();
           }
     
               querySnapshot.forEach(function(doc){
     
                 console.log(doc)
                 console.log(index)
                   
              const promises = [];
  
              formaCupones.forEach(val => {
                  const promise = firebase.storage()
                      .ref('Promociones/'+doc.id+ val)
                      .getDownloadURL()
                      .catch(err => {
                          console.log('error', err);
                          return "";
                      })
                      .then(fileUrl => {
                          return fileUrl;
                      });
                  promises.push(promise);
                  console.log(val)
              });
  
  
              console.log(promises)
  Promise.all(promises)
      .catch(err => {
          console.log('error', err);
      })
      .then(urls => {
          // for (var i = 0; i <= urls.length - 1; i++) {
          //     if (urls[i] != '') {
          //         document.getElementById('photo' + (i + 1)).src = urls[i];
          //     }
          // } 

          itemspromo.push({
            id : doc.id,
            Empresa: doc.data().Empresa,
            Producto: doc.data().Producto,
            Valor: doc.data().Valor,
            Contador: doc.data().contadorprod,
            cuponesdisponibles: doc.data().cuponesdisponibles,
            UrlFrente: urls[0],
            UrlDetras: urls[1],
            index: index,
            fechacad: doc.data().fechacad
          });


          let nuevoelemento = document.createElement('div')
  
  
          nuevoelemento.innerHTML = `<li>
                                     <div class="cuponespromo">
                                     <img data-cupon="${index}" id="cuponfrente${index}" class="cuponfrente" src="${urls[0]}" style="width : 100%">
                                     <img data-cupon="${index}" id="cuponreverso${index}" class="cuponreverso" style="display: none" src="${urls[1]}" style="width : 100%">
                                     <div data-idcupon="${doc.id}" data-numcuponactual="${doc.data().cuponesdisponibles}" data-valor="${doc.data().Valor}" data-empresa="${doc.data().Empresa}" data-fechacaducidad="${doc.data().fechacad}" class="botoncanjeo hacercanjeo"  id="cupon${index}"> <p>Canjear</p>  </div> 
                                     <div class="botoncanjeo" id="cuponnum${index}"> <p>Valor: ${doc.data().Valor} biyuyos</p> </div>
                                     <div class="busqueda" style="display: none"> ${doc.data().Empresa}  </div>
                                     </div>
                                     </li>`
                                                     
    
          campoproductos.appendChild(nuevoelemento);
  
          index=index+1
          console.log(urls)
  }).then(function(){


    var searchbar = app.searchbar.create({
      el: '.searchbar',
      searchContainer: '.list',
      searchIn: '.busqueda',
      on: {
        search(sb, query, previousQuery) {
          console.log(query, previousQuery);
        }
      }
    });

    // let virtualList = app.virtualList.create({
    //   el: '.virtual-list',
    //   items: itemspromo,
    //   searchAll: function (query, items) {
    //     var found = [];
    //     for (var i = 0; i < items.length; i++) {
    //       if (itemspromo[i].Empresa.toLowerCase().indexOf(query.toLowerCase()) >= 0 || query.trim() === '' || itemspromo[i].Producto.toLowerCase().indexOf(query.toLowerCase()) >= 0) found.push(i);
    //     }
    //     return found; //Regresa un arreglo con los resultados de la búsqueda
    //   },
    //   on: {
    //     itemsAfterInsert: function (vl, frag) {
             
    //       let el = document.getElementsByClassName("cuponespromo")

    //       Array.from(el).forEach((card)=>{

          
    //         const height = card.offsetHeight
    //         const id = card.getAttribute("data-id")
    //         itemspromo.find(c=> c.id === id).height = height
    //         console.log("La altura es: "+ height);
    //         console.log("El id es: "+id);
    //         console.log(card);

    //       }); 
                   
    //     }
    //   },
    //   itemTemplate: 
    //   `<div class="cuponespromo" data-id="{{id}}">
    //   <img data-cupon="{{index}}" id="cuponfrente{{index}}" class="cuponfrente" src="{{UrlFrente}}" style="width : 100%">
    //   <img data-cupon="{{index}}" id="cuponreverso{{index}}" class="cuponreverso" style="display: none" src="{{UrlDetras}}" style="width : 100%">
    //   <div data-idcupon="{{id}}" data-numcuponactual="{{cuponesdisponibles}}" data-valor="{{Valor}}" data-empresa="{{Empresa}}" data-fechacaducidad="{{fechacad}}" class="botoncanjeo hacercanjeo"  id="cupon{{index}}"> <p>Canjear</p>  </div> 
    //   <div class="botoncanjeo" id="cuponnum{{index}}"> <p>Valor: {{Valor}} biyuyos</p> </div>
    //   </div>`,


    //   height : function(itemspromo) {
    //   return typeof itemspromo.height === 'undefined' ? 216 : itemspromo.height;
    // }
  
    // });


    app.preloader.hide();
    candadonuevos = false
  });
  
   
  
  });
  
               
  
     
               })
        }
       
  
  });
              
       
      var storage = firebase.storage();
      var user = firebase.auth().currentUser
      var db = firebase.firestore();

      $$("#promoaliados").on("click",function(){
        
        buscador.style.display = "none";

        console.log(buscador);
        console.log("Se activa el buscador")

      });
  
      $$("#cupseleccionados").on("click",function(){
  
        console.log("Hola mundo")
        let espaciopromo = document.getElementById("productosvalidados")
        
        buscador.style.display = "none";


        if(candadosvali){
        db.collection("usuarios").doc(user.uid).collection("promocionestrans")
        .where("fechauso","==","No usado")
        .get()
        .then(function(snapdoc){
                   console.log(snapdoc)
            snapdoc.forEach(function(doc){
                 console.log(doc)
              storage.ref('Promociones/'+doc.data().idpromo+`/CuponFrente.png`).getDownloadURL()
              .then(url => {
                console.log(url)
                let nuevoelemento = document.createElement('div')
                   
                nuevoelemento.innerHTML = `<div class="cuponespromo">
                <img id="cuponespromo" src="${url}" data-codigoid="${doc.id}" data-fechacaducidad="${doc.data().fechacad}" data-empresa="${doc.data().Empresa}">
                </div>`
                
                espaciopromo.appendChild(nuevoelemento)
  
              })
                      
              doc.data().idpromo
  
  
            })
  
        })
  
        candadosvali = false
  
        }
  
        
  
  
      })
      
  
  });