
document.getElementById('formTask').addEventListener('submit',saveTask);


function saveTask(e){ //captura el evento

    let title = document.getElementById('title').value;
    let description = document.getElementById('description').value;
    
    const task = {  //aca creamos un objeto con title y description
        title,
        description
    };

    // localStorage.setItem('tasks', JSON.stringify(task)); //esto sirve para alamacenar datos en el localStorage y lleva dos parametros
    // localStorage.getItem('tasks');//para obtener los datos un parametro, dos parametros el nombre y el dato que queremos alamacenar

    if(localStorage.getItem('tasks') === null){ //si desde el local storage exite tareas y es igual a nulo creamos tareas 
        let tasks = []
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks))
        //con esto alamacenamos las tareas en caso de que no exista ninguna 

    } else { //si existe valores obtenemos actualizamos y las almacenamos de nuevo
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks)); 

    }


    // antes de almacenar lo convertimos a string para que en el localstorage podramos ver lo que guardamos esto lo hacemos con JSON.stringfy
    //y le decimos que queremos convertir a string task 

    // para almacenar esto hacemos con apis


    getTask(); //con esto se agrega la tarea sin refrescar la pagina como anteriormente haciamos


    document.getElementById('formTask').reset();

    e.preventDefault();
    
}


function getTask() {
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    let tasksView = document.getElementById('tasks');

    tasksView.innerHTML = ''; //dejamos limpio

    //cuando ejecute este evento voy a tratar de obtener las tareas almacenadas, si devuelve algo van a ser tareas para recorrer

    for(let i = 0; i < tasks.length; i++) {
        let title = tasks[i].title;
        let description = tasks[i].description;

        tasksView.innerHTML += `<div class="card">
        <div class="card-body">
          <p>${title} - ${description}
          <a href="#" onclick="deleteTask('${title}')" class="btn btn-danger ml-5">Delete</a>
          </p>
        </div>
      </div>`;
    }
}

function deleteTask(title) {
    console.log(title)
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    for(let i = 0; i < tasks.length; i++) {
      if(tasks[i].title == title) {
        tasks.splice(i, 1); //sirve para quitar un dato del arreglo
      }
    }
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
    getTask();
  }

getTask();


//datazo El método JSON. parse() analiza una cadena de texto como JSON, transformando opcionalmente el valor producido por el análisis.