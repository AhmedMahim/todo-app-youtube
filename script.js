const myForm = document.querySelector('#myForm'),
    input = document.querySelector('#todoInput'),
    msg = document.querySelector('#msg'),
    todoCont = document.querySelector('#todoCont'),
    clearbtn = document.querySelector('#clearbtn');

// check if the input is empty or not
myForm.addEventListener('submit', (e) => {
    // if the input is empty, show error message for 1s
    if (input.value === '' || input.value === ' ') {
        msg.classList.add('error');
        msg.textContent = 'Please write somthing !'
        setTimeout(() => {
            msg.classList.remove('error')
        }, 1000);
    } else {
        // if the input is not empty, show succes message for 1s
        msg.classList.add('succes');
        msg.textContent = 'Todo created with succes'
        setTimeout(() => {
            msg.classList.remove('succes')
        }, 1000);

        // create todo with the input value
        todoCont.innerHTML += `<li class="todoItems">${input.value}</li>`;

        removeTodo()
        saveTodo()
        // reset input value
        input.value = '';
    }
    e.preventDefault()
})

// show todo on page reload 
const showTodo = () => {
    localContent = localStorage.getItem('todo');
    if (!localContent) {
        // if the localStorage is empty, display 'Write a something to start' on the todoCont
        todoCont.innerHTML = `<li class="todoItems">Write a something to start</li>`;
    }
    else {
        // if the localstorage is not empty, display all the todo
        todoCont.innerHTML = localContent;
    }
}
showTodo()

// save todo to localStorage 
const saveTodo = () => {
    localStorage.setItem('todo', todoCont.innerHTML);
}

saveTodo()

// remove Todo
const removeTodo = () => {
    const todoItems = document.querySelectorAll('.todoItems');

    todoItems.forEach(todo => {
        todo.addEventListener('click', () => {
            if (todo.classList.contains('done')) {
                todo.remove()
                saveTodo()
            } else {
                todo.classList.add('done');
                saveTodo()
            }
        })
    })
}
removeTodo()

// clear all function
const clearAll = () => {
    clearbtn.addEventListener('click', () => {
        todoCont.innerHTML = '';
        removeTodo()
    })
}
clearAll()