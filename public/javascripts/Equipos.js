let input = document.getElementById("buscador")


input.addEventListener("keyup", function(e){
    console.log(e.target.value)
})

let res = document.getElementById("res")
console.log(res)
res.innerHTML = ""

// Solicitud GET (Request).
fetch('http://localhost:8082/Equipos/Json')
    // Exito
    .then(response => response.json())
  .then(data => {
console.log(data)

    //Convierte en mayusculas mi json 

let i = 0
  console.log(data[0].Nombre_Equipo)
    for (let item of data) {
            data[i].Nombre_Equipo = item.Nombre_Equipo.toUpperCase()
   //  console.log(item.Nombres.toUpperCase())
i++
    
     }

console.log(data)

    //Detecta las pulsaciones del input

    input.addEventListener("keyup", function(e){

      //borramos la impresion de la busqueda anterior
      while (res.firstChild) {
        res.removeChild(res.firstChild);
      }

//si input e tarjet . value = 0 
// lenth de la varibales
      
    //filtramo nuestro json (dato)

    let busqueda_input = e.target.value; //mayusculas todo

    
// lenth de la varibale para evitar filtrar con solo 2 letras

if(busqueda_input.length > 2){

  let filtro = data.filter((dato)=>{
            


    return dato.Nombre_Equipo.includes(busqueda_input.toUpperCase())
          })

          

          //Imprimimos en pantalla

 for (let item of filtro) {



  res.innerHTML += `
  
    <div class="jugador_item">
  <p class="ID"> <a href="http://localhost:8082/Equipo/Delete/${item.id_plantel}"> ${item.id_plantel}  </a> </p> <p class="nombres">  ${item.Nombre_Equipo}</p>         
  <img src="${item.Escudo}" class="fotos">
  <div>
  
  `
 }

}else{
 console.log("nesecito mas letras")
}

       
    })
  });