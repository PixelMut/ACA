// Karma configuration
// Generated on Thu May 07 2020 15:47:23 GMT+0200 (GMT+02:00)

// module.exports = function(config) {
//   config.set({

//     // base path that will be used to resolve all patterns (eg. files, exclude)
//     basePath: '',


//     // frameworks to use
//     // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
//     frameworks: ['jasmine'],


//     plugins: [
//       require('karma-jasmine'),
//       require('karma-coverage'),
//       require('karma-chrome-launcher'),
//       require('karma-jasmine-html-reporter'),
//       require('karma-webpack'),
//       require('karma-sourcemap-loader'),
//       require('ts-loader'),
//       require('karma-mocha-reporter'),
//       require('karma-remap-coverage')],

//     // list of files / patterns to load in the browser
//     files: [
      
//       'src/**/*.ts'
//     ],
//     // 'src/**/app.component.spec.ts'


//     // list of files / patterns to exclude
//     exclude: [
//     ],


//     // preprocess matching files before serving them to the browser
//     // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
//     preprocessors: {   
//       './config/spec-bundle.js' : ['coverage', 'webpack', 'sourcemap']
//      },
//      //webpack : require('./webpack.test.config.js'),
//     // preprocessors: {
//     //   '**/*.ts' : ['typescript']
//     // },

//     // typescriptPreprocessor :{
//     //   options : {
//     //     sourceMap : true, // generates source map
//     //     noResolve : false  // enforce type resolution
//     //   },
//     //   transformPath : function(path) {
//     //     return path.replace(/\.ts$/,'.js');
//     //   }
//     // },
//      coverageReporter : {
//         type: 'in-memory'
//      },

//      remapCoverageReporter : {
//         'text' : null,
//         json : './coverage/coverage.json',
//         html : '.coverage/html'
//      },

//      webpackMiddleware : {
//         logLevel : 'warn',
//         stats : {
//           chunks: false
//         }
//      },
//     // test results reporter to use
//     // possible values: 'dots', 'progress'
//     // available reporters: https://npmjs.org/browse/keyword/karma-reporter
//     reporters: ['mocha', 'progress', 'coverage', 'kjhtml' , 'remap-coverage'],


//     // web server port
//     port: 9876,


//     // enable / disable colors in the output (reporters and logs)
//     colors: true,


//     // level of logging
//     // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
//     logLevel: config.LOG_WARN,


//     // enable / disable watching file and executing tests whenever any file changes
//     autoWatch: false,


//     // start these browsers
//     // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
//     browsers: ['Chrome'],


//     // Continuous Integration mode
//     // if true, Karma captures browsers, runs the tests and exits
//     singleRun: true,

//     // Concurrency level
//     // how many browser should be started simultaneous
//     concurrency: Infinity
//   })
// }

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    coverageIstanbulReporter: {
      dir: require('path').join(__dirname, './coverage/ACA'),
      reports: ['html', 'lcovonly', 'text-summary'],
      fixWebpackSourcePaths: true
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    restartOnFileChange: true
  });
};
