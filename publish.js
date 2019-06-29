const { execSync } = require('child_process');
const path = require('path');
const { readFileSync, writeFileSync } = require('fs');

execSync('git clone git@github.com:fabricjs/fabric.js.git fabric-repository');

const pkgPath = path.resolve(__dirname, 'fabric-repository/package.json');

writeFileSync(
  pkgPath,
  JSON.stringify({
    ...JSON.parse(
      readFileSync(pkgPath)
    ),
    optionalDependencies: {},
    name: 'fabric-pure-browser',
    description: require('./package.json').description,
  }, null, '\t'),
);

execSync('npm i --no-shrinkwrap && npm run build && npm publish', {
  cwd: path.resolve(__dirname, 'fabric-repository'),
});

console.log('Success!');
