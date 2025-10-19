# Creating tables

## Syntax

```
CREATE TABLE <table_name> (<column_description>, ...) [WHERE <table_constructor_statement>, ...];

<table_name>: <identifier>

<column_description>: <column_identifier>

<column_identifier>: <identifier>

<table_constructor_statement>:
    <assignment_statement>
    | <flattening_statement>

<assignment_statement>: <column_identifier> = <expression>

<flattening_statement>: <column_identifier> <- <list_expression>
```

> **NOTE:** `<list_expression>` is an `<expression>` that returns a list

### More about table constructors

When a table constructor is present, ShaggySQL will first initialize the table with a single row of null values and then apply every table constructor statement consecutively. If a `<column_identifier>` is not present in the table's column description, it's treated as a temporary column and gets deleted when all constructor statements are executed. 

The simplest type of statement is an **assignment**:

```shaggy-sql
CREATE TABLE my_table (a, b, c)
WHERE 
    a = 1, 
    temp = 2, 
    b = temp
;

SELECT * FROM my_table;
```
|a|b|c|
|-|-|-|
|1|2|NULL|

**Flattening** statement takes a list of values and creates a row for each of them. All the following statements are executed with the context of a single row.

So, a statement like `a <- [1, 2, 3, 4, 5]` will create 4 new rows (5 total) and assign a different number to the column `a` in every row

If any of the following statements use the column `a`, they will get the value of `a` in specific row, not the original list of numbers

> **NOTE:** Flattening an empty list (`a <- []`) will remove a row, and flattening a list with a single value (`a <- [1]`) is equivalent to an assignment (`a = 1`)

You can use any number of flattening statements in a constructor, with each flattening statement "expanding" every existing row:

```shaggy-sql
CREATE TABLE square_roots (number, sqrt)
WHERE 
    positive_sqrt <- [1, 2, 3],
    number = positive_sqrt * positive_sqrt,
    sqrt <- [positive_sqrt, -positive_sqrt],
;

SELECT * FROM square_roots;
```
|number|sqrt|
|-|-|
|1|1|
|1|-1|
|4|2|
|4|2|
|9|3|
|9|-3|