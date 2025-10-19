# Selecting from tables

## Syntax

```
SELECT [DISTINCT] {* | [*, ] <expression> [AS <identifier>], ... }
[INTO <table_name>]
FROM <source_expression>
[WHERE <expression>]
[GROUP [BY] <expression>, ...]
[ORDER [BY] <expression> [ASC | DESC], ...]
[LIMIT <number>]

<table_name>: <identifier>

<source_expression>:
    <table_name> [AS <identifier>]
    | <table_expression> AS <identifier>
    | <source_expression> {LEFT | RIGHT | INNER | OUTER} <source_expression> ON <expression>
```

> **NOTE:** `<table_expression>` is an `<expression>` that returns a table