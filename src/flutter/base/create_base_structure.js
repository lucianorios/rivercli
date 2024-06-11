import { promises as fs } from 'fs';
import path from 'path';
import yaml from 'yaml';

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

    await fs.mkdir(`${solution_name}/assets/images`,{ recursive: true });

    await createTheme(solution_name, primaryColor);

    await createAppConfig(solution_name);

    await createAppRoutes(solution_name);

    await createMain(solution_name, project_name);

    await createMyapp(solution_name, project_name, project_title);

    await createHome(solution_name, project_name, project_title);

    await createSplashScreen(solution_name, project_name);

    await addDependences(solution_name);
}

export const addDependences = async (solution_name) => {
    try{
        let filePath = path.join(solution_name, 'pubspec.yaml');

        const data = await fs.readFile(filePath, 'utf-8');

        const pubspec = yaml.parse(data);

        pubspec.dependencies = pubspec.dependencies || {};
        if (!pubspec.dependencies['flutter']) {
            pubspec.dependencies['flutter'] = { sdk: 'flutter' };
        }
        if (!pubspec.dependencies['flutter_localizations']) {
            pubspec.dependencies['flutter_localizations'] = { sdk: 'flutter' };
        }
        if (!pubspec.dependencies['cupertino_icons']) {
            pubspec.dependencies['cupertino_icons'] = '^1.0.6';
        }

        pubspec.dependencies['json_annotation'] = '^4.9.0';
        pubspec.dependencies['provider'] = '^6.1.2';


        pubspec.dev_dependencies = pubspec.dev_dependencies || {};
        if (!pubspec.dev_dependencies['flutter_test']) {
            pubspec.dev_dependencies['flutter_test'] = { sdk: 'flutter' };
        }
        if (!pubspec.dev_dependencies['flutter_lints']) {
            pubspec.dev_dependencies['flutter_lints'] = '^4.0.0';
        }

        pubspec.dev_dependencies = pubspec.dev_dependencies || {};
        pubspec.dev_dependencies['build_runner'] = '^2.4.11';
        pubspec.dev_dependencies['json_serializable'] = '^6.8.0';


        pubspec.flutter = pubspec.flutter || {};
        pubspec.flutter.assets = pubspec.flutter.assets || [];
        if (!pubspec.flutter.assets.includes('assets/images/')) {
        pubspec.flutter.assets.push('assets/images/');
        }

        const newYaml = yaml.stringify(pubspec);

        await fs.writeFile(filePath, newYaml, 'utf-8');
    } catch (err) {
        console.error(`Erro ao processar o arquivo: ${err.message}`);
    }
}