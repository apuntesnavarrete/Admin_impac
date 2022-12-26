let collection = document.getElementsByClassName("GF")
console.log(collection)
for (let i = 0; i < collection.length; i++) {
    console.log(collection[i]);
        }



let GF = document.getElementsByClassName("GF")[0]
let GC = document.getElementsByClassName("GC")[0]
let puntos_local = document.getElementsByClassName("Puntos_l")[0]
let puntos_visitante = document.getElementsByClassName("Puntos_rv")[0]

GF.addEventListener("change", function(e){
calc_puntos()    
})

GC.addEventListener("change", function(e){
   calc_puntos()
})



function calc_puntos(){
    if(parseInt(GF.value) > parseInt(GC.value)){ 
        puntos_local.value = 3
        puntos_visitante.value = 0
        GF.style.backgroundColor = "Aquamarine"
        GC.style.backgroundColor = "Tomato"
    }
    else if(parseInt(GF.value) < parseInt(GC.value)){ 
        puntos_local.value = 0
        puntos_visitante.value = 3
        GC.style.backgroundColor = "Aquamarine"
        GF.style.backgroundColor = "Tomato"
    }
    else if(parseInt(GF.value) == parseInt(GC.value)){
        console.log("decidir empate")
        GC.style.backgroundColor = "green"
        GF.style.backgroundColor = "green"
        let desempate = prompt("¿Quien gano en el desempate? L o V o E");
        if(desempate == "L"){
            console.log("gano el local en el desempate")
            puntos_local.value = 2
            puntos_visitante.value = 1
            GF.style.backgroundColor = "Aquamarine"

        }else if(desempate == "V"){
            console.log("gano el visitante en el desempate")
            puntos_local.value = 1
            puntos_visitante.value = 2
            GF.style.backgroundColor = "Aquamarine"

        } else{
            alert("cuidado debiste cometer un error")
        }

    }
}







