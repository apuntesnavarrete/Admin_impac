const datos = document.currentScript.getAttribute('data-datos');
let input = document.getElementsByClassName("ID")
let input_Dorsal = document.getElementsByClassName("Dorsal")

// Usa los datos en el archivo JavaScript
 
let url = `http://localhost:8082/${datos}/Planteles/JSON`

fetch(url)
  .then(response => response.json())
  .then(data => {

   // console.log(data)


    for (let i = 0; i < input.length; i++) { //recorre la colección usando un bucle for
    
      input[i].addEventListener("keyup", function(e){

        for (let id in data) {
         let dato_filtrar = data[id].ID
      
         if (data[id].ID == e.target.value) {
          console.log(input_Dorsal[i])
          input[i].style.backgroundColor = "red";
          input_Dorsal[i].placeholder = data[id].Nombre_Equipo + " " + data[id].Nombres
          break;
        } else {
          input[i].style.backgroundColor = "White";
        }
        }
      })
      
    }


  })
  .catch(error => {
   console.log(error)
   console.log("no pudimos obtener la data")

  });