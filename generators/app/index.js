'use strict';
var generators = require('yeoman-generator');
var yosay = require('yosay');
var path = require('path');

var htmlWiring = require('html-wiring');
var readFileAsString = htmlWiring.readFileAsString;
var writeFileFromString = htmlWiring.writeFileFromString;

var beautify = require('js-beautify').html;
var beautifyOpts = { indent_size: 2 };

module.exports = generators.Base.extend({

  constructor: function () {
    generators.Base.apply(this, arguments);

    this.argument('element-name', {
      desc: 'Tag name of the element to generate',
      required: true
    });

    // This method adds support for a `--docs` flag
    // An element generated with --docs will include iron-component-page
    // and a demo.html file
    this.option('docs');

    // This method adds support for a `--path` flag
    // An element generated with a --path will create a matching directory
    // structure in the `app/elements` dir.
    // ex: yo polymeres6:el x-foo --path foo/bar/baz will create
    // app/elements/foo/bar/baz/x-foo
    this.option('path');

    // Source root for templates
    this.sourceRoot(path.join(__dirname, 'templates'));

  },

  init: function () {
    this.elementName = this['element-name'];
    // Get first argument as element name
    this.args.splice(0,1);
    this.components = this.args;
    this.flags = this.options;

    // Check for dash in element name
    if (this.elementName.indexOf('-') === -1) {
      this.emit('error', new Error(
        'Element name must contain a dash "-"\n' +
        'ex: yo polymeres6:el my-element'
      ));
    }
    // Have Yeoman greet the user.
   this.log(yosay('Out of the box I include ES5 version of the JS and you will need to transpile your code after the first edit of the code. DONT FORGET BABEL!'));

  },

  /*askFor: function () {
    var done = this.async();

    /*var prompts = [
      {
        name: 'includeImport',
        message: 'Would you like to include an import in your elements.html file?',
        type: 'confirm',
        default: false
      }
    ];*/

    // Only ask to create a test if they already have WCT installed
    /*var hasWCTinstalled = this.fs.exists('app/test/index.html');
    if (hasWCTinstalled) {
      prompts.push({
        name: 'testType',
        message: 'What type of test would you like to create?',
        type: 'list',
        choices: ['TDD', 'BDD', 'None'],
        default: 'TDD'
      });
    }*/

    /*this.prompt(prompts, function (answers) {
      //this.includeImport = answers.includeImport;
      //this.testType = answers.testType;
      done();
    }.bind(this));
  },*/

  el: function () {
    var el;
    var pathToEl;

    if (this.flags.path) {
      // pathToEl = "app/elements/foo/bar/"
      pathToEl = path.join(this.destinationPath('app/components'), this.flags.path);
    } else {
      // pathToEl = "app/elements/x-foo/"
      pathToEl = path.join(this.destinationPath('app/components'), this.elementName);
    }

    var camelCasedEl = this.elementName.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });


    // Used by element template
    var tpl = {
      elementName: this.elementName,
      components: this.components,
      pathToBower: path.relative(
          pathToEl,
          path.join(process.cwd(), 'app/assets/bower_components')
        )
    };

    var tplScript = {
      elementNameCamelCased: camelCasedEl,
      elementName: this.elementName,
      components: this.components
    }

    // Copy html
    this.fs.copyTpl(
      path.join(this.templatePath('element.html')),
      path.join(pathToEl, this.elementName + '.html'),
      tpl
    );


    // Copy script es6
    this.fs.copyTpl(
      path.join(this.templatePath('script.es6.js')),
      path.join(pathToEl, this.elementName + '.es6.js'),
      tplScript
    );

    // Copy script es5 out of the box
    this.fs.copyTpl(
      path.join(this.templatePath('script.js')),
      path.join(pathToEl, this.elementName + '.js'),
      tplScript
    );

    // Wire up the dependency in elements.html
    /*if (this.includeImport) {
      var file = readFileAsString(this.destinationPath('app/elements/elements.html'));
      el = (this.flags.path || this.elementName) + '/' + this.elementName;
      el = el.replace(/\\/g, '/');
      file += '<link rel="import" href="' + el + '.html">\n';
      writeFileFromString(file, this.destinationPath('app/elements/elements.html'));
    }*/

    /*if (this.testType && this.testType !== 'None') {
      var testDir = this.destinationPath('app/test');

      if (this.testType === 'TDD') {
        this.fs.copyTpl(
          this.templatePath('test/tdd.html'),
          path.join(testDir, this.elementName+'-basic.html'),
          tpl
        );
      } else if (this.testType === 'BDD') {
        this.fs.copyTpl(
          this.templatePath('test/bdd.html'),
          path.join(testDir, this.elementName+'-basic.html'),
          tpl
        );
      }

      // Open index.html, locate where to insert text, insert ", x-foo.html" into the array of components to test
      var indexFileName = 'app/test/index.html';
      // Replace single quotes to make JSON happy
      var origionalFile = readFileAsString(indexFileName).replace(/'/g, '"');
      var regex = /WCT\.loadSuites\(([^\)]*)/;
      var testListAsString = origionalFile.match(regex)[1];
      var testListAsArray = JSON.parse(testListAsString);
      var fileName = this.elementName + '-basic.html';
      testListAsArray.push(fileName);
      testListAsArray.push(fileName + '?dom=shadow');
      var newTestString = JSON.stringify(testListAsArray, null, 2).replace(/"/g, '\'');
      var newFile = origionalFile.replace(testListAsString, newTestString);
      writeFileFromString(beautify(newFile, beautifyOpts), indexFileName);
    }*/

    // copy documentation page and demo page only if flag is set
    if (this.flags.docs) {

      // copy templates/index.html -> app/components/x-foo/index.html (documentation page)
      this.fs.copyTpl(
        this.templatePath('index.html'),
        path.join(pathToEl, 'index.html'),
        tpl
      );

      // copy templates/demo.html -> app/components/x-foo/demo.html (demo page)
      this.fs.copyTpl(
        this.templatePath('demo.html'),
        path.join(pathToEl, 'demo/index.html'),
        tpl
      );

    }
  }
});
