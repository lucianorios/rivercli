import { promises as fs } from 'fs';

export const createSplashScreen = async (solution_name, project_name) => {
      let splash = getSplashPage(project_name);

      await fs.mkdir(`${solution_name}/lib/features/splash_screen`);

      await fs.writeFile(`${solution_name}/lib/features/splash_screen/splash_screen_page.dart`, splash, 'utf-8');
}

const getSplashPage = (project_name) => {
    let splash = `
import 'package:flutter/material.dart';
import 'package:${project_name}/config/app_routes.dart';

class SplashScreenPage extends StatefulWidget {
  const SplashScreenPage({super.key});

  @override
  State<SplashScreenPage> createState() => _SplashScreenPageState();
}

class _SplashScreenPageState extends State<SplashScreenPage> {
  @override
  void initState() {
    super.initState();

    Future.delayed(const Duration(seconds: 3), () {
      Navigator.pushReplacementNamed(context, AppRoutes.HOME);
    });
  }

  @override
  Widget build(BuildContext context) {
    return const Center(
      child: CircularProgressIndicator(),
    );
  }
}
    `;

    return splash;
}
