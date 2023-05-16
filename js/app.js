const todoInput = document.querySelector('#itemInput')
const addBtn = document.querySelector('#addButton')
const clearBtn = document.querySelector('#clearButton')
let todoListElement = document.querySelector('#todoList')
let todosArray = []

const addTodo = () => {
    if (!todoInput.value) {
        return
    } else {
        const newTodoTitle = todoInput.value;
        const todoObj = {
            id: todosArray.length + 1,
            title: newTodoTitle,
            complete: false
        };
        todosArray.push(todoObj);
        setLocalStorage(todosArray);
        todosGenerator(todosArray);
        todoInput.value = '';
        todoInput.focus();
    }
};

const setLocalStorage = (todosList) => {
    localStorage.setItem('todos', JSON.stringify(todosList));
};

const clearAll = () => {
    localStorage.removeItem('todos');
    todosArray = [];
    todoListElement.innerHTML = '';
};

const deleteTodo = (id) => {
    const index = todosArray.findIndex(todo => todo.id === id);
    if (index !== -1) {
        todosArray.splice(index, 1);
        setLocalStorage(todosArray);
        todosGenerator(todosArray);
    }
};

const todosGenerator = (todosList) => {
    todoListElement.innerHTML = '';
    let newLi, newLabel, newCompleteBtn, newDeleteBtn,newEditBtn;
    todosList.forEach(todo => {
        // todoListElement.insertAdjacentHTML("afterbegin",`

        // <li id="${todo.id}"><label>${todo.title}</label><button id="btnComplete" class="completeBtn">Complete</button><button id="btnDelete" class="deleteBtn">delete</button></li>

        // `)
  
        newLi = document.createElement('li');
        newLi.id = todo.id; 
        newLi.classList.add('listElem')
        newLabel = document.createElement('label');
        newLabel.innerHTML = todo.title;
        newCompleteBtn = document.createElement('button');
        newCompleteBtn.id = 'btnComplete';
        newCompleteBtn.classList.add('completeBtn');
        newDeleteBtn = document.createElement('button');
        newDeleteBtn.id = 'btnDelete';
        newDeleteBtn.classList.add('deleteBtn');
        newDeleteBtn.innerHTML = 'delete';
        newEditBtn = document.createElement('button');
        newEditBtn.classList.add('editBtn')
        newEditBtn.innerHTML = 'Edit'
        if (todo.complete) {
            newLi.classList.add('completed');
            newCompleteBtn.innerHTML = 'undo';
            newCompleteBtn.style.opacity = '0.5'
        } else {
            newCompleteBtn.innerHTML = 'Complete';
        }
        newLi.append(newLabel, newCompleteBtn, newDeleteBtn , newEditBtn);
        todoListElement.append(newLi);

    });
};

const getLocalStorage = () => {
    const localTodos = JSON.parse(localStorage.getItem('todos'));
    todosArray = localTodos || [];
    todosGenerator(todosArray);
};


//events
addBtn.addEventListener('click', addTodo);
clearBtn.addEventListener('click', clearAll);
window.addEventListener('load', getLocalStorage);

todoListElement.addEventListener('click', (e) => {
    if (e.target.className === 'deleteBtn') {
        const todoId = parseInt(e.target.parentNode.id);
        deleteTodo(todoId);
    } else if (e.target.className === 'completeBtn') {
        if(e.target.innerHTML == 'Complete'){
            const todoId = parseInt(e.target.parentNode.id);
            const todoIndex = todosArray.findIndex(todo => todo.id === todoId);
            if (todoIndex !== -1) {
                todosArray[todoIndex].complete = true;
                setLocalStorage(todosArray);
                e.target.parentNode.classList.add('completed');
                e.target.innerHTML = 'undo';
                e.target.style.opacity = '0.5'
            }
        }else{
            const todoId = parseInt(e.target.parentNode.id);
            const todoIndex = todosArray.findIndex(todo => todo.id === todoId);
            if (todoIndex !== -1) {
                todosArray[todoIndex].complete = false;
                setLocalStorage(todosArray);
                e.target.parentNode.classList.remove('completed');
                e.target.innerHTML = 'Complete';
                e.target.style.opacity = '1'
        }
              }
    }
});


todoInput.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        addTodo();
    } else {
        return;
    }
});