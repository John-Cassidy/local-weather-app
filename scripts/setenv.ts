const { writeFile } = require('fs');
const { argv } = require('yargs');
// read environment variables from .env file
require('dotenv').config();
// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';

if (
  !process.env.appId ||
  !process.env.baseUrl ||
  !process.env.geousername ||
  !process.env.geonamesApi
) {
  console.error('All the required environment variables were not provided!');
  process.exit(-1);
}

const targetPath = isProduction
  ? `./src/environments/environment.prod.ts`
  : `./src/environments/environment.dev.ts`;
// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   appId: "${process.env.appId}",
   baseUrl: "${process.env.baseUrl}",
   geousername: "${process.env.geousername}",
   geonamesApi: "${process.env.geonamesApi}"
};
`;

// write the content to the respective file
writeFile(targetPath, environmentFileContent, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Wrote variables to ${targetPath}`);
});
