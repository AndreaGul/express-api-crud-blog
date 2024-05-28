const path = require('path');
const fs = require('fs');

const readJSON = (fileName) => {
  const filePath = path.join(__dirname, 'db', `${fileName}.json`);
  const json = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(json);
};
const writeJSON = (filename, data) => {
  const filePath = path.join(__dirname, 'db', `${filename}.json`);
  const json = JSON.stringify(data);
  fs.writeFileSync(filePath, json);
};

module.exports = {
  readJSON,
  writeJSON,
};
