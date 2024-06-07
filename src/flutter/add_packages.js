import { promises as fs } from 'fs';
import path from 'path';
import { promisify } from "node:util";
import { exec as execCb } from "node:child_process";

const exec = promisify(execCb);

export const addPackages = async (solution_name, packages) => {
    try{
        let filePath = path.join(solution_name, 'pubspec.yaml');

        await fs.mkdir(`${solution_name}/packages`, { recursive: true });

        const dependencies = packages.split(',').map(dep => dep.trim());

        const data = await fs.readFile(filePath, 'utf-8');

        const lines = data.split('\n');

        const index = lines.findIndex(line => line.trim() === 'dev_dependencies:');

        if (index !== -1) {
            await createDependencie(solution_name, dependencies);

            dependencies.forEach(async (dep) => {
                lines.splice(index, 0, `  ${dep}:\n    path: packages/${dep}/\n`);
            });
        } else {
            throw new Error('"dev_dependencies:" não encontrado no arquivo.');
        }

        const newData = lines.join('\n');

        await fs.writeFile(filePath, newData, 'utf-8');
    } catch (err) {
        console.error(`Erro ao processar o arquivo: ${err.message}`);
    }
}

const createDependencie = async (solution_name, packages) => {
    let arr = [];
    packages.forEach(str => {
        arr.push(`flutter create --template=package ${solution_name}/packages/${str}`);
    });

    let command = arr.join(' && ');

    const { error, stdout, stderr } = await exec(command);

    if(error != null && error != undefined && error != '') {
        console.log(error);
        throw new Error(error.toString());
        return;
    }

    if(stderr != null && stderr != undefined && stderr != '') {
        console.log(stderr);
        throw new Error(stderr.toString());
      return;
    }


}