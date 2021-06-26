#!/usr/bin/env node
const program = require("commander");
const inquirer = require("inquirer");
const fs = require("fs");
const ora = require("ora");
const chalk = require("chalk");
const symbols = require("log-symbols");
const download = require("download-git-repo");
const handlebars = require("handlebars");
const toolVersion = require("./package.json").version;
const spinner = ora("正在下载模板...");

program
  .version(toolVersion, "-v, --version")
  .command("init <name>")
  .action((name) => {
    if (!fs.existsSync(name)) {
      inquirer
        .prompt([
          {
            name: "name",
            message: "请输入包名",
            default: name,
          },
          {
            name: "version",
            message: "请输入项目版本号",
            default: "0.0.1",
          },
          {
            name: "author",
            message: "请输入作者名称",
          },
        ])
        .then((answers) => {
          spinner.start();
          download(
            "direct:https://github.com/lilicoder/npm-publish-template.git#master",
            name,
            { clone: true },
            (err) => {
              if (err) {
                spinner.fail();
                console.log(
                  symbols.error,
                  chalk.green("模板下载失败") + JSON.stringify(err)
                );
                return;
              } else {
                spinner.succeed();
                console.log(symbols.success, chalk.green("模板下载成功"));
              }

              const meta = {
                name: answers.name,
                version: answers.version,
                author: answers.author,
              };
              const fileName = `${name}/package.json`;
              const content = fs.readFileSync(fileName).toString();
              const result = handlebars.compile(content)(meta);
              fs.writeFileSync(fileName, result);
              console.log(symbols.success, chalk.green("项目初始化完成"));
            }
          );
        });
    } else {
      console.log(symbols.error, "项目名称已存在");
    }
  });
program.parse(process.argv);
