var mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123",
  database: "company",
});

function askQuestion() {
  inquirer
    .prompt([
      {
        name: "options",
        type: "list",
        message: "what you want to do next:?",
        choices: [
          "1-view all departments",
          "2-view all roles",
          "3-view all employees",
          "4-add a department",
          "5-add a role",
          "6-add an employee",
          "7-update an employee role",
          "8-Quite",
        ],
      },
    ])
    .then((answer) => {
      const option = answer.options[0];

      switch (option) {
        case "1":
          displayAll("departments");
          break;

        case "2":
          displayAll("role");
          break;

        case "3":
          displayAll("employee");
          break;
        case "4":
          addDepartment();
          break;
        case "5":
          addRole();
          break;
        case "6":
          addEmployee();
          break;
        case "7":
          updateEmployee();
          break;
        case "8":
          console.log("Thank you for using our app");
          return;
          break;
      }
    });
}
function displayAll(table) {
  console.log("Display All " + table);
  con.connect(function (err) {
    if (err) throw err;
    const sql = `SELECT * FROM ${table}`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;

      console.table(result);

      askQuestion();
    });
  });
}
function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "what is the department name?",
        name: "department",
      },
    ])
    .then((answer) => {
      con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = `INSERT INTO departments (name) VALUES ('${answer.department}')`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log(`${answer.department} record inserted into departments`);
          askQuestion();
        });
      });
    });
}
function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "what is the role name?",
        name: "role_name",
      },
      {
        type: "input",
        message: "what is the role salary?",
        name: "role_salary",
      },
      {
        type: "input",
        message: "what is the role department id?",
        name: "role_department",
      },
    ])
    .then((answer) => {
      con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
        var sql = `INSERT INTO role (title,salary,department_id) VALUES ('${answer.role_name}','${answer.role_salary}',${answer.role_department})`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log(`${answer.role_name} record inserted into roles`);
          askQuestion();
        });
      });
    });
}

askQuestion();
