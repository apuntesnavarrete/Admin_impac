let input = document.getElementById("buscador")
console.log(input)

input.addEventListener("keyup", function(e){
    console.log(e.target.value)
})




// Solicitud GET (Request).
fetch('http://localhost:8082/Jugadores/Vista-json')
    // Exito
    .then(response => response.json())
  .then(data => {


    input.addEventListener("keyup", function(e){
        console.log(e.target.value)
    })

    console.log(data)
    
    let filtro = data.filter((dato)=>{
       return dato.Nombres.includes("Luis")
      // return dato.Nombres == "Luis Enrique Tejada Aguilar"
    })

    console.log(filtro)

  });


