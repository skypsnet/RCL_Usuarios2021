// ================== COMPONENTE INFORMATE ====================================================
//  Despliegue del componente informate de la aplicación
// ===============================================================================================

// Inicialización del evento al cargar la vista informate
$$(document).on('page:init','.page[data-name="informate"]', function(e){
  
    // Actualiza los biyuyos en el conteo inferior
    let registros = JSON.parse(localStorage.getItem("Productos"))
    obtenerBiyuyos();
  
    if(registros === null){
  
     $('.biyuyosinval').html(`0 BIYUYOS SIN VALIDAR`)
  
    } else {
  
      $('.biyuyosinval').html( `${localStorage.getItem('biyuyosreg')} BIYUYOS SIN VALIDAR`)
      
    }

    // Despliega las infografias del storage

    let referencia = document.getElementById("contenidodig")

    storage.ref('Informate').listAll().then(function(res){
      console.log(res)
  
      res.items.forEach(function(docitem){
        
  
        docitem.getDownloadURL().then(function(url) {
  
        let nuevoelemento = document.createElement('div')
  
        nuevoelemento.innerHTML = `<img src="${url}" style="width : 100%">`
  
        referencia.appendChild(nuevoelemento);
  
        });
  
      })
  
  
    });
   
});