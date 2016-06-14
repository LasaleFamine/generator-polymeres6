/*global describe, beforeEach, before, it*/

var path    = require('path');
var helpers = require('yeoman-test');
var assert  = require('yeoman-assert');

describe('yo polymeres6 test-el', function() {

  describe('yo polymeres6 with only element name', function () {

    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .inDir(path.join(__dirname, './tmp'))
        .withArguments(['my-test'])
        //.withPrompts({
        //  includeWCT: true,
        //  includeRecipes: false
        //})
        .on('end', done);
    });

    it('creates expected files', function () {
      var expected = [
        'app/components/my-test/my-test.html'
      ];

      assert.file(expected);
    });

  });

  describe('yo polymeres6 el-name --path test', function () {

    before(function (done) {
      helpers.run(path.join(__dirname, '../generators/app'))
        .inDir(path.join(__dirname, './tmp'))
        .withArguments(['path-to-el'])
        .withOptions({ 'path': 'foo/bar/but' })
        .on('end', done);
    });

    it('creates expected files', function () {
      var expected = [
        'app/components/foo/bar/but/path-to-el.html'
      ];

      assert.file(expected);
    });

    it('creates the right path to polymer (within the assets folder)', function () {
      assert.fileContent(
        'app/components/foo/bar/but/path-to-el.html',
        /<link rel="import" href="..\/..\/..\/..\/assets\/bower_components\/polymer\/polymer.html">/
      );
    });
  });

  /*describe('yo polymer:app without WCT test', function () {

    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, './tmp'))
        .withArguments(['--skip-install'])
        .withPrompts({
          includeWCT: false,
          includeRecipes: false
        })
        .on('end', done);
    });

    it('creates expected files', function () {
      var expected = [
        '.editorconfig',
        '.gitattributes',
        '.gitignore',
        'bower.json',
        'gulpfile.js',
        'LICENSE.md',
        'package.json',
        'README.md',
        'app'
      ];

      assert.file(expected);
    });

    it('does not include WCT', function() {
      assert.noFileContent('bower.json', /web-component-tester/gm);
      assert.noFileContent('package.json', /web-component-tester/gm);
      assert.fileContent(
        'gulpfile.js', /^\/\/\srequire\('web-component-tester'\).+/gm
      );
    });

  });

  describe('yo polymer:app with Recipes test', function () {

    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, './tmp'))
        .withArguments(['--skip-install'])
        .withPrompts({
          includeWCT: false,
          includeRecipes: true
        })
        .on('end', done);
    });

    it('creates expected files', function () {
      var expected = [
        '.editorconfig',
        '.gitattributes',
        '.gitignore',
        'bower.json',
        'gulpfile.js',
        'LICENSE.md',
        'package.json',
        'README.md',
        'app',
        'docs'
      ];

      assert.file(expected);
    });

  });


  describe('yo polymer:app without Recipes test', function () {

    before(function (done) {
      helpers.run(path.join(__dirname, '../app'))
        .inDir(path.join(__dirname, './tmp'))
        .withArguments(['--skip-install'])
        .withPrompts({
          includeWCT: false,
          includeRecipes: false
        })
        .on('end', done);
    });

    it('creates expected files', function () {
      var expected = [
        '.editorconfig',
        '.gitattributes',
        '.gitignore',
        'bower.json',
        'gulpfile.js',
        'LICENSE.md',
        'package.json',
        'README.md',
        'app'
      ];

      assert.file(expected);
      assert.noFile(['docs']);
    });

  });*/

});
