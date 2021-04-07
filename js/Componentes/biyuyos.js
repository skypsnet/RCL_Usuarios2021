// ================== COMPONENTE BIYUYOS ====================================================
//  Despliegue del componente Biyuyos de la aplicación RCL (Despliegue de biyuyos)
// ===============================================================================================

// Inicialización del evento al cargar la vista BIYUYOS
$$(document).on('page:init','.page[data-name="biyuyos"]', function(e){

  obtenerBiyuyos();  

    var swiper = new Swiper('.swiper-container', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: '3',
      initialSlide: '1',
      coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
      },
    });
  
    console.log("Hola mundo")
  
    $$("#slidernumero1").on("click",function(){
  
          document.getElementById("sinvalidarbiy").style.display = "block"
          document.getElementById("canjeablebiyu").style.display = "none"
          document.getElementById("usadosbiyu").style.display = "none"
          document.getElementById("totalesbiyu").style.display = "none"
       
    })
  
    
    $$("#slidernumero2").on("click",function(){
      document.getElementById("sinvalidarbiy").style.display = "none"
      document.getElementById("canjeablebiyu").style.display = "block"
      document.getElementById("usadosbiyu").style.display = "none"
      document.getElementById("totalesbiyu").style.display = "none"
   })
  
   
   $$("#slidernumero3").on("click",function(){
    document.getElementById("sinvalidarbiy").style.display = "none"
    document.getElementById("canjeablebiyu").style.display = "none"
    document.getElementById("usadosbiyu").style.display = "block"
    document.getElementById("totalesbiyu").style.display = "none"
  })
  
  
  $$("#slidernumero4").on("click",function(){
    document.getElementById("sinvalidarbiy").style.display = "none"
    document.getElementById("canjeablebiyu").style.display = "none"
    document.getElementById("usadosbiyu").style.display = "none"
    document.getElementById("totalesbiyu").style.display = "block"
  })
  
  if(localStorage.getItem("biyuyosreg") === null ){
    let biyuyostotales = parseInt(localStorage.getItem("BiyuyosUsados"))+parseInt(localStorage.getItem("Biyuyos"))
    document.getElementById("conteobiyu0").innerHTML= `0`
  
  document.getElementById("conteobiyu1").innerHTML= `${localStorage.getItem("Biyuyos")}`
  
  document.getElementById("conteobiyu2").innerHTML= `${localStorage.getItem("BiyuyosUsados")}`
  
  document.getElementById("conteobiyu3").innerHTML= `${biyuyostotales}`
  
  } else {
    let biyuyostotales = parseInt(localStorage.getItem("BiyuyosUsados"))+parseInt(localStorage.getItem("Biyuyos"))+parseInt(localStorage.getItem("biyuyosreg"))
    document.getElementById("conteobiyu0").innerHTML= `${localStorage.getItem("biyuyosreg")}`
  
    document.getElementById("conteobiyu1").innerHTML= `${localStorage.getItem("Biyuyos")}`
    
    document.getElementById("conteobiyu2").innerHTML= `${localStorage.getItem("BiyuyosUsados")}`
    
    document.getElementById("conteobiyu3").innerHTML= `${biyuyostotales}`
  
  }
  
  
  
  
  });