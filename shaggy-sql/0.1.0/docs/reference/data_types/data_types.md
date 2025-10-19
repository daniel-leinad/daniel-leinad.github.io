# Data types

ShaggySQL has the following data types:

- Null
- String
- Bool
- Numeric
- List
- Dictionary
- Table

## Null

Null is a type represented by the `NULL` value

## String

Strings are UTF-8 encoded sequences of bytes of any length

## Bool

Bool is a boolean type, represented by 2 possible values:
- `TRUE`
- `FALSE`

## Numeric

Numerics are used for representing numbers. They are decimal numbers written using a finite sequence of digits

## List

List is an ordered list of other ShaggySQL values of any length

## Dictionary

Dictionary is a map-like type that consists of unordered key-value pairs.

Keys can only be of the type **string** and are unique within a single dictionary. Values can be of any type.

## Table

Tables consist of columns and rows. Both columns and rows are ordered

### Columns

Each column is represented by its name and ordinal number

### Rows

Each row can be thought of as a list of ShaggySQL values mapped to the table's columns. Therefore, length of every row is equal to the amount of columns in the table

# Table vs List of Dictionaries

While a table can often be conveniently thought of as a list of dictionaries, they are some differences:s

1. Columns in a table are ordered

    e.g. these tables are not equivalent:

    ```
    |a                |b                |
    |'column a, row 1'|'column b, row 1'|
    |'column a, row 2'|'column b, row 2'|
    ```
    ```
    |b                |a                |
    |'column b, row 1'|'column a, row 1'|
    |'column b, row 2'|'column a, row 2'|
    ```
2. The set of columns is fixed for every row

    e.g. this list of dictionaries could not be directly represented as a table:
    ```
    [
        {'column_a': 'column a, row 1'},
        {'column_a': 'column a, row 2', 'optional_column': 'optional value'},
    ]
    ```