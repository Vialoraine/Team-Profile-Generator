const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const Employee = require("./lib/Employee");

let team = []

const finish = () => {
  let htmlPage = render(team)
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR)
  }
  fs.writeFile(outputPath, htmlPage, err => {
    if (err) {
      console.log(err)
    }
  })
}

const addMember = () => {
  let role = ''
  inquirer.prompt([{
    type: 'list',
    name: 'type',
    message: 'Is this employee an Engineer or an Intern:',
    choices: ['Engineer', 'Intern']
  }])
    .then(({ type }) => {
      role = type
      if (role === 'Engineer') {
        inquirer.prompt([
          {
            type: 'input',
            name: 'name',
            message: `What is their name:`
          },
          {
            type: 'input',
            name: 'id',
            message: `What is their id:`
          },
          {
            type: 'input',
            name: 'email',
            message: `What is their email:`
          },
          {
            type: 'input',
            name: 'github',
            message: `What is their github:`
          },
          {
            type: 'list',
            name: 'newMember',
            message: `Would you like to add a team member:`,
            choices: ['Yes', 'No']
          }])
          .then(({ name, id, email, github, newMember }) => {
            team.push(new Engineer(name, id, email, github,))
            if (newMember === 'Yes') {
              addMember()
            } else {
              finish()
            }
          })
      } else {
        inquirer.prompt([
          {
            type: 'input',
            name: 'name',
            message: `What is their name:`
          },
          {
            type: 'input',
            name: 'id',
            message: `What is their id:`
          },
          {
            type: 'input',
            name: 'email',
            message: `What is their email:`
          },
          {
            type: 'input',
            name: 'school',
            message: `What school do they go to:`
          },
          {
            type: 'list',
            name: 'newMember',
            message: `Would you like to add a team member:`,
            choices: ['Yes', 'No']
          }])
          .then(({ name, id, email, school, newMember }) => {
            team.push(new Intern(name, id, email, school,))
            if (newMember === 'Yes') {
              addMember()
            } else {
              finish()
            }
          })
      }
    })
    .catch(err => console.log(err))
}

const createTeam = () => {
  inquirer.prompt([{
    type: 'input',
    name: 'name',
    message: `What is the manager's name:`
  },
  {
    type: 'input',
    name: 'id',
    message: `What is their id:`
  },
  {
    type: 'input',
    name: 'email',
    message: `What is their email:`
  },
  {
    type: 'input',
    name: 'officeNumber',
    message: `What is their office number:`
  },
  {
    type: 'list',
    name: 'newMember',
    message: `Would you like to add a team member:`,
    choices: ['Yes', 'No']
  }
  ])
    .then(({ name, id, email, officeNumber, newMember }) => {
      team.push(new Manager(name, id, email, officeNumber))
      if (newMember === 'Yes') {
        console.log(
          'run'
        )
        addMember()
      } else {
        finish()
      }
    })
    .catch(err => console.log(err))
}

createTeam()