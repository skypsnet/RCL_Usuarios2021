
   // Definición de las variables
function AV_V2(idusuario,numero){

const letras = [ "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

// Paso #1: Intercalación de elementos

let A2 = new Array(2*idusuario.length)
let idusuarioinv = [...idusuario].reverse()
let aux2 = 0

for(a1=0; a1<idusuario.length*2; a1++){


   if((a1+1)%2 == 0){
    
    A2[a1]= idusuarioinv[aux2]

    aux2=aux2+1

   } else {
     
    A2[a1]= idusuario[aux2] 

   }

}

console.log(A2)

// Paso 2: Suma de los elementos que son caracteres no númericos
aux3=0
cont=0
cand = 0
let A3 = new Array()
for(a3=0; a3<A2.length;a3++){
  
   if (typeof(A2[a3]) == 'number' && typeof(A2[a3+1]) == 'number'){
       
      aux3 = aux3 + A2[a3] 
      cand = 1

   } else {

      if(cand === 1){
      
      A3[cont] = A2[a3]+aux3
      cand = 0
      aux3 = 0
      cont=cont+1;

      } else {

     A3[cont] = A2[a3] 
     cont=cont+1;
     aux3 = 0 
     }
   // A3[cont] = A2[a3]
   
   // cont=cont+1;
   }

}

console.log(A3);

// Paso 4: Suma de cada elemento por el número de productos
let A5 = new Array()
let aux5 = 0
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
        if(valorn > 26){
            aux6 = Math.floor(valorn/26);
            valorn = valorn - (26*aux6);
        }else{
            A5[a5] = letras[valorn]; 
        }
      } 
    })
   }

}

console.log(A5)

// Paso 5: Checa la longitud del código

let A6 = new Array()
A6=A5
let remocion=0 ;
let aux9=0

while(A6.length>5){

    remocion = numero+remocion;
    if(remocion>=A6.length){

        aux9 = Math.floor(remocion/A6.length);
        remocion = remocion - A6.length*aux9;
        A6.splice(remocion-1,1);  
      
    } else {
      A6.splice(remocion-1,1);    
    }
    
}

console.log(A6)

// Paso 6: Se imprime el código
let codigo 
let aux8
A6.forEach( (x,index) => { if( index == 0){codigo = `${x}`;  }else{ codigo += `${x}` }} )

console.log("Este es el código del recolector para el usuario:" + codigo)

return codigo
  
}

// let codebar = [ [1,9,9,8,0,8,4,5,2,8,3,4],[1,9,9,8,0,8,4,5,2,8,3,4],[1,9,9,8,0,8,4,5,2,8,3,4],[1,9,9,8,0,8,4,5,2,8,3,4], [3,8,2,9,3,8,4,9,3,2,1,3]];
// let idusuario = ["B",9,"N",2,"O","M"]

// AV_V1(idusuario,codebar)
