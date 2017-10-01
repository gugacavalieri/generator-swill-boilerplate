'use strict'

var _s = require('underscore.string')
var chalk = require('chalk')
var files = require('./optional-files.json')
var mkdirp = require('mkdirp')
var path = require('path')
var Yeoman = require('yeoman-generator')
var yosay = require('yosay')

module.exports = class extends Yeoman {
  initializing () {
    this.log(
      yosay('Hi, my friend! Welcome to ' + chalk.green('Swill boilerplate') + ' generator!')
    )
  }

  prompting () {
    var prompts = [{
      name: 'projectName',
      message: 'Your project name'
    }, {
      name: 'projectDescription',
      message: 'Your project description'
    }, {
      name: 'projectHomepage',
      message: 'Project Homepage'
    }, {
      name: 'keywords',
      message: 'Project keywords (comma to split)',
      filter: function (words) {
        return words ? words.split(/\s*,\s*/g) : []
      }
    }, {
      type: 'input',
      name: 'language',
      message: 'Default project language (en, en-US, pt-BR, fr-CA...)',
      default: 'en'
    }, {
      name: 'authorName',
      message: 'Author Name',
      default: this.user.git.name()
    }, {
      name: 'authorEmail',
      message: 'Author Email',
      default: this.user.git.email()
    }, {
      name: 'authorHomepage',
      message: 'Author\'s website'
    }, {
      name: 'githubUser',
      message: 'Github User or organization'
    }, {
      type: 'confirm',
      name: 'handlebars',
      message: 'Do you want use handlebars Template?',
      default: true
    }, {
      type: 'confirm',
      name: 'settingFolder',
      message: 'You can rename default folder structure, do you want customize?',
      default: false
    }, {
      name: 'srcFolder',
      message: 'Source folder??',
      default: 'src',
      when: function (response) {
        return response.settingFolder
      }
    }, {
      name: 'destFolder',
      message: 'Destination folder??',
      default: 'app',
      when: function (response) {
        return response.settingFolder
      }
    }, {
      name: 'buildFolder',
      message: 'Builded folder??',
      default: 'build',
      when: function (response) {
        return response.settingFolder
      }
    }, {
      name: 'handlebarsSrcFolder',
      message: 'Handlebars Source folder??',
      default: 'handlebars',
      when: function (response) {
        return response.settingFolder && response.handlebars
      }
    }, {
      name: 'fontsDestFolder',
      message: 'Webfonts destination folder??',
      default: 'fonts',
      when: function (response) {
        return response.settingFolder
      }
    }, {
      name: 'imgSrcFolder',
      message: 'Images source folder??',
      default: 'images',
      when: function (response) {
        return response.settingFolder
      }
    }, {
      name: 'imgDestFolder',
      message: 'Images destination folder??',
      default: 'img',
      when: function (response) {
        return response.settingFolder
      }
    }, {
      name: 'spriteSrcFolder',
      message: 'Sprite source folder??',
      default: 'sprite',
      when: function (response) {
        return response.settingFolder
      }
    }, {
      name: 'stylesSrcFolder',
      message: 'Styles source folder??',
      default: 'stylesheets',
      when: function (response) {
        return response.settingFolder
      }
    }, {
      name: 'stylesDestFolder',
      message: 'Styles destination folder??',
      default: 'css',
      when: function (response) {
        return response.settingFolder
      }
    }, {
      name: 'scriptsSrcFolder',
      message: 'Scripts source folder??',
      default: 'scripts',
      when: function (response) {
        return response.settingFolder
      }
    }, {
      name: 'scriptsDestFolder',
      message: 'Scripts destination folder??',
      default: 'js',
      when: function (response) {
        return response.settingFolder
      }
    }, {
      type: 'list',
      name: 'preprocessor',
      message: 'Which CSS preprocessor you will use?',
      choices: [{
        name: 'Stylus',
        value: 'stylus'
      }, {
        name: 'SASS',
        value: 'sass'
      }]
    }, {
    //     type: 'confirm',
    //     name: 'componentsCSS',
    //     message: 'Do you want use some basic CSS setings? Like paragraphs, titles, buttons ...'
    // }, {
      type: 'checkbox',
      name: 'options',
      message: 'Would you like to use?',
      choices: [{
        name: 'Lint CSS',
        value: 'lintCSS',
        checked: false
      }, {
        name: 'Lint JS',
        value: 'lintJS',
        checked: true
      }]
    }, {
      type: 'checkbox',
      name: 'features',
      message: 'Do you want use some of these lib/plugin?',
      choices: [{
        name: 'jQuery',
        value: 'jquery',
        checked: true
      }, {
        name: 'Normalize.css',
        value: 'normalize',
        checked: true
      }, {
        name: 'OutdatedBrowser',
        value: 'outdatedBrowser',
        checked: true
      }]
    }, {
      type: 'confirm',
      name: 'jqueryLogoDownloadtip',
      message: 'Want use jQuery Logo Downloadtip?',
      default: false,
      when: function (response) {
        return response.features.indexOf('jquery') >= 0
      }
    }, {
      type: 'checkbox',
      name: 'files',
      message: 'Which files do you need?',
      choices: files
    }]

    // ================== Get props ================== //
    return this.prompt(prompts).then(function (props) {
      this.prompts = props
      this.props = {}

      this.props.githubUser = (props.githubUser) ? props.githubUser : '{Github User}'

      this.props.project = {
        name: (props.projectName) ? _s.clean(props.projectName) : '{Project Name}',
        cleanName: (props.projectName) ? _s.clean(props.projectName) : 'project-name',
        sanitizeName: (props.projectName) ? _s.slugify(_s.clean(props.projectName)) : '{project-name}',
        description: props.projectDescription,
        homepage: props.projectHomepage,
        keywords: props.keywords,
        language: props.languageList || props.language,
        joinedKeywords: props.keywords && props.keywords.join()
      }

      this.props.project.repository = 'https://github.com/' + this.props.githubUser + '/' + this.props.project.sanitizeName + '.git'

      this.props.author = {
        name: _s.clean(props.authorName),
        email: _s.clean(props.authorEmail),
        homepage: _s.clean(props.authorHomepage)
      }

      this.props.preprocessor = {
        name: props.preprocessor,
        extension: (props.preprocessor === 'sass') ? 'scss' : 'styl'
      }

      this.props.folder = {
        src: props.srcFolder || 'src',
        dest: props.destFolder || 'app',
        build: props.buildFolder || 'build',
        handlebars: props.handlebarsSrcFolder || 'handlebars',
        fonts: props.fontsDestFolder || 'fonts',
        sprite: props.spriteSrcFolder || 'sprite',
        images: {
          src: props.imgSrcFolder || 'images',
          dest: props.imgDestFolder || 'img'
        },
        styles: {
          src: props.stylesSrcFolder || 'stylesheets',
          dest: props.stylesDestFolder || 'css'
        },
        scripts: {
          src: props.scriptsSrcFolder || 'scripts',
          dest: props.scriptsDestFolder || 'js'
        }
      }

      this.props.use = {
        jquery: props.features.indexOf('jquery') >= 0,
        jqueryLogoDownloadtip: props.jqueryLogoDownloadtip,
        lint: {
          js: props.options.indexOf('lintJS') >= 0,
          css: props.options.indexOf('lintCSS') >= 0
        },
        normalize: props.features.indexOf('normalize') >= 0,
        outdatedBrowser: props.features.indexOf('outdatedBrowser') >= 0,
        handlebars: props.handlebars
      }

      this.props.include = {
        htaccess: props.files.indexOf('htaccess') >= 0,
        404: props.files.indexOf('404') >= 0,
        readme: props.files.indexOf('readme') >= 0,
        contributing: props.files.indexOf('contributing') >= 0,
        changelog: props.files.indexOf('changelog') >= 0,
        crossdomain: props.files.indexOf('crossdomain') >= 0,
        browserconfig: props.files.indexOf('browserconfig') >= 0,
        manifest: props.files.indexOf('manifestJson') >= 0,
        robots: props.files.indexOf('robots') >= 0,
        humans: props.files.indexOf('humans') >= 0,
        travis: props.files.indexOf('travis') >= 0,
        npmignore: props.files.indexOf('npmignore') >= 0
      }
    }.bind(this))
  }

  // ====================== Copy settings files ====================== //
  default () {
    // license
    this.composeWith(require.resolve('generator-license/app'), {
      name: this.props.project.name,
      email: '',
      website: ''
    })
  }

  // ====================== Copy boilerplate files ======================//
  writing () {
    if (path.basename(this.destinationPath()) !== this.props.project.sanitizeName) {
      this.log('The folder ' + this.props.project.sanitizeName + ' will be automatically created!!')
      mkdirp(this.props.project.sanitizeName)
      this.destinationRoot(this.destinationPath(this.props.project.sanitizeName))
    }

    // Package.json
    var packageJson = require('./templates/_package.json')

    packageJson.name = this.props.project.sanitizeName
    packageJson.description = this.props.project.description
    packageJson.homepage = this.props.project.homepage
    packageJson.keywords = this.props.project.keywords
    packageJson.author.name = this.props.author.name
    packageJson.author.url = this.props.author.homepage
    packageJson.repository.url = this.props.project.repository

    this.props.preprocessor.name === 'sass' && (packageJson.devDependencies['gulp-sass'] = '3.1.0')
    this.props.preprocessor.name === 'stylus' && (packageJson.devDependencies['gulp-stylus'] = '2.6.0')

    this.props.use.jquery && (packageJson.dependencies.jquery = '3.2.1')
    this.props.use.jqueryLogoDownloadtip && (packageJson.dependencies['jquery-logo-downloadtip'] = '2.0.0')
    this.props.use.outdatedBrowser && (packageJson.dependencies['outdatedbrowser'] = '1.1.5 ')
    this.props.use.normalize && (packageJson.dependencies['normalize.css'] = '7.0.0')

    this.fs.writeJSON(this.destinationPath('package.json'), packageJson)

    // Babel
    this.fs.copy(
      this.templatePath('babelrc'),
      this.destinationPath('.babelrc')
    )

    // Editorconfig
    this.fs.copy(
      this.templatePath('editorconfig'),
      this.destinationPath('.editorconfig')
    )

    // Git
    this.fs.copy(
      this.templatePath('gitattributes'),
      this.destinationPath('.gitattributes')
    )

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    )

    // Lint
    this.fs.copy(
      this.templatePath('csslintrc'),
      this.destinationPath('.csslintrc')
    )

    this.fs.copyTpl(
      this.templatePath('eslintrc'),
      this.destinationPath('.eslintrc'), {
        use: this.props.use
      }
    )

    this.fs.copyTpl(
      this.templatePath('config.json'),
      this.destinationPath('config.json'), {
        folder: this.props.folder,
        use: this.props.use
      }
    )

    // Swill Package.json
    var swillPackage = require('../package.json')

    this.fs.copyTpl(
      this.templatePath('gulpfile.js'),
      this.destinationPath('gulpfile.babel.js'), {
        boilerplate: swillPackage,
        preprocessor: this.props.preprocessor
      }
    )

    // Styles
    // if (this.props.componentsCSS) {
    //     this.fs.copy(
    //         this.templatePath('src/stylesheets/' + this.props.preprocessor + '/components/*'),
    //         this.destinationPath(this.props.folder.src + '/' + this.props.stylesSrcFolder + '/components')
    //     )
    // }

    this.fs.copyTpl(
      this.templatePath('src/stylesheets/' + this.props.preprocessor.name + '/**/*'),
      this.destinationPath(this.props.folder.src + '/' + this.props.folder.styles.src + '/'), {
        folder: this.props.folder
      }
    )

    // scripts
    this.fs.copyTpl(
      this.templatePath('src/scripts/**/*'),
      this.destinationPath(this.props.folder.src + '/' + this.props.folder.scripts.src + '/'), {
        use: this.props.use,
        project: this.props.project
      }
    )

    // Images
    if (this.props.include.manifest) {
      this.fs.copy(
        this.templatePath('src/images/touch/icon-128x128.png'),
        this.destinationPath(this.props.folder.src + '/' + this.props.folder.images.src + '/touch/icon-128x128.png')
      )
    }

    if (this.props.include.browserconfig || this.props.include.manifest) {
      this.fs.copy(
        this.templatePath('src/images/touch/ms-touch-icon-144x144-precomposed.png'),
        this.destinationPath(this.props.folder.src + '/' + this.props.folder.images.src + '/touch/ms-touch-icon-144x144-precomposed.png')
      )
    }

    this.fs.copy(
      this.templatePath('src/images/touch/chrome-touch-icon-192x192.png'),
      this.destinationPath(this.props.folder.src + '/' + this.props.folder.images.src + '/touch/chrome-touch-icon-192x192.png')
    )

    this.fs.copy(
      this.templatePath('src/images/touch/apple-touch-icon.png'),
      this.destinationPath(this.props.folder.src + '/' + this.props.folder.images.src + '/touch/apple-touch-icon.png')
    )

    this.fs.copy(
      this.templatePath('src/images/sprite/.gitkeep'),
      this.destinationPath(this.props.folder.src + '/' + this.props.folder.images.src + '/sprite/.gitkeep')
    )

    this.fs.copy(
      this.templatePath('public/img/**/*'),
      this.destinationPath(this.props.folder.dest + '/' + this.props.folder.images.dest + '/')
    )

    this.fs.write(this.props.folder.dest + '/' + this.props.folder.images.dest + '/copyright/.gitkeep', '')

    this.fs.copy(
      this.templatePath('public/favicon.ico'),
      this.destinationPath(this.props.folder.dest + '/favicon.ico')
    )

    // html
    var handlebarsOptions = {
      folder: this.props.folder,
      include: this.props.include,
      project: this.props.project,
      use: this.props.use
    }

    if (this.props.use.handlebars) {
      this.fs.copyTpl(
        this.templatePath('src/handlebars/**/*'),
        this.destinationPath(this.props.folder.src + '/handlebars/'),
        handlebarsOptions
      )
    } else {
      this.fs.copyTpl(
        this.templatePath('public/index.html'),
        this.destinationPath(this.props.folder.dest + '/index.html'),
        handlebarsOptions
      )
      this.fs.copyTpl(
        this.templatePath('public/404.html'),
        this.destinationPath(this.props.folder.dest + '/404.html'),
        handlebarsOptions
      )
    }

    // header
    this.fs.copyTpl(
      this.templatePath('src/header-comments.txt'),
      this.destinationPath(this.props.folder.src + '/header-comments.txt'), {
        author: this.props.author,
        project: this.props.project
      }
    )

    // test
    this.fs.copy(
      this.templatePath('karma.conf.js'),
      this.destinationPath('karma.conf.js')
    )

    this.fs.copy(
      this.templatePath('spec/**/*'),
      this.destinationPath('spec/')
    )

    // vendors
    if (this.props.preprocessor.name === 'sass') {
      this.fs.write(this.props.folder.src + '/vendors/.gitkeep', '')
    } else {
      this.fs.copy(
        this.templatePath('src/vendors/**/*'),
        this.destinationPath(this.props.folder.src + '/vendors')
      )
    }

    // font
    this.fs.write(this.props.folder.dest + '/' + this.props.folder.fonts + '/.gitkeep', '')

    // ====================== Copy optional Files  ======================//

    // optionalFiles
    if (!this.props.include[404]) {
      this.fs.delete(this.destinationPath(this.props.folder.dest + '/404.html'))
      this.fs.delete(this.destinationPath(this.props.folder.src + '/handlebars/404.html'))
    }

    if (this.props.include.htaccess) {
      this.fs.copy(
        this.templatePath('../../node_modules/apache-server-configs/dist/.htaccess'),
        this.destinationPath(this.props.folder.dest + '/.htaccess')
      )
    }

    if (this.props.include.contributing) {
      this.fs.copy(
        this.templatePath('CONTRIBUTING.md'),
        this.destinationPath('CONTRIBUTING.md')
      )
    }

    if (this.props.include.changelog) {
      this.fs.copy(
        this.templatePath('CHANGELOG.md'),
        this.destinationPath('CHANGELOG.md')
      )
    }

    if (this.props.include.travis) {
      this.fs.copyTpl(
        this.templatePath('travis'),
        this.destinationPath('.travis.yml'), {
          include: this.props.include
        }
      )
    }

    if (this.props.include.npmignore) {
      this.fs.copyTpl(
        this.templatePath('npmignore'),
        this.destinationPath('.npmignore'), {
          folder: this.props.folder
        }
      )
    }

    if (this.props.include.crossdomain) {
      this.fs.copy(
        this.templatePath('public/crossdomain.xml'),
        this.destinationPath(this.props.folder.dest + '/crossdomain.xml')
      )
    }

    if (this.props.include.browserconfig) {
      this.fs.copyTpl(
        this.templatePath('public/browserconfig.xml'),
        this.destinationPath(this.props.folder.dest + '/browserconfig.xml'), {
          folder: this.props.folder
        }
      )
    }

    if (this.props.include.manifest) {
      this.fs.copyTpl(
        this.templatePath('public/manifest.json'),
        this.destinationPath(this.props.folder.dest + '/manifest.json'), {
          folder: this.props.folder
        }
      )
    }

    if (this.props.include.robots) {
      this.fs.copy(
        this.templatePath('public/robots.txt'),
        this.destinationPath(this.props.folder.dest + '/robots.txt')
      )
    }

    if (this.props.include.humans) {
      this.fs.copy(
        this.templatePath('public/humans.txt'),
        this.destinationPath(this.props.folder.dest + '/humans.txt')
      )
    }
  }

  // ====================== YO actions ====================== //

  install () {
    var pkg = this.fs.readJSON(this.destinationPath('package.json'), {})
    this.prompts.license = this.props.license = pkg.license

    if (this.props.include.readme) {
      this.fs.copyTpl(
        this.templatePath('README.md'),
        this.destinationPath('README.md'), {
          project: this.props.project,
          githubUser: this.props.githubUser,
          license: this.props.license
        }
      )
    }

    this.config.set(this.prompts)
    this.config.save()
    this.installDependencies({bower: false})
  }

  end () {
    this.log(yosay(
      'Done!'
    ))
  }
}
