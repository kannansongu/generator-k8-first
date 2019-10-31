'use strict';
const Generator = require('yeoman-generator');
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.log('Initializing...');
  }
start() {
    this.prompt([
    {
      type    : 'input',
      name    : 'name',
      message : 'Enter a name of the project (i.e.: my project name): '
    }
  ]).then( (answers) => {
    // create destination folder
    this.destinationRoot(answers.name);
 this.fs.copyTpl(
  this.templatePath('.'),
  this.destinationPath(answers.name)
  );
this.fs.copyTpl(
  this.templatePath('.gitignore'),
  this.destinationPath('.gitignore')
  );
  });
  }
  
};