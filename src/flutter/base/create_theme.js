import { promises as fs } from 'fs';

export const createTheme = async (solution_name, primaryColor) => {
      let theme = getTheme(primaryColor);

      await fs.writeFile(`${solution_name}/lib/providers/theme_provider.dart`, theme, 'utf-8');
}

const getTheme = (primaryColor) => {
    let cor = primaryColor;

    if(!primaryColor.startsWith('#')){
        primaryColor = `#${primaryColor}`;
    }

    let theme = `
import 'package:flutter/material.dart';

class ThemeProvider extends ChangeNotifier {
  late ThemeData _themeData;
  final defaultColor = '${primaryColor}';

  ThemeProvider() {
    setPrimaryColor(defaultColor);
  }

  get getTheme => _themeData;

  Color fromHex(String hexString) {
    final buffer = StringBuffer();
    if (hexString.length == 6 || hexString.length == 7) buffer.write('ff');
    buffer.write(hexString.replaceFirst('#', ''));
    return Color(int.parse(buffer.toString(), radix: 16));
  }

  MaterialColor materialColorFromHexadecimal(String hexString) {
    final buffer = StringBuffer();
    if (hexString.length == 6 || hexString.length == 7) buffer.write('ff');

    buffer.write(hexString.replaceFirst('#', ''));

    var cor = Color(int.parse(buffer.toString(), radix: 16));

    Map<int, Color> color = {
      50: cor.withOpacity(0.1),
      100: cor.withOpacity(0.2),
      200: cor.withOpacity(0.3),
      300: cor.withOpacity(0.4),
      400: cor.withOpacity(0.5),
      500: cor.withOpacity(0.6),
      600: cor.withOpacity(0.7),
      700: cor.withOpacity(0.8),
      800: cor.withOpacity(0.9),
      900: cor.withOpacity(1.0),
    };

    return MaterialColor(cor.value, color);
  }

  void setTheme(ThemeData theme) {
    _themeData = theme;
    notifyListeners();
  }

  void setDefaultTheme() {
    setPrimaryColor(defaultColor);
  }

  void setPrimaryColor(String cor) {
    var primaryColor = fromHex(cor);
    var swatchColor = materialColorFromHexadecimal(cor);
    var backgroundColor = const Color(0xFFF0F3F8);

    _themeData = ThemeData(
      colorScheme: ColorScheme.fromSeed(seedColor: primaryColor),
      useMaterial3: false,
      primarySwatch: swatchColor,
      scaffoldBackgroundColor: backgroundColor,
      fontFamily: 'Montserrat',
      buttonTheme: ButtonThemeData(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(18.0)),
        buttonColor: primaryColor,
      ),
      iconButtonTheme: IconButtonThemeData(
        style: ButtonStyle(
          backgroundColor: WidgetStateColor.resolveWith((states) => backgroundColor),
        ),
      ),
      /*appBarTheme: const AppBarTheme(
        color: primaryColor,
        foregroundColor: Colors.black54,
      ),*/
      /*textTheme: const TextTheme().apply(
        bodyColor: Colors.black87,
        displayColor: Colors.black87,
      ),*/
      textTheme: TextTheme(
        displayLarge: const TextStyle(fontSize: 96, fontWeight: FontWeight.w300, color: Colors.black87),
        displayMedium: const TextStyle(fontSize: 60, fontWeight: FontWeight.w400, color: Colors.black87),
        displaySmall: const TextStyle(fontSize: 48, fontWeight: FontWeight.w400, color: Colors.black87),
        headlineMedium: const TextStyle(fontSize: 34, fontWeight: FontWeight.w400, color: Colors.black87),
        headlineSmall: const TextStyle(fontSize: 24, fontWeight: FontWeight.w400, color: Colors.black87),
        titleLarge: const TextStyle(fontSize: 20, fontWeight: FontWeight.w400, color: Colors.black87),
        bodyLarge: const TextStyle(fontSize: 16, fontWeight: FontWeight.w400, color: Colors.black87),
        bodyMedium: const TextStyle(fontSize: 14, fontWeight: FontWeight.w400, color: Colors.black87),
        bodySmall: const TextStyle(fontSize: 12, fontWeight: FontWeight.w400, color: Colors.black87),
        labelLarge: const TextStyle(fontSize: 14, fontWeight: FontWeight.w500, color: Colors.white),
        titleMedium: TextStyle(fontSize: 18, fontWeight: FontWeight.w500, color: Colors.grey.shade900),
        titleSmall: TextStyle(fontSize: 18, fontWeight: FontWeight.w500, color: Colors.grey.shade500),
      ),
      inputDecorationTheme: InputDecorationTheme(
        contentPadding: const EdgeInsets.all(10),
        filled: true,
        fillColor: Colors.white54,
        iconColor: Colors.black54,
        hintStyle: const TextStyle(color: Colors.black54, fontSize: 15),
        labelStyle: const TextStyle(color: Colors.black54, fontSize: 15),
        errorBorder: OutlineInputBorder(borderSide: BorderSide(color: Colors.red.shade300, width: 2.0), borderRadius: BorderRadius.circular(5.0)),
        focusedBorder: OutlineInputBorder(borderSide: BorderSide(color: Colors.grey.shade300, width: 2.0), borderRadius: BorderRadius.circular(5.0)),
        enabledBorder: OutlineInputBorder(borderSide: BorderSide(color: Colors.grey.shade300, width: 1), borderRadius: BorderRadius.circular(5.0)),
        disabledBorder: OutlineInputBorder(borderSide: BorderSide(color: Colors.grey.shade300, width: 1), borderRadius: BorderRadius.circular(5.0)),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          textStyle: const TextStyle(
            fontSize: 18,
          ),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          textStyle: const TextStyle(
            fontSize: 18,
          ),
          side: BorderSide(
            width: 1.0,
            color: primaryColor,
            style: BorderStyle.solid,
          ),
        ),
      ),
      iconTheme: IconThemeData(
        color: primaryColor,
      ),
      cardTheme: CardTheme(
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(5.0),
        ),
      ),
    );
    notifyListeners();
  }
}
    `;

    return theme;
}