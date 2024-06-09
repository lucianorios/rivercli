import { promises as fs } from 'fs';

export const createMain = async (solution_name, project_name) => {
      let main = getMain(project_name);

      await fs.writeFile(`${solution_name}/lib/main.dart`, main, 'utf-8');
}

const getMain = (project_name) => {
    let main = `
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:${project_name}/my_app.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  HttpOverrides.global = MyHttpOverrides();

  runApp(
    const MaterialApp(
      debugShowCheckedModeBanner: false,
      localizationsDelegates: [
        GlobalMaterialLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
      ],
      locale: Locale('pt', 'BR'),
      supportedLocales: [
        Locale('pt', 'BR'),
      ],
      home: MyApp(),
    ),
  );
}

class MyHttpOverrides extends HttpOverrides {
  @override
  HttpClient createHttpClient(SecurityContext? context) {
    return super.createHttpClient(context)..badCertificateCallback = (X509Certificate cert, String host, int port) => true;
  }
}
    `;

    return main;
}
