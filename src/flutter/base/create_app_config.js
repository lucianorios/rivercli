
import { promises as fs } from 'fs';

export const createAppConfig = async (solution_name) => {
      let config = getConfig();

      await fs.writeFile(`${solution_name}/lib/config/app_config.dart`, config, 'utf-8');
}
const getConfig = () => {
    let config = `
import 'package:flutter/material.dart';

class AppConfig {
  static late GlobalKey<NavigatorState> navigatorKey;
}
    `;

    return config;
}