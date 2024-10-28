const input  = document.querySelector('#todo-item');
const addButton = document.querySelector('.btn');
const todoItemList = document.querySelector('.todo-item-list');
addButton.addEventListener('click',createTask);
//createTask todo list

function createTask(e){
   e.preventDefault();
   let task = input.value;
   if(task=='') return alert('Please enter the todo !')
   let li = document.createElement('li');
   li.classList.add('todo-item');
   li.innerHTML = `
    <span class="todo">${task}</span>
    <button class="edit">Edit</button>
    <button class="delete">Delete</button>
     <input type="checkbox" name="" id="mark">
                  `
li.querySelector('.delete').addEventListener('click', deleteTask);
li.querySelector('.edit').addEventListener('click', editTask);
li.querySelector('#mark').addEventListener('click', markTask);

   todoItemList.appendChild(li);
   input.value='';
}

//deleting func
function deleteTask(e){
    const todoItem = e.target.closest('.todo-item');
    console.log(todoItem)
    todoItemList.removeChild(todoItem);
}

//edit todo
function editTask(e){
    //selecting the li->todo-item'
    // yha pr maine ye esiliye kiya hai qki mujhe jo todo edit krta hai use fecth bhi krna hoga 
    const todoItem = e.target.closest('.todo-item');
    let span = todoItem.querySelector('.todo');
    let currentText = span.textContent;
    console.log(currentText);// finally fetch kr liya

    // Create an input element
    //yha pr maine currentText or editable todo ko input me append kiya hai
    let input = document.createElement('input');
    input.type ='text';
    input.classList.add('newText');
    input.value = currentText;
    console.log(input);//working right 
    console.log(input.value);//working right 

    //create 'Done' button
    //yha pr maine ek button bnaya hai jispr click krne ke baad editing complete ho jayega
    let doneButton = document.createElement('button');
    doneButton.classList.add('doneButton')
    doneButton.textContent = 'Done';
    console.log(doneButton);

    // Replace the span with the input and add the "Done" button
    //yha pr maine todoItem jo ke span ke jagah input ko aur done ko append kiya
    todoItem.replaceChild(input, span);
    todoItem.appendChild(doneButton);
    // Focus on the input field
    input.focus();

   function saveChanges(){
    let newText = input.value.trim();
    if(newText !==''){
        span.textContent = newText;
    }
    todoItem.replaceChild(span, input);
    todoItem.removeChild(doneButton);
   }
  doneButton.addEventListener('click', saveChanges);
}


function markTask(e){
    const todoItem = e.target.closest('.todo-item');
    let span = todoItem.querySelector('.todo');
    if (e.target.checked) {
        span.style.textDecoration = 'line-through';
    } else {
        span.style.textDecoration = 'none';
    }

}