import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'yaml';


export const addRiverbase = async (solution_name) => {
    try{
        let filePath = path.join(solution_name, 'pubspec.yaml');

        const data = await fs.readFile(filePath, 'utf-8');

        const pubspec = yaml.parse(data);

        pubspec.dependencies = pubspec.dependencies || {};

        pubspec.dependencies['flutter_riverbase'] = { git: 'https://github.com/lucianorios/flutter_riverbase.git' };

        const newYaml = yaml.stringify(pubspec);

        await fs.writeFile(filePath, newYaml, 'utf-8');
    } catch (err) {
        console.error(`Erro ao processar o arquivo: ${err.message}`);
    }
}