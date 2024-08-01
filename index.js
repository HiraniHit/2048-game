let mainDiv = document.querySelector(".game-main")

let allBox = document.querySelectorAll(".col")
function createGameBox() {

    let boxPosition = Math.floor((Math.random() * 16) + 1)
    console.log(boxPosition);


    allBox.forEach((value) => {
        if(value.id == boxPosition && value.textContent == ""){
            if(value.textContent == ""){
                value.textContent = 2
            }
        }else if(value.textContent != ""){
            createGameBox()
        }else{
            return
        }
    })

}

window.document.addEventListener("keyup",()=>{
    createGameBox()
})
createGameBox()

