import { promises as fs } from 'fs';

export const createHome = async (solution_name, project_name) => {
      let home = getHome(project_name);

      await fs.mkdir(`${solution_name}/lib/features/home`);

      await fs.writeFile(`${solution_name}/lib/features/home/home_page.dart`, home, 'utf-8');
}

const getHome = (project_name) => {
    let home = `
import 'package:flutter/material.dart';

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('App'),
      ),
      body: const Center(
        child: Text('App Base'),
      ),
    );
  }
}

    `;

    return home;
}
