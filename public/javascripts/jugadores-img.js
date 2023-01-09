let input = document.getElementById("buscador")




console.log(input)

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


    input.addEventListener("keyup", function(e){
      while (res.firstChild) {
        res.removeChild(res.firstChild);
      }


        let filtro = data.filter((dato)=>{
            return dato.Nombres.includes(e.target.value)
         

           // return dato.Nombres == "Luis Enrique Tejada Aguilar"
         })
     
      

        
         console.log(filtro)

         for (let item of filtro) {
          res.innerHTML += `
          
            <p>  ${item.Nombres}          
          
          `
         }
    })

    
    
 

  });
/*
 
  console.log(content_list)
  const elementoHtml = document.createElement("p")
  
  elementoHtml.textContent = filtro
  content_list.appendChild(elementoHtml)
  */
