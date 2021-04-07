// ================== COMPONENTE CUPONES ====================================================
//  Despliegue del componente cupones de la aplicación
// ===============================================================================================

// Inicialización del evento al cargar la vista cupones

$$(document).on('page:init','.page[data-name="cupones"]', function(e){


    $$("#popupval").on("click",function(){
    datoscupon = []
    });
  
      document.getElementById("fechacad").innerHTML = datoscupon[1]
      document.getElementById("empresa").innerHTML = datoscupon[0]
      
      var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: datoscupon[2],
        width: 128,
        height: 128,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    });
  
  });