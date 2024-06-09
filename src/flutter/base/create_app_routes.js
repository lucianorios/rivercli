
import { promises as fs } from 'fs';

export const createAppRoutes = async (solution_name) => {
      let config = getRoutes();

      await fs.writeFile(`${solution_name}/lib/config/app_routes.dart`, config, 'utf-8');
}
const getRoutes = () => {
    let routes = `
class AppRoutes {
  static const HOME = '/home';
}
    `;

    return routes;
}