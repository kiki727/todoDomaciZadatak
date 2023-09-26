const express = require('express')
const bodyParser = require('body-parser')

const PORT = 3000
const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// Serve static files iz 'public' directory
app.use(express.static('public'));

const uidx = function (){
  return Math.floor( Math.random() * Date.now() * 1000 )
}

let todo = [ 
  {
    "id": 1,
    "task": "naslov 1",
    "desc": "opis 1",
    "status": "todo"
},
{
    "id": 2,
    "task": "naslov 2",
    "desc": "opis 2",
    "status": "inprogress"
},
{
    "id": 3,
    "task": "naslov 3",
    "desc": "opis 3",
    "status": "todo"
},
{
  "id": 4,
  "task": "naslov 4",
  "desc": "opis 4",
  "status": "done"
},
{
  "id": 5,
  "task": "naslov 5",
  "desc": "opis 5",
  "status": "done"
}
]

// napravi test niz
let todos = todo.map( (element) => {
  element.id = uidx()
  return element
} )

//console.log( todos )


//rute
app.get('/todos',(req, res ) => {

    
    //posalji json za init frontend
    res.json(todos);
})


//novi todo
app.put('/todos', (req, res) => {

    const { task, desc, status } = req.body;

    console.log(task, desc, status)

    if ( !['todo','inprogress','done'].includes(status) ) {
      return res.status(400).send('Invalid status');
    }


    const newTodo = { id: uidx(), task, desc, status }

    todos.push(newTodo)

    console.log(todos)
    //uspesno dodat
    res.json(todos)
  });


// updejtuj todo sa id  =... put or patch ...=
  app.patch('/todos/:id', (req, res) => {

    const id = parseInt(req.params.id)

    const { task, desc, status } = req.body

        if ( !['todo','inprogress','done'].includes(status) ) {
      return res.status(400).send('Invalid status');
    }

    const index = todos.findIndex(todo => todo.id === id)

    if (index !== -1) {
      todos[index].task = task;
      todos[index].desc = desc;
      todos[index].status = status;
      //res.send('Updated OK');
      res.json(todos)
      console.log(todos)
    } else {
      res.status(404).send('Task not found');
    }

  });


  // delete todo whit id
  app.put('/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    todos = todos.filter(todo => todo.id !== id);

    console.log('delete: ', id, todos)
    res.json({id:id,msg:"OK"});
  });


//start server
app.listen( PORT, () => {
    console.log(`Server start on port ${PORT}`)
})