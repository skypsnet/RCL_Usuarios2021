// ================== COMPONENTE ÉXITO VALIDACIÓN ====================================================
//  Despliegue del componente que confirma la validación del producto
// ===============================================================================================

// Inicialización del evento al cargar la vista de confirmación de la validación del producto
$$(document).on('page:init','.page[data-name="exitoval"]', function(e){


    document.getElementById('cantbiyuyosval').innerHTML = `${localStorage.getItem('biyuyosreg')}`

    $$(".botonok").on("click",function(){

     localStorage.setItem('biyuyosreg',"0")
     mainView.router.navigate('/registros/', { transition: 'f7-fade' })

    })

});