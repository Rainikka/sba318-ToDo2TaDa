
/******************************/
/****** Rainikka Corprew ******/
/********* JAVASCRIPT *********/
/********** SBA 318 ***********/
/******************************/

/******************************/
/****** EXPRESS SERVER ********/
/******** APPLICATION *********/
/******** 17-APR-2025 *********/

/************ PRE-CODE SET-UP & REQUIREMENTS ************/
/*******************************************************/

/****** GIT & NODE INITIALIZATIONS *******
 * git init  ~~ git add . ~~  git commit -m "note" ~~ git push
 * npm init -y
 * npm i express body-parser method-override ejs dotenv
 * npm i --save-dev nodemon
 
 * In package.json file, 
 * replace this key/value pair:
    * "scripts":  
       -"test": "echo\"Error: no test specified\" && exit 1"
  
  * with this key/value pair ******
    * "scripts": {
        - "start": "node server.js",
        - "devStart": "nodemon server.js"
   * },

/****** STARTING UP THE SERVER ENGINE *******   
 *  
 * node start ~~- One server run 
 * nodemon devStart ~~ automatically restarts server with everye change in code 
 * 
/*******************************************************/

/****** REQUIRED STRUCTURE *******
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
 * 
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
/******** Knowledge Inspiration 3 ********
 * 
 * Media Outlet :: LinkedInLearning
 * Title :: Learning Restful APIs 
 * Creator/Autor :: Morten Rand-Hendriksen
 * 
/******** Knowledge Inspiration 4 ********
 * 
 * Media Outlet :: Medium.com
  * Title :: Hosting a JSON API on GitHub Pages
  * Creator / Autor :: Vistor Scholz
  * 
 *****************************************/


/*** Set-Up: Basic Server ***/
const express = require('express');
const app = express();
const PORT = 3000;

/*** Set-Up: Middleware ***/
app.use(express.json()); /* putting json capabilities into play */
app.use(express.static('public')); /* static files from page folder */
app.set('views', 'views'); /*set view engine path */
app.set('view engine', 'ejs'); /* ejs template engine */
app.use(express.urlencoded({ extended: true })); /* access encoded form input data */
const methodOverride = require('method-override');
app.use(methodOverride('_method')); /* allows forms to respond to PUT & DELETE requests */

/*** Set-Up: Route to Render Landing Page ***/
app.get('/', (req, res) => {
  res.render('index', { tasks: tasks });
});

/*** Set-Up: Array of Dummy To-Do Task List ***/
let tasks = [
  { id: 1, task: 'Learn Node.js' },
  { id: 2, task: 'Learn Express.js' },
  { id: 3, task: 'Build API Restfully' },
  { id: 4, task: 'Learn Mongo.db' },
  { id: 5, task: 'Learn React.js' },
  { id: 6, task: 'Build CRUD Capstone' },
  { id: 7, task: 'Get Better Sleep' }
];

/***** API Endpoints for Each Request Type ******/

/*** Route:GET::All To-Do Tasks ***
 * Endpoint: /tasks
 * HTTP Method: GET
 * Description: View All Tasks
 * Request: ****/
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

/*** Route:GET::Singleton To-Do Task ***
 * Endpoint: /tasks/:id
 * HTTP Method: GET
 * Description: View Singleton Task
 * Request: ****/
app.get('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  // if (!task) return res.status(404).send('Task not found');
  res.json(task);
});

/*** Route:POST::New To-Do Task ***
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

/*** Route:PUT::Updating A To-Do Task ***
 * Endpoint: /tasks/:id 
 * HTTP Method: PUT
 * Description: Update A Task
 * Request: ****/
app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).send('Task not found');

  task.task = req.body.task;
  res.json(task);
});

/*** Route:DELETE::Remove A To-Do Task ***
 * Endpoint: /tasks/:id
 * HTTP Method: DELETE
 * Description: Delete A Task
 * Request: ****/
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== taskId);
  res.redirect('/');
});

/** Set-Up: Server Running Start ***/
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});