# Case sensitivity

All keywords are case-insensitive:

```shaggy-sql
SELECT * FROM my_table;
select * from my_table;
sElEcT * FroM my_table;
```

Identifiers (including names of modules and functions) are case-sensitive, except for aggregate functions `max`, `min`, `sum`, `count`:

```shaggy-sql
SELECT * FROM MY_TABLE;
SELECT * FROM my_table; -- !!! not the same table

SELECT max(age) from my_table;
SELECT MAX(age) from my_table;
```

Literals `NULL`, `TRUE` and `FALSE` are case-insensitive