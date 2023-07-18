let alltasks = []
let alltasksholderactive = []
let alltasksholdercomplete = []

let form = document.querySelector('.inputform')
let newtodo = document.getElementById('new-todo-input')
let checkbox = document.querySelector('#checkBox')

let btnComplete = document.querySelector('#btn-complete');


let btnActive = document.querySelector('#btn-active');


let btnAll = document.querySelector('#btn-all');


let btnClear = document.querySelector('#btn-clear');

let itemsleft = document.querySelector('.items_left');



  
checkbox.addEventListener('click', ()=>{
    // console.log(checkbox.checked);
})

form.addEventListener('submit', (e)=>{
    e.preventDefault();

    if(newtodo.value !== ''){
        alltasks.push({
            task: newtodo.value,
            checked: checkbox.checked
        })


        sendtolocalstorage(alltasks)
        newtodo.value= '';
        checkbox.checked= false

        renderTasks(alltasks)

        console.log(alltasks);
    }
})

function renderTasks (alltasks){
    let taskItems = document.querySelectorAll(".lower-inner .taskitem");

    taskItems.forEach(el=>el.remove())

    alltasks.forEach(({
        task,
        checked
    }, index)=>{
        let checkbox = document.createElement('input')
        checkbox.type = "checkbox";
        checkbox.className = "itemcheckbox"
        checkbox.checked = checked

        let taskContainer = document.createElement('div')
        taskContainer.className = 'singletask';
        taskContainer.textContent = task
        taskContainer.style.textDecoration = "none"
        if(checkbox.checked == true){
            taskContainer.style.textDecoration = 'line-through'
        }
        checkbox.addEventListener('click' , ()=>{
            if(taskContainer.style.textDecoration == "none"){
                taskContainer.style.textDecoration = "line-through"
                alltasks[index].checked = true
                sendtolocalstorage(alltasks)
                count()
            }else{
                taskContainer.style.textDecoration = "none"
            }
        })

        let taskitem = document.createElement('div')
        taskitem.className="taskitem";

        taskitem.appendChild(checkbox)
        taskitem.appendChild(taskContainer)

        let alltasksContainer = document.querySelector('.lower-inner')
        alltasksContainer.appendChild(taskitem)
        count()
    })
}

renderTasks(getfromlocalstorage() )


btnAll.addEventListener('click', () => {
    console.log("clicked all");
    // renderTasks(alltasks);
    renderTasks(getfromlocalstorage())
    count()
  });


btnActive.addEventListener('click', () => {
    mytasks=getfromlocalstorage()
    alltasksholderactive = mytasks.filter((task) => !task.checked);
   
    console.log("clicked active");
    renderTasks(alltasksholderactive);
    count()
  });



btnComplete.addEventListener('click', () => {
    mytasks=getfromlocalstorage()
    
    alltasksholdercomplete = mytasks.filter((task) => task.checked);
   
    console.log("clicked complete");
    renderTasks(alltasksholdercomplete );
    count()
    
});

btnClear.addEventListener('click', () => {
    mytasks=getfromlocalstorage()
    const filteredTasks = mytasks.filter((task) => !task.checked);
    localStorage.removeItem('alltasks');
    sendtolocalstorage(filteredTasks)
    // alltasks = filteredTasks;
    console.log(filteredTasks);
    renderTasks(filteredTasks);
    count()
});

function sendtolocalstorage(items){
    localStorage.setItem('alltasks',JSON.stringify(items))
}

function getfromlocalstorage(){
    items=localStorage.getItem('alltasks')
    return JSON.parse(items)
}

function count(){
    remaining = getfromlocalstorage() 
    remaining = remaining.filter((task) => !task.checked);
    count_remaining = remaining.length;
    console.log(count_remaining)
    itemsleft.textContent= count_remaining + " items left"
}