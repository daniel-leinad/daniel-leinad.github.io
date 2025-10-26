# Identifiers

All identifiers are case-sensitive

## Unquoted identifiers

Unquoted identifiers are written as a single word.

Each identifier must start with a letter (a-z, A-Z) and must contain only letters, digits or underscores.

## Quoted identifiers

If an identifier contains other special characters, it can be written in double quotes:

```shaggy-sql
select * from "my table";
```

To write a double quote inside an identifier, write 2 double quotes:

```shaggy-sql
select * from "my ""table""";
```

Characters in a quoted identifier are escaped the same way that string literals are ([see](literals.md#string-literals))