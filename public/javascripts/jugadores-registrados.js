const datos = document.currentScript.getAttribute('data-datos');

let input = document.getElementsByClassName("ID")[0]
console.log(input)






// Usa los datos en el archivo JavaScript
console.log(datos); 
 
let url = `http://localhost:8082/${datos}/Planteles/Imagenes/barcelona/json`
console.log(url)

fetch(url)
  .then(response => response.json())
  .then(data => {
console.log(data)



input.addEventListener("keyup", function(e){
  console.log(e.target.value)

  for (let id in data) {
   let dato_filtrar = data[id].ID
  
   if (data[id].ID == e.target.value) {
    console.log("Se encontró el valor .");
    
    break;
  } else {
    console.log("No se encontró el valor .");
  }
  }
})

  })
  .catch(error => {
   console.log(error)
   console.log("no pudimos obtener la data")

  });