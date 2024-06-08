import { promises as fs } from 'fs';

export const generateVsCodeConfiguration = async (solution_name, variables) => {
    let json = _createVsCodeConfigurationJson(variables);

    await fs.mkdir(`${solution_name}/.vscode`);

    await fs.writeFile(`${solution_name}/.vscode/launch.json`, JSON.stringify(json, null, 2));
}


const _createVsCodeConfigurationJson = (variables) => {
    let arrVariables = [];

    variables.forEach(variable => {
        arrVariables.push(`--dart-define=${variable.name}=${variable.value}`);
    });

    let json = {
        "version": "0.2.0",
        "configurations": [
            {
                "name": "Android Local",
                "request": "launch",
                "type": "dart",
                "args": arrVariables,
            },
            {
                "name": "IOS Local",
                "request": "launch",
                "type": "dart",
                "args": arrVariables,
            },
            {
                "name": "Development",
                "request": "launch",
                "type": "dart",
                "args": arrVariables,
            },
            {
                "name": "Production",
                "request": "launch",
                "type": "dart",
                "args": arrVariables,
            },
        ]
    };

    return json;
}