# World App

## Prerequisites
- Java 21
- node.js v20.11.0
- Docker 
  - Engine: 28.1.1
  - Docker Desktop 4.41.2 (Mac OS)

## First time set up
- cd to `backend` folder
  - Run `mvn package`
- cd to `frontend` folder
  - Run `npm install`

## Run application
- Open Docker-Desktop in Windows/Mac
- cd to `world-db` folder
  - Run `docker compose up`
- Run `BackendApplication` in IDE 
- cd to `frontend`
  - Run `npm run dev`
- Open `http://localhost:5173` in browser

## Deployment
- Compiled frontend is served by Backend.
- cd to `frontend`
  - Run `npm run build`, which generates index.html under `backend/src/main/resources/static` folder.
  - Spring Boot handles index.html as response for GET request to root i.e. `localhost:8080`.
- Compile backend by `mvn package`
  - Under `backend/target`, a jar file is generated e.g. `backend-0.0.1-SNAPSHOT.jar`
- Send this fat jar file to VPS by `scp` command.

---

## database
### Generate populate-*.sql
Normally this operation is NOT necessary for local development.  
Only when new data for API is added, it is needed to process them to Postgres' INSERT statements.   
- cd to `world-db` folder
- Run `node ./generate/generate_*.js`
  - e.g. `node ./generate/generate_countries.js` for countries table