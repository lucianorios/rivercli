import chalk from "chalk";
import ora from "ora";

import { exec as execCb } from "node:child_process";
import { promisify } from "node:util";
import fs from 'fs';

const exec = promisify(execCb);

export const execCommand = async (solution_name, project_name, organization, project_type) => {
    let flutter_command = 'flutter create ';

    if(project_type == 'package') {
      flutter_command += '--template=package ';
    }

    if(organization != '' && organization != undefined) {
      flutter_command += `--org ${organization}`;
    }

    flutter_command += ` ${project_name}`;

    const spinner = ora(`Criando projeto...`).start(); // Start the spinner

    try{
      const { error, stdout, stderr } = await exec(flutter_command);

      if(error != null && error != undefined && error != '') {
        spinner.fail(chalk.red(error));
        return;
      }

      if(stderr != null && stderr != undefined && stderr != '') {
        spinner.fail(chalk.red(stderr));
        return;
      }

      console.log('Projeto criado');

    fs.renameSync(project_name, solution_name);

      spinner.succeed(chalk.green("Done!"));
    }catch(err){
      console.log(err);
      spinner.fail(chalk.red(err));
    }
};