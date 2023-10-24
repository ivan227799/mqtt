const path = require("path");


module.exports = {
    // browsers: [
    //     'chrome',
    //     'firefox',
    //     'safari',
    // ],
    files: ['./test/browser/test.js'],
    nodeResove: true,
    // manual: true,
    //open: true,
    // rootDir: path.resolve(__dirname)
    testRunnerHtml: (testFrameworkImport) =>
        `<html>
    <body>
      <script src="dist/mqtt.js"></script>
      <script type="module" src="${testFrameworkImport}"></script>
    </body>
  </html>`

};