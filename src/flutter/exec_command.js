import chalk from "chalk";
import ora from "ora";

import { exec as execCb } from "node:child_process";
import { promisify } from "node:util";
import fs from 'fs';
import { addRiverbase } from "./add_riverbase.js";
import { addPackages } from "./add_packages.js";
import { addEnvironmentVariables } from "./add_environment_variables.js";
import { createBaseStructure } from "./base/create_base_structure.js";

const exec = promisify(execCb);

export const execCommand = async (solution_name, project_name, organization, project_type, multi_packages, variables, primaryColor, project_title) => {
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

      await addRiverbase(solution_name);

      if(project_type != 'package') {
        if(multi_packages != undefined && multi_packages != '') {
          await addPackages(solution_name, multi_packages);
        }

        await createBaseStructure(solution_name, primaryColor, project_name, project_title);

        if(variables != undefined && variables != '') {
          await addEnvironmentVariables(solution_name, variables);
        }
      }

      spinner.succeed(chalk.green("Projeto criado com sucesso!"));

      try{
      const spinner2 = ora(`Configurando projeto...`).start(); // Start the spinner

      await exec(`cd ${solution_name} && flutter pub get && flutter pub run build_runner build --delete-conflicting-outputs && code .`);

      spinner2.succeed(chalk.green("Projeto configurado com sucesso!"));
      }catch(er){
        throw er;
      }
    }catch(err){
      console.log(err);
      spinner.fail(chalk.red(err));
    }
};