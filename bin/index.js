#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import { createFlutterProject } from "../src/flutter/create_project.js";

console.log(
  chalk.yellow(figlet.textSync("River CLI", { horizontalLayout: "full" }))
);

program.version("0.1.0").description("Rivwer CLI");

program.action(async () => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Selecione uma plataforma:",
        choices: ["Angular", "C#", "Flutter", "React"],
      },
    ])
    .then(async (answers) => {
      switch(answers.choice) {
        case 'Angular':
          console.log(chalk.green(`Angular!`));
          break;
        case 'C#':
          console.log(chalk.green(`C#!`));
          break;
        case 'Flutter':
          await createFlutterProject();
          break;
        case 'React':
          console.log(chalk.green(`React!`));
          break;
        default:
          console.log(chalk.red(`Plataformas disponíveis:`));
      }


    });
  });

/*program.version("0.1.0")
  .description("Rivwer CLI")
  .option("-p", "--platform <type>", "Plataforma")
  .action((options) => {
    console.log(`Platform, ${options.platform}!`);
    console.log(`Platform, ${options.p}!`);

    switch(options.platform) {
      case 'flutter':
        console.log(chalk.green(`Flutter!`));
        break;
      case 'c#':
        console.log(chalk.green(`C#!`));
        break;
      default:
        console.log(chalk.red(`Plataformas disponíveis:`));
        console.log(chalk.cyan(`-p flutter (--platform flutter)`));
        console.log(chalk.cyan(`-p c# (--platform c#)`));
    }

    console.log(`Hey, ${options.platform}!`);
  });*/

/*program.action(async () => {
  let organization = '';

  let project_name = await input({
    message: 'Informe o nome do app:',
    validate: (value) =>
      new Promise((resolve) => {
        setTimeout(
          () => resolve(value != '' && value != undefined || 'Informe o nome do app!'),
          200,
        );
      }),
  });

  inquirer
    .prompt([
      {
        type: "input",
        name: "organization",
        message: "Informe o nome da organização:",
      },
      {
        type: "list",
        name: "choice",
        message: "Choose an option:",
        choices: ["Simples", "Multi packages", "Package"],
      },
    ])
    .then(async (answers) => {
      organization = answers.organization;

      console.log(chalk.green(`Organization, ${organization}!`));
      console.log(chalk.green(`Project Name, ${project_name}!`));

      let answer = await input({
        message: '(Slow validation) provide a number:',
        validate: (value) =>
          new Promise((resolve) => {
            setTimeout(
              () => resolve(!Number.isNaN(Number(value)) || 'You must provide a number'),
              3000,
            );
          }),
      });
      console.log('Answer:', answer);

      if (answers.choice === "Simples") {
        console.log(chalk.green("Simples!"));
      } else if (answers.choice === "Multi packages") {
        console.log(chalk.green("Multi packages!"));
      } else if (answers.choice === "Package") {
        console.log(chalk.green("Package!"));
      }

      const spinner = ora(`Doing ${answers.choice}...`).start(); // Start the spinner

      setTimeout(() => {
        spinner.succeed(chalk.green("Done!"));
      }, 3000);
    });
});*/

program.parse(process.argv);