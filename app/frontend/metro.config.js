const { getDefaultConfig } = require('expo/metro-config');
/** @type {import('expo/metro-config').MetroConfig} */

const config = getDefaultConfig(__dirname, {
  isCSSEnabled: true,

});

config.resolver.sourceExts.push('mjs');
module.exports = config;
