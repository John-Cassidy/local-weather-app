# LocalWeatherApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.2.

The project is an attempt to solidify best practices for front-end development.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Tests helpers

Use unit test helper library `angular-unit-test-helper` to make it easier to mock a component
npm i -D angular-unit-test-helper
use: createComponentMock('CurrentWeatherComponent');

## Workflow of Pull Request or Merge Request to Github / Bitbucket / Gitlab

Raising and managing Pull Request or PR (as its called in Github and Bitbucket ) or Merge Request or MR (as its called in Gitlab) is probably the most regular part of a Developer’s day to day workflow, when working in a team.
In this (post)[https://medium.com/@paulrohan/workflow-of-pull-request-or-merge-request-to-github-bitbucket-gitlab-b0942ec5d56e] I shall discuss the steps and workflows and issues you may face while raising your PR for a Repo.


## Tools and Extensions

The npm repository contains numerous usefull and mature CLI commands that are often cross-platform. here are the packages you can install globally for performance reasons.

npx: Executes the CLI tools by downloading the latest version on-demand or the project-specific local version in node_modules folder. npx ships with npm.

rimraf: unix command 'rm -rf' works on Windows too. usefull for deleting the node_modules folder.

npm-check-updates: npm install -g npm-check-updates
Analyzes your project folder and reports on which packages have newer versions or not, with the ooption to be able t oupdate all of them if you wish. There is also an exension 'Angular Evergreen' that allows you to run npm-check-updates.
<https://www.npmjs.com/package/npm-check-updates>

nvs: install on Windows. Easy tool to switch between versions of Node.
install using choco: choco install nvs
<https://github.com/jasongin/nvs/blob/master/README.md>

http-server: simple command-line HTTP server
npm install --global http-server

npm-windows-upgrade: allows you to upgrade npm on Windows.
read instructions on installing as there may be some PowerShell permissions you need to set first!
<https://www.npmjs.com/package/npm-windows-upgrade>
npm install --global --production npm-windows-upgrade
To upgrade run: npm-windows-upgrade

npkill: easily find and remove old and heavy node_modules folders - <https://www.npmjs.com/package/npkill>
npm i -g npkill

AWS CLI:
use choco to install: choco upgrade awscli -y

## VSCode exensions and settings

I've added an extensions.json file in .vscode folder that suggests what exensions to install in VSCode to improve your developlment experience.
To install these exensions in your project, if they are not already:

npm i -D dev-norms
npm i -D npm-run-all
npm i -D open-cli
npm i -D rimraf

npm i -D prettier tslint-config-prettier tslint-plugin-prettier
npm i -D js-beautify
npm i -D import-sort import-sort-cli import-sort-parser-typescript import-sort-style-module
npm i -D tslint tslint-etc

Edit package.json file by appending an importSort attribute at the end of the file:
...
"importSort": {
".ts, .tsx": {
"parser": "typescript",
"style": "module",
"options": {}
}
}

Update the tslint.json rules for integration with Prettier and tslint-etc:
{
"extends": [
"tslint:recommended",
"tslint-etc",
"tslint-config-prettier",
"tslint-plugin-prettier"
],
"rules": {
"prettier": true,
"no-unused-declaration": true,
...
}
...
}

Add a new file to your project named .jsbeautifyrc:
{
"indent_size": 2,
"wrap_line_length": 90,
"end_with_newline": true,
"language": {
"html": [
"html"
]
}
}

Add a new file to your project named .prettierrc:
{
"tabWidth": 2,
"useTabs": false,
"printWidth": 90,
"semi": true,
"singleQuote": true,
"trailingComma": "es5",
"jsxBracketSameLine": true
}

Add a new file to your project named .prettierignore: \*_/_.html

I've added a settings.json file in .vscode folder that will allow all developers that work on this project in VSCode will enjoy the same experience.

## It is essential to optimize your IDE to have a great development experience

If you leverage automated tools, you can quickly configureyour IDE and your Angular porject with dozens of settings that work well together.

mrm-task-angular-vscode: VS Code task - <https://www.npmjs.com/package/mrm-task-angular-vscode>
npm i -g mrm-task-angular-vscode
Apply the Angular VS Code configuration to your project
npx mrm angular-vscode

mrm-task-npm-docker: the npm Scripts for the Docker task - <https://www.npmjs.com/package/mrm-task-npm-docker>
npm i -g mrm-task-npm-docker

Apply the npm Scripts for the Docker configuration to your project
npx mrm npm-docker

SubSink, published by Ward Bell, is a straightforward library to keep track of all subscriptions in a given class and allows you to unsubscribe to all of them during ngOnDestroy()
npm i subsink

## Setup DOTENV to access Envvironment Variables

Keep sensitive environment data out of source control
<https://medium.com/javascript-in-plain-english/setup-dotenv-to-access-environment-variables-in-angular-9-f06c6ffb86c0>

(1a) install 2 packages:
npm install --save-dev yargs dotenv

- dotenv
- yargs

  (1) add environment variables you want to use in development in this file: process.env
  (2) DO NOT check in process.env into source control
  (3) run this command to generate .env file:
  npm run init:env
  (4) create scripts/setenv.ts file and copy code from article to generate environment.ts file used by ng during debugging
  (5) modify our start and build scripts so that these files are generated dynamically.
  Do this in the package.json file:
  {
  ...
  "scripts": {
  "init:env": "init-dev-env generate-dot-env process.env -f",
  "config": "ts-node ./scripts/setenv.ts",
  "start": "npm run config -- --environment=dev && ng serve -c=dev --port 5000",
  "build": "ng build",
  ...
  },
  ...
  }
  (6) update angular.json to replace the environment.ts during build and server with file you want to use - <https://itnext.io/multi-environment-setup-for-your-angular-app-a211d72f1ff1>

  (7) create an alias path to use in code.

- update tsconfig.json, add to the object compilerOptions:
  "paths": {
  "@environment": ["./src/environments/environment.ts"]
  }
- use the alias in component:
  // import { environment } from 'src/environments/environment';
  import { environment } from '@environment'; // nice!

## Commands

Create project
npx @angular/cli new local-weather-app

Run the following commands before committing your code to ensure styles and linting properly applied to the project:

npm run style:fix - automatically format code files as per styling rules
npm run lint:fix - automatically fix auto-fixable linting errors

## Setup CI/CD to AWS S3

### CI - Deploy an Angular 9|8|7 Application Using Github Actions

interesting articles:

- <https://www.c-sharpcorner.com/article/deploy-an-angular-89-application-using-github-actions/>

- <https://focisolutions.com/2020/04/github-actions-deploying-an-angular-app/>

## Angular Material and Flex-Layout

npx ng add @angular/material

- setup global angular material typography styles? no
- set up browser animations for angular material? yes
- choose a custom theme: Indigo/Pink

NOTE: if the major/minor versions of the following packages don't match, you can rerun the following command
"@angular/cdk": "^10.2.3",
"@angular/material": "^10.2.3",

npm install @angular/material@10.2.3 @angular/cdk@10.2.3

npx ng g m material --flat -m app

npm i @angular/flex-layout

## Commands run during development

npx ng generate component current-weather
...or... ng g c current-weather
...prepend npx if necessary...

npx ng g i ICurrentWeather interface

npx ng g s weather --flat false

npx ng g c citySearch -m app --dry-run
