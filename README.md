# Mechanical Service

Mechanical Service is a simple app for record info of car repairs. Then you can filter the services performed by date ranges or clients.

It was developed ad-hoc to migrate some xls files where the data was stored.

Was made using [json-server](https://github.com/typicode/json-server) for the DB and REST API, to the frontend [React.js](https://reactjs.org/), [React-Bootstrap](https://react-bootstrap.github.io/) to styling and [Vite](https://vitejs.dev/) to building.

## Scripts

### Startup section

To start the entire project, you can run `npm run start`

If you want to start the server only, run `npm run server` [http://localhost:3000](http://localhost:3000)

If you want to start the client only, run `npm run client` [http://localhost:4000](http://localhost:4000)

### Ad-hoc section

To migrate all the data, an ETL was made for convert the sheets into a json. You can see that in `src/scripts/etl.js`

To backup the DB, an script in JS was made for upload to Google Drive the file **db.json**. You can see that in `src/scripts/backup.js`

To improve the usability, an script in python was made for start the project and upload the DB backup, creating an exe file it's to easy and fast to startup the project. You can see that in `src/scripts/launcher.py`


## Configuration

To be able to run the backup, first you need a file named `credentials.json` in the root of project, that you can be download when you configure the service acount in Google Console.

And for the backup and the ETL as well, you need to create a file named `config.js` in the root of project with the follow content
```
module.exports = {
  DIRECTORY_DRIVE_ID: folder ID that you want to upload the file,
  PATH_XLS_FILES: absolute path of the folder that contains all the xls files
};
```
