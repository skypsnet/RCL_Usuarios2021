
   // Definición de las variables
function AV_V3(idusuario,numero){

const letras = [ "H","9","C","0","F","E","G","A","3","J","L","K","M","N","P","O","X","R","S","6","U","V","W","A","Y","7","D","1","2","I","4","5","T","Q","Z","8","B"]


// Paso 4: Suma de cada elemento por el número de productos
let A3 = idusuario
let A5 = new Array()
let aux6 = 0
let valorn = 0
let aux7 = 0
for(a5=0;a5<A3.length;a5++){
   
   if(typeof(A3[a5]) == 'number'){
    aux7 = A3[a5] + numero
    if(aux7>=10){ aux7 =  aux7%10; }
    A5[a5] = aux7;  
    
    
   }else{
    letras.forEach( (letra,index) => { if( A3[a5] == letra ){
        valorn = index+numero
        if(valorn > 35){
            aux6 = Math.floor(valorn/35);
            valorn = valorn - (35*aux6);
            A5[a5] = letras[valorn]; 
        }else{
            A5[a5] = letras[valorn]; 
        }
      } 
    })
   }

}

console.log(A5)


// Paso 6: Se imprime el código
let codigo 
let aux8
A5.forEach( (x,index) => { if( index == 0){codigo = `${x}`;  }else{ codigo += `${x}` }} )

console.log("Este es el código del recolector para el usuario:" + codigo)

return codigo
  
}

// let codebar = [ [1,9,9,8,0,8,4,5,2,8,3,4],[1,9,9,8,0,8,4,5,2,8,3,4],[1,9,9,8,0,8,4,5,2,8,3,4],[1,9,9,8,0,8,4,5,2,8,3,4], [3,8,2,9,3,8,4,9,3,2,1,3]];
// let idusuario = ["B",9,"N",2,"O","M"]

// AV_V1(idusuario,codebar)
