# Getting started

ShaggySQL is a CLI tool for running SQL queries on data that is stored in flat files.

`shaggy-sql` initiates a shell session:

```bash
shaggy-sql
```

You can end the session by pressing `Ctrl+C`

## Reading data from common formats

### Example 1. CSV

Let's say you have a csv file `my_table.csv`. You can read its contents using `csv.parse()`:

```shaggy-sql
SELECT * FROM csv.parse(fs.read('my_table.csv')) AS my_table;
```

This is a basic select query except that instead of the name of a table after `FROM` there is an expression that returns a table. Let's break it down:

1. `'my_table.csv'` is a string literal
2. `fs` is a module that deals with the filesystem. `fs.read()` is a function that takes a path to a file and returns its content as a string
3. `csv` is a module that deals with csv files. `csv.parse()` is a function that parses the content of a csv file and returns a table

Modules `fs` and `csv` are included (imported) by default, along with some other modules like `json`, `xml` and `str`

### Example 2. JSON

Working with csv files is pretty straightforward, because they are, in essence, tables. Other formats like json are a little more flexible and don't have a "table" type as such

Let's say you have a json file `beatles.json`:

```json
[
    {"name": "Paul", "instrument": "bass"},
    {"name": "Ringo", "instrument": "drums"},
    {"name": "John", "instrument": "guitar"},
    {"name": "George", "instrument": "guitar"}
]
```

You can run a query on its contents using `json.parse()`:

```shaggy-sql
SELECT * FROM table.from_rows(json.parse(fs.read('beatles.json'))) AS beatles;
```

`json.parse()` parses a json string and returns some SQL value. In this case - a list of dictionaries

`table.from_rows()` converts a list of rows (represented as dictionaries) into a table

## shaggy-init files

If you're constantly working with the same files, writing all these queries can be tiring.

There are 2 things you can do:

1. Instead of parsing your file every time you want to run a query, you can do it once and save the result into an in-memory table:

    ```shaggy-sql
    SELECT * INTO my_table FROM csv.parse(fs.read('my_table.csv')) AS my_table;
    ```
2. Instead of writing the same script every time you use the shell, you can create a **`shaggy-init.sql`** file located in your current directory. ShaggySQL will execute this script every time it's loaded. Shaggy-init files can contain any number of valid ShaggySQL statements, and can be used to describe the structure of your flat-file database

    ```shaggy-sql
    -- shaggy-init.sql

    SELECT * INTO beatles FROM table.from_rows(json.parse(fs.read('beatles.json'))) AS beatles;
    ```

    ```
    bash> shaggy-sql
    Running init script shaggy-init.sql
    shaggy> SELECT name, instrument FROM beatles;
    |name    |instrument|
    |'Paul'  |'bass'    |
    |'Ringo' |'drums'   |
    |'John'  |'guitar'  |
    |'George'|'guitar'  |
    ```

## Reading data from arbitrary formats

What if your data is not stored in any easily-parsed, well-known format? This is where **table constructors** come in.

Table constructor is a special type of expression (not found in the SQL standard) that allows you to "construct" or create a table.

Let's say your data is stored across multiple files in a directory named `my_data` where each file is a **JSON Lines** file that looks something like this:

```json
{"name": "James", "last_name": "Smith", "birthyear": 1999}
{"name": "John", "last_name": "Johnson", "birthyear": 1988}
...
```

Then, you can turn this into a table using a **table constructor**:

```shaggy-sql
CREATE TABLE my_data (filename, name, last_name, birthyear)
WHERE
    filename <- fs.dir_entries('my_data'),
    file_line <- str.lines(fs.read(filename)),
    json_content = json.parse(file_line),
    name = json_content['name'],
    last_name = json_content['last_name'],
    birthyear = json_content['birthyear']
;
```

This script will create a table named `my_data` and fill it with data according to the logic provided in the `WHERE` section, i.e. the **table constructor**.

This is what it will look like:

|filename|name|last_name|birthyear|
|-|-|-|-|
|'my_data/file_1.jsonl'|'James'|'Smith'|1999|
|'my_data/file_1.jsonl'|'John'|'Johnson'|1988|
|'my_data/file_2.jsonl'|'Mary'|'Williams'|1977|

...

Let's break it down:

1. `fs.dir_entries()` returns a list of all filepaths that exist in a specified directory
2. `<-` is a **flattening** operator. It takes a list of values and "unfolds" it so that for every element of the list a corresponding row in the table is created, and the value of that element is assigned to the column on the left of the operator
3. `filename <- fs.dir_entries('my_data')` finds all entries in directory `my_data` and writes their paths to the column `filename`
4. `str.lines()` returns a list of lines of a string
5. `file_line <- str.lines(fs.read(filename))` does another unfolding and assigns each line to `file_line`. But since `file_line` is not a column in this table, it's treated as a temporary variable. 

    Now there is a row for every line in every file in the `my_data` directory! And in each row the column `filename` contains the file that this line was taken from. How cool is that?
6. The following expressions are simple **assignments** - we assign values to columns `name`, `last_name` and `birthyear` by parsing `file_line`. `json_content` is treated as a temporary variable again