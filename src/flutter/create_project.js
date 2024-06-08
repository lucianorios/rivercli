import { input, select, Separator } from '@inquirer/prompts';
import { execCommand } from '../flutter/exec_command.js';

export const createFlutterProject = async () => {
    console.log("Iniciando configuração de projeto Flutter");

    let variables = '';
    let multi_packages = '';


    let solution = await input({
        message: 'Informe da pasta do projeto:',
        validate: (value) =>
          new Promise((resolve) => {
            setTimeout(
              () => resolve(value != '' && value != undefined || 'Informe o nome da pasta do projeto!'),
              200,
            );
          }),
      });

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

  let organization = await input({
    message: 'Informe a organização:',
    validate: (value) =>
      new Promise((resolve) => {
        setTimeout(
          () => resolve(value != '' && value != undefined || 'Informe a organização!'),
          200,
        );
      }),
  });

  let project_type = await select({
    message: 'Selecione o tipo do projeto',
    choices: [
      {
        name: 'Normal',
        value: 'normal',
        description: 'Projeto sem dependências de packages',
      },
      {
        name: 'Multipackages',
        value: 'multi',
        description: 'Projeto com depenência de packages personalizados',
      },
      //new Separator(),
      {
        name: 'Package',
        value: 'package',
        description: 'Projeto de package para ser utilizado em outros projetos',
      },
    ],
  });

  if(project_type == 'multi') {
    multi_packages = await input({
      message: 'Informe os packages que farão parte do projeto (separados por vírgula):',
      validate: (value) =>
        new Promise((resolve) => {
          setTimeout(
            () => resolve(value != '' && value != undefined || 'Informe os packages!'),
            200,
          );
        }),
    });
  }

  let hasEnvironmentVariables = await select({
    message: 'Adicionar variáveis de ambiente?',
    choices: [
      {
        name: 'Sim',
        value: 'Sim',
        description: 'Adicionar variáveis de ambiente',
      },
      {
        name: 'Não',
        value: 'Nao',
        description: 'Não adicionar variáveis de ambiente',
      },
    ],
  });

  if(hasEnvironmentVariables == 'Sim') {
    variables = await input({
      message: 'Informe as variaveis de ambiente (Ex.: VARIAVEL=valor, VARIAVEL2=valor2):',
      validate: (value) =>
        new Promise((resolve) => {
          setTimeout(
            () => resolve(value != '' && value != undefined || 'Informe as variaveis!'),
            200,
          );
        }),
    });
  }


  execCommand(solution, project_name, organization, project_type, multi_packages, variables);


}