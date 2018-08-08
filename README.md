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

## How to add a new data column

1. Add a new line in the `server/models/led.js` mongoose Schema. This will tell the database that it needs to store a new value.
2. Add a new column header to the grid in the constructor of `src/app/app.component.ts`. The grid header is built in with two layers: the group header ('Prophotonix data', etc.) and the sub-headers located in the `children` array element. The new column header should have at least a `headerName` and a `field` value.
    * `headerName`corresponds to the name displayed in the grid
    * `field` corresponds to the name you added to the Schema in step 1.
3. Add the field value to the `headerArray` variable in the same file. Make sure that you add it at the *right place* since the ordeer of the headerArray values matters when importing and exporting with CSV files. 

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
