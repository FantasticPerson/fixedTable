'use strict';

global.__COMPILE__ = true;


require('babel-core/register');
require('babel-polyfill');

process.on('uncaughtException', globalErrHandler);
process.on('unhandledRejection', globalErrHandler);

function globalErrHandler(err) {
  let errorStackTrace = err instanceof Error ? err.stack || err.stacktrace || "" : err.toString();
  console.error('App crash', `Err:\n ${errorStackTrace}`);
}

import fs from 'fs'
import path from 'path'
import gulp from 'gulp'
import * as DEV_CONST from './dev/const'

let taskConfigs = [];
export const context = {
  taskConfigs: taskConfigs,

  buildAppGreenDirPaths: [],
  buildAppInstallPaths: [],
  outZipFilePath: null,
  targetZipFilePath:null,
  storage: null,
  dependsMd5Changed: false,
  buildTimes: 0
};

let gulpTaskFiles = fs.readdirSync(DEV_CONST.DEV_GULP_TASKS_DIR);
gulpTaskFiles.forEach(function(fileName) {
  let validReg = /^\w\S*.js/;
  if(!validReg.test(fileName)) return;
  let gulpTaskFilePath = `${DEV_CONST.DEV_GULP_TASKS_DIR}/${fileName}`;
  let gulpTaskConfig = require(gulpTaskFilePath)(context);
  let taskFileName = path.basename(fileName,'.js');

  if(!gulpTaskConfig.name) {
    gulpTaskConfig.name = taskFileName;
  }

  if(!gulpTaskConfig.deps) {
    gulpTaskConfig.deps = [];
  }

  if(gulpTaskConfig.deps.length == 0 && !gulpTaskConfig.fn) return;

  taskConfigs.push(gulpTaskConfig);
  gulp.task.apply(gulp, [gulpTaskConfig.name, gulpTaskConfig.deps, gulpTaskConfig.fn]);
});
