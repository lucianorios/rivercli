import { promises as fs } from 'fs';

export const createMyapp = async (solution_name, project_name, project_title) => {
      let myapp = getMyapp(project_name, project_title);

      await fs.writeFile(`${solution_name}/lib/my_app.dart`, myapp, 'utf-8');
}

const getMyapp = (project_name, project_title) => {
    let myapp = `
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:${project_name}/config/app_config.dart';
import 'package:${project_name}/config/app_routes.dart';
import 'package:${project_name}/features/home/home_page.dart';
import 'package:${project_name}/features/splash_screen/splash_screen_page.dart';
import 'package:${project_name}/providers/theme_provider.dart';

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  final GlobalKey<NavigatorState> navigatorKey = GlobalKey<NavigatorState>(debugLabel: "navigator");

  @override
  void initState() {
    super.initState();

    AppConfig.navigatorKey = navigatorKey;
  }

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ThemeProvider()),
      ],
      child: Consumer<ThemeProvider>(builder: (c, themeProvider, child) {
        return MaterialApp(
          debugShowCheckedModeBanner: false,
          initialRoute: '/',
          routes: {
            AppRoutes.HOME: (context) => const HomePage(),
          },
          title: '${project_title}',
          navigatorKey: navigatorKey,
          theme: themeProvider.getTheme,
          home: const SplashScreenPage(),
        );
      }),
    );
  }
}
    `;

    return myapp;
}