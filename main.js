
// get the add-task div
const formAdd = document.getElementById('add-task');

//get the ul tag do display the todos
const ul = document.getElementById("body-ul");


// display or hide the form when the user clicks add new task
const buttonDisplayForm = document.getElementById("add");
buttonDisplayForm.addEventListener('click', (e) => {
    switch (formAdd.className) {
        case "show":
            formAdd.className = "hide";
            document.getElementById('add').innerHTML = "Add Task";
            document.getElementById('add').style.color = "inherit";
            break;
        case "hide":
            formAdd.className = "show";
            document.getElementById('add').innerHTML = "Close";
            document.getElementById('add').style.color = "red";
    }
})

//create todos array object if the key todos does not exist in the localstorage
// else assign the localstorge value to it
const todos = (localStorage.getItem("todos") == null) ? [] :
    JSON.parse(localStorage.getItem("todos"))

didsplayTodos();

//When user submit a new todo
const formSubmit = document.getElementById("myForm");
formSubmit.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get the task name input value
    let taskText = document.getElementById('addInput').value;

    // if input is empty, return
    if (taskText == "" || taskText == undefined) return;

    // Add task to array
    let task = { id: todos.length + 1, task: taskText, done: false };
    todos.push(task);

    //save the todos array to the localstorage
    save();
    formSubmit.reset();

    // Call the display todos function
    didsplayTodos(task.task);
})



function didsplayTodos(text) {
    if (todos.length == 0) {
        ul.innerHTML = "You have no tasks";
        ul.style.textAlign = "center";
        ul.style.fontSize = "22px";

    }
    else {
        ul.innerHTML = "";
        todos.forEach(todo => {

            // Create a li item
            let li = document.createElement("li");
            li.className = "flex-container";
            li.id = "task" + todo.id;

            // Create a div inside the li item to add the text
            let liDiv1 = document.createElement('div');
            liDiv1.innerHTML = todo.task;
            liDiv1.id = "li-div-1";
            li.appendChild(liDiv1);

            // Create another div inside the li item to add the checkbox
            let liDiv2 = document.createElement('div');
            liDiv2.id = "li-div-2";

        

            let span = document.createElement('div');
            span.className = "tooltip";

            let tooltiptext = document.createElement('span');
            tooltiptext.className = "tooltiptext";
            tooltiptext.innerHTML = "Mark as done";
            

            let taskDone = document.createElement('input');
            taskDone.type = "radio";
            taskDone.className = "checkbox";
            taskDone.style.marginTop = "5px"

            span.appendChild(tooltiptext);
            span.appendChild(taskDone)
            // liDiv2.appendChild(tooltiptext);
            liDiv2.appendChild(span);

            li.appendChild(liDiv2)
            taskDone.addEventListener('change', (e) => {
                //if checkbox is checked, taske is done else false
                e.target.checked ? todo.done = doneTask(todo,tooltiptext) : false;
            })

            taskDone.addEventListener('click', (e) => {
                if(tooltiptext.innerHTML == "delete"){
                    todos.splice(todos.indexOf(todo),1)
                    save();
                    didsplayTodos();
                }
            })
            ul.appendChild(li)
        })
    }
}


function doneTask(task,ttt) {
    task.done = true;
    let liId = document.getElementById("task" + task.id);
    let firtLi = liId.querySelector('div');
    firtLi.className = "todoDone";
    ttt.innerHTML = "delete"
    
    save();
    return true;
}

function undoneTask(task) {
    task.done = false;
    let liId = document.getElementById("task" + task.id);
    let firtLi = liId.querySelector('div');
    firtLi.className = "todoUnDone";
    save();
    return false;
}


function save() {
    localStorage.setItem('todos', JSON.stringify(todos));
}
removeTask()
function removeTask()
{
   let inputs = document.querySelectorAll('input[type="radio"]');
   Array.from(inputs).forEach(inp => {
       inp.addEventListener('change',(e) => {
            console.log(e.target.checked);
       })
   })
}