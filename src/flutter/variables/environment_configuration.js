import { promises as fs } from 'fs';

export const generateEnvironmentConfiguration = async (solution_name, variables) => {
    let classe = _createEnvironmentConfigurationClass(variables);

    try{
        await fs.access(`${solution_name}/config`);
    }catch(err){
        await fs.mkdir(`${solution_name}/config`);
    }

    await fs.writeFile(`${solution_name}/config/environment.dart`, classe, 'utf-8');

    //await fs.writeFile(`${solution_name}/.vscode/launch.json`, JSON.stringify(json, null, 2));
};

const _createEnvironmentConfigurationClass = (variables) => {
    let content = `
    class Environment{

        ${variables.map(variable => `late String _${variable.property};`).join('\n        ')}

        ${variables.map(variable => `String get ${variable.property} => _${variable.property};`).join('\n        ')}

        static Environment get instance => _singleton;
        static final Environment _singleton = Environment._internal();

        factory Environment() => _singleton;

        Environment._internal() {
            init();
        }

        void init() {
           ${variables.map(variable => `_${variable.property} = const String.fromEnvironment('${variable.name}');`).join('\n           ')}
        }
    }
    `;

    return content;
};