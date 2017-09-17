<!-- http://keepachangelog.com/ -->
# Swill Boilerplate Generator

All notable changes to this project will be documented in this file.
This project adheres to [Semantic Versioning](http://semver.org/).

## [0.8.1beta] - 2017-09-17
### Changed
- Set title page title to `Untitle` and other default options when the user don't set
- Update packages
- Remove manifest.webapp

## [0.8.0beta] - 2016-02-07
### Added
- Set license on `README.md`
- set `font-feature-settings` in `<pre>`
- `browserconfig.xml`
- Set dynamic path in `manifest.json` and `manifest.webapp`

### Changed
- Update Swill packages (it's necessary node ^6.0.0)
- Add JavaScript Standard
- Indent size 4 to 2
- Tile icons

### Removed
- Bower option


## [0.7.0beta] - 2016-12-08
### Added
- Support to es2016 and es2017
- Merge media queries
- HTML Validation
- Added new partials `stylus`
    + Lists
    + Pre
    + Abbr

### Changed
- Updated `.eslint` with new rules and removed olds
- Updated font size definition to sans
- Default
- `Stylus` Partial
    + Code
    + Kbd

## [0.6.0beta] - 2016-11-06
### Added
- Config to clean paths
- Option to `.travis.yml` file
- Option to `.npmignore` file
- Set `package.json` repository
- Set `bower.json` keywords, author, repository and ignore files

### Fixed
- Title in handlebars
- Set dynamically outdatedBrowser in `.eslintrc`

### Changed
- karma-chrome-launcher to karma-phantomjs-launcher
- Turned off `sort-vars` in eslint

### Removed
- Background from <body> in `styl` files

## [0.5.0beta] - 2016-10-16
### Fixed
- Set Author url in `package.json`
- Set footer readme project name

### Added
- Set Keywords
- Set description and keywords in `index.html`
- Get Author name and email by git
- Option to set default project language

## [0.4.0beta] - 2016-10-03
### Added
- `bower.json` Optional
- Set boilerplate version on `gulpfile.js`

### Changed
- Moved bower to npm
- Updated dependencies

## [0.3.0beta] - 2016-10-01
### Added
- Class with display block svg sprite
- Set jQuery option in `.eslintrc`

### Changed
- Fixed use of es6

### Fixed
- Removed hard coded option font-path and image-path in stylesheets
- Copy lang folder of outdated-browser

## [0.2.7beta] - 2016-09-18
### Changed
- Fixed boilerplate dependencies

### Fixed
- Set lint and ES6 options
- Lint errors boilerplate `gulpfile.js`
- Links color in Stylus

### Added
- Language option in Handlebars

## [0.2.6beta] - 2016-09-10
### Changed
- Lint Rules
- Update packages

### Fixed
- Slug name in package.json
- Keep necessary folders with `.gitkeep`
- Keep `favicon.ico` and `apple-touch-icon.png`
- Optional 404
- Include humans and icons link in HTML

### Added
- Option to rename handlebars folder

## [0.2.5beta] - 2016-08-31
### Added
- Check if the folder name is equal to project name, if not the boilerplate will be created inside the project name

### Fixed
- Styles and scripts link on HTML
- REM Function in Sass

### Changed
- Updated jQuery dependency

## [0.2.4beta] - 2016-08-13
### Fixed
- Compile SASS

### Changed
- Rename all `.sass` files to `.scss`

## [0.2.3beta] - 2016-07-27
### Fixed
- Ignored NPM files

## [0.2.2beta] - 2016-07-26
### Fixed
- Lint Test

### Added
- `.npmignore` to cancel ignored files in npm

## [0.2.1beta] - 2016-07-10
### Changed
- Refactored `index.js`

### Fixed
- Organized YO saved settings
- Options to generate `scripts/settings/call_plugins.js`
- Env build task `swill boilerplate`

## [0.2.0beta] - 2016-07-03
### Added
- Save settings.
- Handlebars template.

### Fixed
- Bower settings.

## [0.1.0beta] - 2016-02-27
- Initial release, implemented [Swil Boilerplate](https://github.com/tiagoporto/swill-boilerplate) in generator