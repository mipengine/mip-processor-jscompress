var Processor = require('../index');

function MockFile(options) {
    this.setData(options.data);
    this.relativePath = options.relativePath;
    this.fullPath = options.fullPath;
}

MockFile.prototype.setData = function (data) {
    this.data = data
};

function MockBuilder() {
    this.processFiles = [
        new MockFile({
            data: 'define("test",["require"],function (require) {var name="name";var value = "value";});',
            fullPath: '/project/1.js',
            relativePath: '1.js'
        }),
        new MockFile({
            data: 'define("test",["require"],function (require) {var name="name";var value = "value";});',
            fullPath: '/project/2.css',
            relativePath: '2.css'
        }),
        new MockFile({
            data: '(function () {var name = "name";alert(name)})();',
            fullPath: '/project/3.js',
            relativePath: '3.js'
        })
    ];
}

MockBuilder.prototype.getProcessFiles = function () {
    return this.processFiles;
};

describe("JS Compressor", function () {

    it("process *.js by default", function (done) {
        var processor = new Processor();
        var builder = new MockBuilder();

        processor.process(builder).then(function () {
            var files = builder.getProcessFiles();
            expect(/function\([a-z]\)/i.test(files[0].data)).toBeTruthy();
            expect(/function\s*\(require\)/i.test(files[1].data)).toBeTruthy();
            expect(/var [a-z]=/i.test(files[2].data)).toBeTruthy();

            done();
        });
    });

});
