import { promises as fs } from 'fs';
import path from 'path';

export const addRiverbase = async (solution_name) => {
    try{
        let filePath = path.join(solution_name, 'pubspec.yaml');

        const data = await fs.readFile(filePath, 'utf-8');

        const lines = data.split('\n');

        const index = lines.findIndex(line => line.trim() === 'dev_dependencies:');

        if (index !== -1) {
            lines.splice(index, 0, '  flutter_riverbase:\n    git: https://github.com/lucianorios/flutter_riverbase.git\n\n');
        } else {
            throw new Error('"dev_dependencies:" não encontrado no arquivo.');
        }

        const newData = lines.join('\n');

        await fs.writeFile(filePath, newData, 'utf-8');
    } catch (err) {
        console.error(`Erro ao processar o arquivo: ${err.message}`);
    }
}