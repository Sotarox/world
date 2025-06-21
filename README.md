# World App
🌍 *World* is a simple web service that offers various data about countries.  
👓 The goal is to create a lightweight information system where users can quickly gather key data.  
💎 UX theme: “Look & feel from shopping sites for informative content”.

## Technologies
Spring Boot, React, TypeScript, Material UI, PostgresSQL, Docker, Amazon Lightsail, nginx, Ubuntu

## Prerequisites
- Java 21
- node.js v20.11.0
- Docker 
  - Engine: 28.1.1
  - Docker Desktop 4.41.2
Development machine is Apple M1 Pro. Other than macOS, the app behavior is not checked. 

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

## Lint in Frontend (ESLint, Prettier, Husky, lint-staged)
### Set up
If you are using a npm package manager such as `nvm`, Husky might not be able to find node in your PC.
In this case, create `init.sh` under `~/.config/husky folder`:
```init.sh
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" 
```
For the reason, refer [husky official website](https://typicode.github.io/husky/how-to.html#node-version-managers-and-guis)

### Execute ESLint manually
ESLint process includes Prettier in this project.
To execute linting manually, Hit `npm run lint`, which lints **all files** in frontend.   

### Lint at git commit hook
Lint runs automatically at a git commit (Specifically saying, at pre-commit), 
which targets only staged .ts and .tsx files. This process is executed following:  
1. Husky detects git pre-commit
2. Husky calls lint-staged
3. lint-staged detects staged files (using `git diff --cached --name-only` under the hood)
4. lint-staged calls `eslint` command
5. eslint command includes `prettier` process  

When the lint command fails, staged files are not committed. 
If you want to skip these process for some reason, use `-n` or `--no-verify` option: `git commit -m "..." -n`.

### Trouble shooting
- Is husky configured correctly?
For initial set up after `git clone`, running `npm install` calls `npm prepare` automatically.
This command installs `world/.husky/_` folder and its shells files.
Also `git config core.hooksPath` command should show path to this folder.

---

## database
### Generate populate-*.sql
Normally this operation is NOT necessary for local development.  
Only when new data for API is added, it is needed to process them to Postgres' INSERT statements.   
- cd to `world-db` folder
- Run `node ./generate/generate_*.js`
  - e.g. `node ./generate/generate_countries.js` for countries table