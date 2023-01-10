let input = document.getElementById("buscador")


input.addEventListener("keyup", function(e){
    console.log(e.target.value)
})

let res = document.getElementById("res")
console.log(res)
res.innerHTML = ""

// Solicitud GET (Request).
fetch('http://localhost:8082/Jugadores/Vista-json')
    // Exito
    .then(response => response.json())
  .then(data => {


    //Convierte en mayusculas mi json 

let i = 0
  console.log(data[0].Nombres)
    for (let item of data) {
            data[i].Nombres = item.Nombres.toUpperCase()
   //  console.log(item.Nombres.toUpperCase())
i++
    
     }

    //Detecta las pulsaciones del input

    input.addEventListener("keyup", function(e){

      //borramos la impresion de la busqueda anterior
      while (res.firstChild) {
        res.removeChild(res.firstChild);
      }

//si input e tarjet . value = 0 

      
    //filtramo nuestro json (dato)

    let busqueda_input = e.target.value;

        let filtro = data.filter((dato)=>{
            
            return dato.Nombres.includes(busqueda_input.toUpperCase())
                  })
     
                  

         for (let item of filtro) {


          res.innerHTML += `
          
            <p> ${item.ID_FB} ${item.Nombres}           
          
          `
         }
    })
  });