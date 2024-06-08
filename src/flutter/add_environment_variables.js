
import { generateVsCodeConfiguration } from "./variables/vscode_configuration.js";
import { generateEnvironmentConfiguration } from "./variables/environment_configuration.js";
import { generateEnvironmentConfigurationAndroid } from "./variables/android_configuration.js";

export const addEnvironmentVariables = async (solution_name, variables) => {
    let arrVariable = [];

    variables.split(',').forEach(variable => {
        let item = variable.trim().split('=');
        arrVariable.push({ name: item[0].toUpperCase().trim(), property: toCamelCase(item[0].trim()), value: item[1].trim()});
    });

    await generateVsCodeConfiguration(solution_name, arrVariable);

    await generateEnvironmentConfigurationAndroid(solution_name, arrVariable);

    await generateEnvironmentConfiguration(solution_name, arrVariable);
}

/*const toPascalCase = (string) => {
    return `${string}`
      .toLowerCase()
      .replace(new RegExp(/[-_]+/, 'g'), ' ')
      .replace(new RegExp(/[^\w\s]/, 'g'), '')
      .replace(
        new RegExp(/\s+(.)(\w*)/, 'g'),
        ($1, $2, $3) => `${$2.toUpperCase() + $3}`
      )
      .replace(new RegExp(/\w/), s => s.toUpperCase());
  }*/

  const toCamelCase = (string) => {
    const words = string.split(/[-_\s]+/);

    const firstWord = words[0].toLowerCase();

    const camelCaseWords = words.slice(1).map(word => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    return [firstWord, ...camelCaseWords].join('');
  }