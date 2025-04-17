
/******************************/
/****** Rainikka Corprew ******/
/********* JAVASCRIPT *********/
/********** SBA 318 ***********/
/******************************/

/******************************/
/****** EXPRESS SERVER ********/
/******** APPLICATION *********/
/******** 16-APR-2025 *********/

/************ PRE-CODE SET-UP & REQUIREMENTS ************/
/*******************************************************/

/****** REQUIRED INSTALLMENTS *******
 * git init  ~~ git add . ~~  git commit -m "note" ~~ git push
 * npm init -y
 * npm i express pug method-override
 * npm i --save-dev nodemon
 * 9. In package.json file, 
 * replace this key/value pair:
 * 
    * "scripts":  
    * "test": "echo\"Error: no test specified\" && exit 1" 
  * 
  * with this key/value pair ******
  * 
    * "scripts": {
        * "start": "node server.js",
        * "devStart": "nodemon server.js"
   * },
* npm run devStart ~~ when ready to run server: automatically restarts server anytime there are changes to code. ******
 
/****** REQUIRED FOLDERS *******
 * 1. Create Root Folder
 * 2. Create server.js file  (check package.json to make sure thst the value of main: is server.js)
 * 3. Create 'views' folder to store html templates: Pug or EJS
 * 4. For basic html structure, Pug is swift
 * 5. To create pug files, cd to  root directory in VS code terminal, type 'pug -w ./views -o ./public -P'
 * 6. Begin indentation coding in the 'index.pug' file by typing 'doctype html'.
 * 7. In public folder, watch for output of index.html  based on updated of the index.pug file.
 * 8. For javascript integration of code in HTML, EJS is the dynamo
 * 9. Place style.css file and other static files in pubblic folder
 * 10. Create .http file to test routes (employing  shortcut: Command + Option + R )

/************ END OF PRE-CODE SET-UP REQUIREMENTS *************/
/*************************************************************/

/******** Knowledge Inspiration 1 ********
 * 
 * Media Outlet :: Medium.com
 * Title :: Creating a RESTful API with Node.js & Express.js 
 * Creator/Autor :: techiydude
 * 
/******** Knowledge Inspiration 2 ********
 * 
 * Media Outlet :: YouTube.com
 * Title :: Learn Express JSs 
 * Creator/Autor :: WebDevSimplified
 * 
 *****************************************/

/*** Set-Up: Basic Server ***/
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const app = express();

/*** Set-Up: Middleware ***/
app.use(express.static('public')); //static files from page folder
app.set('view engine', 'ejs');  // ejs template engine
app.set('views', './views'); // view static files
app.use(express.urlencoded({ extended: true }));  // access encoded form input data
app.use(bodyParser.json()); //
app.use(methodOverride('_method')); // method override for PUT/DELETE
app.use(express.json()); // putting json capabilities into play


/*** Set-Up: Array of Dummy To-Do Task List ***/
let tasks = [
  { id: 1, task: 'Learn Node.js' },
  { id: 2, task: 'Learn Express.js' },
  { id: 3, task: 'Learn Mongo.db' },
  { id: 4, task: 'Learn React.js' },
  { id: 5, task: 'Build REST API' },
  { id: 6, task: 'Build CRUD Capstone' }
];

/*** Set-Up: Route to Render Landing Page ***/
/*** Get Route ***/
app.get('/', (req, res) => {
  res.render('index', { tasks });
});

/***** API Endpoints for Each Request Type ******/

/** Creating Tasks: Post Request **
 * Endpoint: /tasks
 * HTTP Method: POST
 * Description: Add a New Task
 * Request: ****/
app.post('/tasks', (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    task: req.body.task
  };
  tasks.push(newTask);
  res.redirect('/');
});

/*** Viewing All Tasks: Get Request ***
 * Endpoint: /tasks
 * HTTP Method: GET
 * Description: View All Tasks
 * Request: ****/
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

/*** Updating A Tasks: Put Request ***
 * Endpoint: /tasks/:id   // update task by id
 * HTTP Method: PUT
 * Description: Update A Task
 * Request: ****/
app.put('/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === id);
  tasks[taskIndex].task = req.body.task;
  res.redirect('/');
});

/*** Removing Tasks: Delete Request ***
 * Endpoint: /tasks/:id
 * HTTP Method: DELETE
 * Description: Delete A Task
 * Request: ****/
app.delete('/tasks/:id', (req, res) => {
  const id = Number(req.params.id);
  tasks = tasks.filter(task => task.id !== id);
  res.redirect('/');
});

/** Set-Up: Server Running Start ***/
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});