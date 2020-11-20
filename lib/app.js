const Employee = require("./Employee");
const Manager = require("./Manager");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const inquirer = require("inquirer");


class App {

  constructor() {

    this.employees = [];
    this.employeePrompt = [
      {
        type: "input",
        message: "What is your name?",
        name: "name"
      },
      {
        type: "input",
        message: "What is your id?",
        name: "id"
      },
      {
        type: "input",
        message: "What is your email?",
        name: "email"
      }
    ];
    this.managerPrompt = this.employeePrompt.concat([
      {
        type: "input",
        message: "What is your office number?",
        name: "officeN"
      }
    ]);
    this.engineerPrompt = this.engineerPrompt.concat([
      {
        type: "input",
        message: "What is your GitHub?",
        name: "github"
      }
    ]);
    this.internPrompt = this.internPrompt.concat([
      {
        type: "input",
        message: "What is your school?",
        name: "school"
      }
    ]);

  }


  start() {
    this.running = true;
    this.nextEmployee();
  }


  end() {
    console.log("Team Profile Generated.");
  }



  nextEmployee() {
    this.promptRole().then((role)) => {
      if (role === "Exit") {
        this.processEmployees();
        this.end();
      }
      else {
        this.promptInfo(role).then((data) => {
          switch (role) {
            case "Manager":
              var employee = new Manager(data.name, data.id, data.email, data.officeN);
              break;
            case "Engineer":
              var employee = new Engineer(data.name, data.id, data.email, data.github);
              break;
            case "Intern":
              var employee = new Intern(data.name, data.id, data.email, data.school);
              break;
          }
          this.employees.push(employee);
          this.nextEmployee();
        });
      }
    });

  }


  promptRole() {
    return inquirer.prompt([
      {
        type: "list",
        message: "Enter your role",
        name: "role",
        choices: ["Manager", "Engineer", "Intern", "Exit"]
      }
    ]).then(function (data) {
      return (data.role);
    }).catch(function (error) {
      console.log(error);
    });
  }


  promptInfo(role {

    switch (role) {
      case "Manager":
        return inquirer.prompt(this.managerPrompt).then(function (data) {
        });
        break;
      case "Engineer":
        return inquirer.prompt(this.engineerPrompt).then(function (data) {
          return data;
        });
        break;
      case "Intern":
        return inquirer.prompt(this.internPrompt).then(function (data) {
          return data;
        });
        break;   
    }
  }


  processEmployees () {
    this.employees.forEach(e => {
      console.log(`Processing ${role}: ${data.name} `);
    });
    
  }

}


module.exports = App;

// const Manager = require("./Manager");
// const Engineer = require("./Engineer");
// const Intern = require("./Intern");
// const inquirer = require("inquirer");
// const path = require("path");
// const fs = require("fs");

// const OUTPUT_DIR = path.resolve(__dirname, "output");
// const outputPath = path.join(OUTPUT_DIR, "team.html");

// const render = require("./htmlRenderer");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
