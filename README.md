# **React** To-do List 

## Description

The objective of this challenge was to build a to-do list that uses **React** as the primary framework on the front-end. 

The to-do list should demonstrate the CRUD principles in actions. 

* **C:** Create a new task by entering the task name and assigned to values and hitting the Add Task button.
* **R:** Read the tasks from the database and display them to the user.
* **U:** Update an existing task by assigning a different person to it and/or changing the task name.
* **D:** Delete an existing task.

All of the CRUD actions take place against a PostgreSQL database.

The tasks are listed in order of most recently created.

## Try it yourself

To use the fully functional to-do list, please visit: *coming soon*

## Application demo

![To-do list application](/public/images/react_todo_list.gif)

## Screenshot of database

![To-do list database](/public/images/sql_todo_list_db.png)

### Prerequisites

The following should be installed before attempting to use the to-do list:

- [Node.js](https://nodejs.org/en/) - javascript runtime
- [Express](https://expressjs.com/en/starter/installing.html) - a web framework for Node.js. Can be installed by typing *npm install express* in the terminal.
- [Postgresql](https://www.postgresql.org/) - an open source relational database. Can be installed by typing *npm install pg* in the terminal.
- [Axios](https://axios-http.com/) - Promise based HTTP client. Type *npm install axios* in the terminal to install Axios.
- [sweetAlert2](https://sweetalert2.github.io/) - customizable and accessible popup boxes. Type *npm install sweetalert2* in the terminal to install sweetAlert2

## Installation

In order to get the to-do list up and running, do the following:

1. Download code locally from github.
2. Create the database and corresponding table:

- Using your favorite relational database client (I use Postico(<https://eggerapps.at/postico/>), go to the area/tab that allows you to run a query. Run the query found in the *Create database.sql* file. This will create the weekend_to_do_app database.
- Then, within the weekend_to_do_app database, run the query found in the *Create table tasks.sql* file. This will create the tasks table.

3. Launch the application locally.

- Go to your terminal and type 'npm start server'. This will start a local server on port 5000.
- Open another terminal session and type 'npm start client'. This will start the to-do list on port 3000.

## Usage

1. A user can **create** a new task by entering a task name(required) and assigning a person to the task. The task is saved to the database by clicking on the 'Add Task' button. The list of tasks is updated with the new task.

2. A user can **update** the task by clicking on the pencil button. This will launch a popup that will allow the user to enter a new task name and a new person assigned to the task. After clicking the "ok" button, the list of tasks will be updated with the changes. The database will also have the update.

3. A user can complete a task by clicking on the checkmark button. This will change the background color of the row to green and also place a checkmark box under the column "Completed". A timestamp will be displayed under the "Date Completed" column.

4. A user can also **delete** a task from the list. This is done by clicking on the garbage button. The task will be deleted from the database.

## Built With/Using

- HTML/CSS/JS
- React
- Bootstrap
- sweetalert2
- Node.js
- Axios
- Express
- Postgresql

If you have suggestions or questions, please email me at <jenny_alexander@icloud.com>.