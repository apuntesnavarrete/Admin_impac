


console.log("inicio de la logica para descargar img")

//Definimos el botón para escuchar su click
const $boton = document.querySelectorAll(".content_resul") // El botón que desencadena

//  $objetivo = document.querySelectorAll(".content_resul")[0] // A qué le tomamos la foto
// Nota: no necesitamos contenedor, pues vamos a descargarla
console.log($boton[1])

for(let i = 0; i < $boton.length; i++) {

 $boton[i].addEventListener("dblclick", () => {
  html2canvas($boton[i]) // Llamar a html2canvas y pasarle el elemento
    .then(canvas => {
      // Cuando se resuelva la promesa traerá el canvas
      // Crear un elemento <a>
      let enlace = document.createElement('a');
      enlace.download = "Resultado";
      // Convertir la imagen a Base64
      enlace.href = canvas.toDataURL();
      // Hacer click en él
      enlace.click();
    });
});
}

//traer todos los div en un map o en un recorredor
//probar con un console log que funcione en todos los divs

//y ejecutar la funcion
