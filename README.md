# EquipmentDbApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

## Requirements

- [Node.js and npm](https://nodejs.org/en/) (built with Node.js v8 and npm v5)
- [Angular CLI](https://angular.io/) (built with angular cli v6)
- [MongoDB](https://www.mongodb.com/download-center) (built with Community edition v3.6)

## Run

1. Run `npm install` to install project dependencies.
2. Make sure that the MongoDB server is running before launching the application. Refer to the [MongoDB Documentation](https://docs.mongodb.com/) if needed.
3. Run `npm run build` and navigate to `http://localhost:4200/`.
3. [dev] Alternatively, you can run `node server.js` in a first console to launch the server (or `nodemon server.js` if you have nodemon installed for auto-reloading on server file change) and run `ng build --watch` in a second console to launch the client with auto-reloading on client file change. This alternative method makes development easier since the app is automatically rebuilt everytime a file is changed and saved.

## Note for creating the first user
When installing the app for the first time, you will probably want to create a first administrator user to access all the features of the application. To do so, follow the steps below:
1. After launching the app, register a new 'normal' user using the *Register* interface.
2. Launch the MongoDB console (on Windows: *mongo.exe* - not to be confused with *mongod.exe* which is used to launch the Mongo server).
3. `use equipmentdb`
4. `db.users.find()` should display the collection containing the user you created in step 1.
5. `db.users.updateOne({"username": "John"}, {$set: {"role": "Admin"}));`
Make sure to replace *John* with the actual username you chose, and to write *Admin* with a capital 'A'.

You should now be able to log in and access the user management interface which can be used to easily change other users role in the future.

## How to add a new data column

1. Add a new line in the `server/models/led.js` mongoose Schema. This will tell the database that it needs to store a new value.
2. Add a new column header to the grid in the constructor of `src/app/grid/grid.component.ts`. The grid header is built with two layers: the group header ('Prophotonix data', etc.) and the sub-headers located in the `children` array element. The new column header should have at least a `headerName` and a `field` value.
    * `headerName`corresponds to the name displayed in the grid
    * `field` corresponds to the name you added to the Schema in step 1.
3. Add the field value to the `headerArray` variable in the same file. Make sure that you add it at the *right place* since the ordeer of the headerArray values matters when importing/exporting with CSV files and saving changes to the log file. 

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`. You can refer to Angular CLI documentation for further information.
