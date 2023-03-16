#!/usr/bin/env node

const https = require("https");
const { exec } = require("child_process");


const startDev = () => {
  console.log('\nStarting...');
  console.log('[...............]');
  exec(`npm init -f && npm i chalk@^4.1.2 fs-extra start-dev-ts`,
    () => {
      const chalk = require('chalk');
      const fs = require("fs-extra");

      setTimeout(() => {
        console.log(chalk.white(' \nDownload packages...'))
        console.log(chalk.bgGray('[###............]'))
      },
        500
      )

      const path = './node_modules/start-dev-ts';
      const URL_GITIGNORE = 'https://raw.githubusercontent.com/evgeniy-kolmak/start-dev-ts/main/.gitignore';

      const packageJson = require(`${path}/package.json`);

      const getDeps = (deps) =>
        Object.entries(deps)
          .map((dep) => `${dep[0]}@${dep[1]}`)
          .toString()
          .replace(/,/g, " ")
          .replace(/^/g, "")

      const devDeps = getDeps(packageJson.devDependencies);

      setTimeout(() => {
        console.log(chalk.white(' \nCopying files...'));
      }, 2500);
      exec(`
      mkdir ${process.argv[2]}`,
        fs.cpSync(path, `${process.argv[2]}/`, { recursive: true })
      );
      setTimeout(() => {
        console.log(chalk.bgGray('[#######........]'));
      }, 3900);

      setTimeout(() => {
        console.log(chalk.bgBlue('\nInstalling dependencies...It can take some time.\n'));
      }, 4800);

      exec(`cd ${process.argv[2]} && npm i -D ${devDeps}`)

      setTimeout(() => {
        console.log(chalk.bgGray('[############...]'));
      }, 11300);

      https.get(URL_GITIGNORE,
        (res) => {
          res.setEncoding("utf8");
          let body = "";
          res.on("data", (data) => {
            body += data;
          });
          res.on("end", () => {
            fs.writeFile(
              `${process.argv[2]}/.gitignore`,
              body,
              { encoding: "utf-8" },
              (err) => {
                if (err) throw err;
              }
            );
          });
        }
      );


      fs.rmSync(`${process.argv[2]}/start-dev-ts.js`);
      fs.rmSync('./package-lock.json');
      fs.rmSync('./package.json');
      fs.rmSync('./node_modules', { recursive: true });


      setTimeout(() => {
        console.log(chalk.bgGreen('\nAll done!\n\nYour project is now ready.\n\nUse the below command to run the app.'));
        console.log(chalk.gray(`\nWhat to start: cd ${process.argv[2]} && npm start`));
      }, 16000);

      setTimeout(() => {
        console.log(chalk.bgBlackBright('\n\nPlease wait for all processes to finish!\n'));
      }, 19000);


    });
}


startDev();
