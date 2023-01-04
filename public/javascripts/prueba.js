let GF = document.getElementsByClassName("GF")
let GC = document.getElementsByClassName("GC")
let puntos_local = document.getElementsByClassName("Puntos_l")
let puntos_visitante = document.getElementsByClassName("Puntos_rv")

for (let i = 0; i < GF.length; i++) {
    GC[i].addEventListener("change", function(e){
      calc_puntos(i)
     })
     GF[i].addEventListener("change", function(e){
        calc_puntos(i)
       })
}

function calc_puntos(i){
    if(parseInt(GF[i].value) > parseInt(GC[i].value)){ 
        puntos_local[i].value = 3
        puntos_visitante[i].value = 0
        GF[i].style.backgroundColor = "Aquamarine"
        GC[i].style.backgroundColor = "Tomato"
    }
    else if(parseInt(GF[i].value) < parseInt(GC[i].value)){ 
        puntos_local[i].value = 0
        puntos_visitante[i].value = 3
        GC[i].style.backgroundColor = "Aquamarine"
        GF[i].style.backgroundColor = "Tomato"
    }
    else if(parseInt(GF[i].value) == parseInt(GC[i].value)){
        console.log("decidir empate")
        GC[i].style.backgroundColor = "Salmon"
        GF[i].style.backgroundColor = "Salmon"
        let desempate = prompt("¿Quien gano en el desempate? L o V o E");
        if(desempate == "L"){
            console.log("gano el local en el desempate")
            puntos_local[i].value = 2
            puntos_visitante[i].value = 1
            GF[i].style.backgroundColor = "Aquamarine"

        }else if(desempate == "V"){
            console.log("gano el visitante en el desempate")
            puntos_local[i].value = 1
            puntos_visitante[i].value = 2
            GF[i].style.backgroundColor = "Aquamarine"

        } else{
            alert("cuidado debiste cometer un error")
        }

    }
}







