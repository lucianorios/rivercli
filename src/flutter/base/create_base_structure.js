import { promises as fs } from 'fs';
import path from 'path';
import { createTheme } from './create_theme.js';
import { createMain } from './create_main.js';
import { createAppConfig } from './create_app_config.js';
import { createAppRoutes } from './create_app_routes.js';
import { createMyapp } from './create_myapp.js';
import { createHome } from './create_home.js';
import { createSplashScreen } from './create_splash_screen.js';

export const createBaseStructure = async (solution_name, primaryColor, project_name, project_title) => {
    await fs.mkdir(`${solution_name}/lib/features`);

    await fs.mkdir(`${solution_name}/lib/config`);

    await fs.mkdir(`${solution_name}/lib/providers`);

    await fs.mkdir(`${solution_name}/lib/shared`);

    await createTheme(solution_name, primaryColor);

    await createAppConfig(solution_name);

    await createAppRoutes(solution_name);

    await createMain(solution_name, project_name);

    await createMyapp(solution_name, project_name, project_title);

    await createHome(solution_name, project_name);

    await createSplashScreen(solution_name, project_name);

    await addDependences(solution_name);
}

export const addDependences = async (solution_name) => {
    try{
        let filePath = path.join(solution_name, 'pubspec.yaml');

        const data = await fs.readFile(filePath, 'utf-8');

        const lines = data.split('\n');

        const index = lines.findIndex(line => line.trim() === 'sdk: flutter');

        if (index !== -1) {
            lines.splice(index + 1, 0, `\n  flutter_localizations:\n    sdk: flutter\n\n  json_annotation:\n  provider:\n`);
        } else {
            throw new Error('"dev_dependencies:" não encontrado no arquivo.');
        }

        const newData = lines.join('\n');

        await fs.writeFile(filePath, newData, 'utf-8');
    } catch (err) {
        console.error(`Erro ao processar o arquivo: ${err.message}`);
    }
}