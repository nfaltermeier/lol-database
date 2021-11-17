# League of Legends Database
A database designed to store information about the 2021 League of Legends Championship Series tournament matches. This is a project for our databases class.

## Technical Details
### Frontend
The frontend is a single page application written in Javascript using React and styled using Sass stylesheets. Axios is used to communicate with the backend.
### Backend
The backend is a REST API using .NET 5 and ASP.NET Core. Raw SQL statements (including some stored procedures) are used to interact with the database because Entity Framework is forbidden for this assignment.
### Database
This project is designed to use a SQL Server database. Scripts to create tables, insert static data, and create stored procedures are included.

## Running
Setup a SQL Server database using the provided scripts, and enter the database information into a `Backend/Secrets.ini` file as described by the README in `Backend`.

Open the backend solution in visual studio and use the `IIS Express` run configuration. The database should be accessible at [http://localhost:28172/]()`.

Install the dependencies for the frontend by running `npm install` in the `Frontend` folder. Start the development server by running `npm start`. The frontend will be accessible at [http://localhost:3000/]().
