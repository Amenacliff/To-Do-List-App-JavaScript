const clear = document.querySelector(".refresh");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

//Classes Check

const check = "fa-check-circle";
const uncheck = "fa-circle-thin";
const lineThrough = "lineThrough";

//Variables

let LIST,id ;

//get items from local storage

let data=localStorage.getItem("TODO")

//check if data is empty

if(data){
    LIST=JSON.parse(data);
    id=LIST.length;
    loadList(LIST)
}
else{
    LIST=[];
    id=0;
}

//load list to the ui

function loadList(array){
    array.forEach(function(item){
         addToDo(item.name,item.id,item.done,item.trash)
    })
}

//clear localStorage

clear.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
})

//Today's Date
const options= {weekday : "short", month : "long", day : "numeric"};
const today = new Date();

dateElement.innerHTML=today.toLocaleDateString("en-US", options)

//Todo Function

function addToDo(toDo ,id, done, trash){
    if(trash){return; }
    const DONE=done? check:uncheck
    const LINE= done? lineThrough:"";

    const item= `
    <ul id="list"> 
            <li id="item">
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fas fa-trash" job="delete" id="0"></i>
                    </li>
        </ul> 
    
    `;
    const position="beforeend";

    list.insertAdjacentHTML(position,item)
}


//Add Item to the list of Todo

document.addEventListener("keyup", function(even){
    if(event.keyCode == 13){
        const toDo= input.value;
        if(toDo){
            addToDo(toDo,id,false,false);
            LIST.push({
                name:toDo,
                id:id,
                done:false,
                trash:false,
            });

            //add items to local storage
localStorage.setItem("TODO",JSON.stringify(LIST));


            id++
        }
        input.value="";
    }
})

//Complete Todo

function completeToDo(element){
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(".text").classList.toggle(lineThrough);

    LIST[element.id].done= LIST[element.id].done ? false:true;
}

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode)

    LIST[element.id].trash = true;
}

list.addEventListener("click", function(event){
    const element= event.target;
    const elementJob= element.attributes.job.value

    if(elementJob=="complete"){
        completeToDo(element);
    }
    else if(elementJob=="delete"){
        removeToDo(element);
    }
    //add items to local storage
localStorage.setItem("TODO",JSON.stringify(LIST));

})