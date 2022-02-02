const path = require('path')
const chokidar = require('chokidar')
const { exec } = require('child_process')
const chalk = require('chalk')

const docsDir = path.resolve(__dirname, '../apidoc')

chokidar.watch(docsDir, { ignoreInitial: true }).on('all', (even, path) => {
    if (even === 'add' || even === 'change') {
        exec('npm run apidoc', () => {
            console.log(chalk.blue(`apidoc Server hot reload success! changed ${path}`));
        })
    }
})