# Get Started

The Flutter List Table (Multi Column List View) is a list view with multi column scalable, customizable, draggable splitter inspired by multi_split_view.

Flutter provides the commonly used one-dimensional ListView component. However, in the desktop environment, two-dimensional tables are a very common requirement, and at the same time, rich mouse operations need to be supported as well.

The Flutter List Table combines MultiSplitView and ListView, achieving the functionality of dragging to adjust column widths, supporting row-level single-click and double-click events, as well as flexibly controlling different right-click events for visible elements and blank areas, which can meet the complex interaction requirements of tables.

![Alt](/imgs/res/demo.png)

## Install dependencies

Add this to your package's pubspec.yaml file:

```
  dependencies:
    multi_column_list_view: {current_version}
```

## Full demo useage

In this demo, it shows how to use it for add events support, like tap, double-tap, right-click on row, right-click on list table.

```dart
import 'package:flutter/material.dart';
import 'package:multi_column_list_view/multi_column_list_view.dart';

void main() {
  runApp(const MyApp());
}

/// The main application widget.
class MyApp extends StatelessWidget {
  /// Creates a new instance of [MyApp].
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Multi Column List View Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Multi Column List View Demo Home Page'),
    );
  }
}

/// The main application widget.
class MyHomePage extends StatefulWidget {

  /// Creates a new instance of [MyHomePage].
  const MyHomePage({super.key, required this.title});

  /// The title of the application.
  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  final List<double> _columnWidths = [100, 200, 100, 100];
  final MultiColumnListController _controller = MultiColumnListController();
  String _msg = "";

  @override
  void initState() {
    super.initState();

    loadUsers();
  }

  loadUsers() {
    for (var row in users.sublist(0, 10)) {
      _controller.rows.value.add(UserInfo.fromJson(row));
    }
  }

  @override
  Widget build(BuildContext context) {
    List<Widget> columnTitles = [
      const Text("ID"),
      const Text("Name"),
      const Text("Gender"),
      const Text("Address"),
    ];

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Theme.of(context).colorScheme.inversePrimary,
        title: Text(widget.title),
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          children: [
            Expanded(
              child: MultiColumnListView(
                  hoveredRowColor: Colors.blue,
                  tappedRowColor: Colors.grey,
                  controller: _controller,
                  columnWidths: _columnWidths,
                  columnTitles: columnTitles,
                  onRowTap: (int rowIdx) {
                    showSnakeBarMsg("Tapped row #${rowIdx + 1}.");
                  },
                  onRowDoubleTap: (int rowIdx) {
                    showSnakeBarMsg("Double tapped row #${rowIdx + 1}.");
                  },
                  onRowContextMenu: (TapDownDetails details, int rowIdx) {
                    showSnakeBarMsg(
                        "You can custom row context menu for row #${rowIdx + 1}.");
                  },
                  onListContextMenu: (TapDownDetails details) {
                    showSnakeBarMsg(
                        "You can custom list context menu for blank area in row cells.");
                  },
                  rowCellsBuilder: (BuildContext context, int rowIdx) {
                    UserInfo user = _controller.rows.value[rowIdx] as UserInfo;
                    return [
                      Text("${user.id}"),
                      Text("${user.name} ${user.lastName}"),
                      Text(user.gender),
                      Text(
                        user.address,
                      ),
                    ];
                  }),
            ),
            Container(
              color: Theme.of(context).appBarTheme.backgroundColor,
              child: Center(
                child: Text(_msg),
              ),
            ),
          ],
        ),
      ),
    );
  }

  showSnakeBarMsg(String msg) {
    setState(() {
      _msg = msg;
    });
  }
}


class UserInfo {
  int id;
  String name;
  String lastName;
  String gender;
  String address;

  UserInfo(this.id, this.name, this.lastName, this.gender, this.address);

  factory UserInfo.fromJson(Map<String, dynamic> json) {
    return UserInfo(
      json['id'],
      json['name'],
      json['last_name'],
      json['gender'],
      json['address'],
    );
  }
}

List<Map<String, dynamic>> users = [
  {
    "id": 1,
    "name": "Bryant",
    "last_name": "Blazic",
    "gender": "Male",
    "address": "4772 Tennessee Parkway"
  },
  {
    "id": 2,
    "name": "Sharron",
    "last_name": "Hamments",
    "gender": "Female",
    "address": "0067 6th Court"
  },
  {
    "id": 3,
    "name": "Neville",
    "last_name": "Babin",
    "gender": "Male",
    "address": "44 Brown Court"
  }
];
```


<!-- ## Layouts and customization

Here are common configuration controlling layout of `@vuepress/theme-default`:

- [navbar][]
- [sidebar][]

Check [default theme docs][default-theme] for full reference.

You can [add extra style][style] with `.vuepress/styles/index.scss` file.

[routing]: https://vuejs.press/guide/page.html#routing
[content]: https://vuejs.press/guide/page.html#content
[synatex-extensions]: https://vuejs.press/guide/markdown.html#syntax-extensions
[vue-feature]: https://vuejs.press/guide/markdown.html#using-vue-in-markdown
[config]: https://vuejs.press/guide/configuration.html#client-config-file
[client-config]: https://vuejs.press/guide/configuration.html#client-config-file
[frontmatter]: https://vuejs.press/guide/page.html#frontmatter
[navbar]: https://vuejs.press/reference/default-theme/config.html#navbar
[sidebar]: https://vuejs.press/reference/default-theme/config.html#sidebar
[default-theme]: https://vuejs.press/reference/default-theme/
[style]: https://vuejs.press/reference/default-theme/styles.html#style-file -->
