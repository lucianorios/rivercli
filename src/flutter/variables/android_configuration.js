import { promises as fs } from 'fs';
import path from 'path';

export const generateEnvironmentConfigurationAndroid = async (solution_name, variables) => {
    try{
        let filePath = path.join(solution_name, 'android', 'app', 'build.gradle');

        const data = await fs.readFile(filePath, 'utf-8');

        let content = `
def dartEnvironmentVariables = [
    ${variables.map(variable => `${variable.name}: null`).join(',\n    ')}
];
if (project.hasProperty('dart-defines')) {
    dartEnvironmentVariables = dartEnvironmentVariables + project.property('dart-defines')
            .split(',')
            .collectEntries { entry ->
                def pair = new String(entry.decodeBase64(), 'UTF-8').split('=')
                [(pair.first()): pair.last()]
            }
}
        `;

        const updatedContent = content + '\n\n' + data;

        await fs.writeFile(filePath, updatedContent, 'utf-8');
    } catch (err) {
        console.error(`Erro ao processar o arquivo: ${err.message}`);
    }
}