// Algoritmo de validación

function AV_V1(idusuario,codebar){

   // Definición de las variables

// let codebar = [ [1,9,9,8,0,8,4,5,2,8,3,4],[1,9,9,8,0,8,4,5,2,8,3,4],[1,9,9,8,0,8,4,5,2,8,3,4],[1,9,9,8,0,8,4,5,2,8,3,4], [3,8,2,9,3,8,4,9,3,2,1,3]];
// let idusuario = ["B",9,"N",2,"O","M"]
let numero = codebar.length
let A1 = new Array(codebar[0].length)
let aux = 0
const letras = [ "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]

// Paso #1: Suma todos los códigos elemento a elemento, si es mayor a 10, se trunca a su último dígito

for (var i=0; i<codebar[0].length ; i++){
aux = 0
for (var j=0; j<numero ; j++){

   aux = aux + codebar[j][i]   

}
   if(aux>=10){

     aux = aux % 10 
     if(i==1 && aux==0 ){
         aux = 1
     }
   }


   A1[i] = aux
}
console.log(A1);

// Paso #2: Intercalación de elementos

let A2 = new Array(A1.length+idusuario.length)
let aux2 = 0
for(a1=0; a1<idusuario.length*2; a1++){


   if((a1+1)%2 == 0){
    
    A2[a1]= idusuario[aux2]

    aux2=aux2+1

   } else {
     
    A2[a1]= A1[aux2] 

   }

}

auxp = idusuario.length
for(a2=(idusuario.length*2); a2<A1.length+idusuario.length; a2++){

   A2[a2] = A1[auxp];
   auxp = auxp + 1;
}

// Paso 3: Suma de los elementos que son caracteres no númericos
aux3=0
cont=0
let A3 = new Array()
for(a3=0; a3<A2.length;a3++){
  
   if (typeof(A2[a3]) == 'number' ){
       
      aux3 = aux3 + A2[a3] 

   } else {

   A3[cont] = aux3 
   cont=cont+1;
   A3[cont] = A2[a3]
   aux3 = 0;
   cont=cont+1;
   }
}
A3[cont] = aux3

let A4 = new Array()
let aux4 = 0
for(a4=0; a4<A3.length;a4++){
   
   if(A3[a4]>=10){
    
    A3[a4].toString().split('').forEach( x => { A4[aux4] = parseInt(x); aux4=aux4+1 })
     
   } else {
     
    A4[aux4] = A3[a4];
    aux4=aux4+1
   }

}

// Paso 4: Suma de cada elemento por el número de productos
let A5 = new Array()
let aux5 = 0
let aux6 = 0
let valorn = 0
let aux7 = 0
for(a5=0;a5<A4.length;a5++){
   
   if(typeof(A4[a5]) == 'number'){
    aux7 = A4[a5] + numero
    if(aux7>=10){ aux7 =  aux7%10; }
    A5[a5] = aux7;  
    
    
   }else{
    letras.forEach( (letra,index) => { if( A4[a5] == letra ){
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

// Paso 5: Checa la longitud del código

let A6 = new Array()
A6=A5
let remocion=0 ;
let aux9=0

while(A6.length>6){

    remocion = numero+remocion;
    if(remocion>=A6.length){

        aux9 = Math.floor(remocion/A6.length);
        remocion = remocion - A6.length*aux9;
        A6.splice(remocion-1,1);  
      
    } else {
      A6.splice(remocion-1,1);    
    }
    
}


// Paso 6: Se imprime el código
let codigo 
let aux8
A6.forEach( (x,index) => { if( index == 0){codigo = ` ${x}`;  }else{ codigo += `${x}` }} )

console.log("Este es el código del recolector para el usuario:" + codigo)

return codigo
  
}


// let codebar = [ [1,9,9,8,0,8,4,5,2,8,3,4],[1,9,9,8,0,8,4,5,2,8,3,4],[1,9,9,8,0,8,4,5,2,8,3,4],[1,9,9,8,0,8,4,5,2,8,3,4], [3,8,2,9,3,8,4,9,3,2,1,3]];
// let idusuario = ["B",9,"N",2,"O","M"]

// AV_V1(idusuario,codebar)
