import { promises as fs } from 'fs';

export const createHome = async (solution_name, project_name, project_title) => {
      let home = getHome(project_name, project_title);
      await fs.mkdir(`${solution_name}/lib/features/home`);
      await fs.writeFile(`${solution_name}/lib/features/home/home_page.dart`, home, 'utf-8');

      let service = getService(project_name);
      await fs.mkdir(`${solution_name}/lib/features/home/services`);
      await fs.writeFile(`${solution_name}/lib/features/home/services/person_service.dart`, service, 'utf-8');

      let model = getModel();
      await fs.mkdir(`${solution_name}/lib/features/home/models`);
      await fs.writeFile(`${solution_name}/lib/features/home/models/person_model.dart`, model, 'utf-8');

      let widget = getWidget(project_name);
      await fs.mkdir(`${solution_name}/lib/features/home/widgets`);
      await fs.writeFile(`${solution_name}/lib/features/home/widgets/card_person.dart`, widget, 'utf-8');
}

const getHome = (project_name, project_title) => {
    let home = `
import 'package:flutter/material.dart';
import 'package:${project_name}/features/home/models/person_model.dart';
import 'package:${project_name}/features/home/services/person_service.dart';
import 'package:${project_name}/features/home/widgets/card_person.dart';

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
        title: const Text('${project_title}'),
      ),
      body: SingleChildScrollView(
        child: FutureBuilder<List<PersonModel>>(
          future: PersonService().getAll(),
          builder: (context, snapshot) {
            if (snapshot.hasData) {
              return Column(
                children: snapshot.data!.map((e) => CardPerson(e)).toList(),
              );
            } else if (snapshot.hasError) {
              return Text(snapshot.error.toString());
            }
            return const Center(
              child: CircularProgressIndicator(),
            );
          },
        ),
      ),    );
  }
}

    `;

    return home;
}

const getService = (project_name) => {
  return `
import 'package:flutter_riverbase/services/base_service.dart';
import 'package:${project_name}/config/app_environment.dart';
import 'package:${project_name}/features/home/models/person_model.dart';

class PersonService extends BaseService<PersonModel> {
  PersonService() : super(PersonModel.fromJson, AppEnvironment.instance.apiUrl);

  Future<List<PersonModel>> getAll() async {
    final response = await manager.getDynamic('$baseUrl/people');

    var lista = response.data['results'].map((e) => PersonModel.fromJson(e)).cast<PersonModel>().toList();

    return lista;
  }
}
  `;
}

const getModel = () => {
  return `
import 'package:flutter_riverbase/http/base_model.dart';
import 'package:json_annotation/json_annotation.dart';

part 'person_model.g.dart';

@JsonSerializable()
class PersonModel extends BaseModel {
  String name;
  String gender;

  PersonModel({required this.name, required this.gender});

  factory PersonModel.fromJson(Map<String, dynamic> json) => _$PersonModelFromJson(json);

  Map<String, dynamic> toJson() => _$PersonModelToJson(this);

  @override
  fromJson(Map<String, dynamic> json) => _$PersonModelFromJson(json);
}
  `;
}

const getWidget = (project_name) => {
  return `
import 'package:flutter/material.dart';
import 'package:${project_name}/features/home/models/person_model.dart';

class CardPerson extends StatelessWidget {
  final PersonModel person;

  const CardPerson(this.person, {super.key});

  @override
  Widget build(BuildContext context) {
    return Card(
      child: ListTile(
        title: Text(person.name),
        subtitle: Text(person.gender),
      ),
    );
  }
}
  `;
}