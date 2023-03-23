const datos = document.currentScript.getAttribute('data-datos');
let input = document.getElementsByClassName("ID")

// Usa los datos en el archivo JavaScript
 
let url = `http://localhost:8082/${datos}/Planteles/JSON`

fetch(url)
  .then(response => response.json())
  .then(data => {

    console.log(input)


    for (let i = 0; i < input.length; i++) { //recorre la colección usando un bucle for
    
      input[i].addEventListener("keyup", function(e){

        for (let id in data) {
         let dato_filtrar = data[id].ID
      
         if (data[id].ID == e.target.value) {
          input[i].style.backgroundColor = "red";
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