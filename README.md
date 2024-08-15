## Description (This is readme file for introduce about this API)

- I have write CRUD function for location and also support address location tree (with Postgresql)

## API documentation

- You can access the api documentation on: http://localhost:3000/api (swagger)

## Project structure (Introduce some important folder)

- src: this is main folder of this project
  - modules: this folder contains all the module of this application
    - exception-filter: this folder is used to create exception filter for this application
    - logger: this folder contain custom log for logging service, this just use to log error on the console but we can also implement file logging into this service
    - location: this folder contain the entity of location, the controller and service.

## Functionality

- In the location module, i have create 5 function
  - Get all location
  - Get location and it's child by location number (support ltree)
  - Create new location
  - Update location (this function will also update the location_number of it's child (for ltree search))
  - Delete location (this function will also delete the child of that location)
- If you need any function please let me know, i will implement more

## Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```
