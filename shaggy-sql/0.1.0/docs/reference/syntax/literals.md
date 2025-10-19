# Literals and literal expressions


## Null literal

The null value is written as `NULL` (case-insensitive)

```shaggy-sql
SELECT NULL; -- returns null
SELECT Null; -- also null
SELECT null; -- also null
```

## String literals

String literals are written in single quotes

```shaggy-sql
SELECT 'my string';
```

To write a single quote inside a string literal, write 2 single quotes:

```shaggy-sql
SELECT 'my friend''s string';
```

Characters in a string literal are escaped:

|Escape sequence|Result|
|-|-|
|\n|newline|
|\r|carriage return|
|\t|tab|
|\\'|single quote|
|\\\\ |backslash|

## Bool literals

Bool values are written as `TRUE` or `FALSE` (case-insensitive)

```shaggy-sql
SELECT
    TRUE as true_literal,
    False as false_literal
;
```

## Numeric literals

Numeric literals are written as a sequence of digits that can be separated by a single decimal point

```shaggy-sql
SELECT 
    5 as whole_number, 
    0.5 as fraction
;
```

## List

Lists are written as a sequence of values separated by commas, surrounded by square brackets

```shaggy-sql
SELECT
    [1, 2, 3, 4] as positive_numbers,
    [2, 3, 5, 7] as primes
;
```

## Dictionary

Dictionaries are written as a sequence of key-value pairs separated by commas, surrounded by curly braces, where key and value are separated by a semicolon

```shaggy-sql
SELECT
    {'michael': 23, 'mary': 24} as ages
;
```

## Table

Table expressions are not supported, but you can turn a list of dictionaries into a table:

```shaggy-sql
SELECT
    table.from_rows([
        {'name': 'michael', 'age': 23},
        {'name': 'mary', 'age': 24}
    ]) as ages
;
```