## Database Connection String
To set the connection string, create a `Secrets.ini` here in the `Backend` directory. It should have a key `LoLDB:ConnectionString`, and an example value might be `"Data Source=(localdb)\MSSQLLocalDb;Integrated Security=true;"` for a local DB or `"Data Source=<>;Database=<>;User Id=<>;Password=<>;"` for a remote DB. Be sure to include the quotation marks because semicolons indicate a comment in INI files.

The complete `Secrets.ini` contents might be, for example:
```
LoLDB:ConnectionString="Data Source=(localdb)\MSSQLLocalDb;Integrated Security=true;"
```
