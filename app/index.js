'use strict';
const Generator = require('yeoman-generator');
const replace = require('replace-in-file');
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
  this.destinationPath('.'),
{ message: 'Hello world!' }
  );

this.fs.copyTpl(
  this.templatePath('.eslintignore'),
  this.destinationPath('.eslintignore')
  );

this.fs.copyTpl(
  this.templatePath('.editorconfig'),
  this.destinationPath('.editorconfig')
  );
this.fs.copyTpl(
  this.templatePath('.gitignore'),
  this.destinationPath('.gitignore')
  );
this.fs.copyTpl(
  this.templatePath('.eslintrc'),
  this.destinationPath('.eslintrc')
  );

this.fs.copy('./src/api/swagger','./src/api/swagger.yml', {
    process: function(content) {

        /* Any modification goes here. Note that contents is a Buffer object */

        var regEx = new RegExp('bnkrasgnmttesttest', 'g');
        var newContent = content.toString().replace(regEx, 'test');
        return newContent;
    }
});
  });
  }
  
};