/**
 * @file MIP Processor For JS Compress
 * @author errorrik(errorrik@gmail.com)
 */

var uglifyJS = require('uglify-js');
var objectAssign = require('object-assign');
var MipProcessor = require('mip-processor');


module.exports = exports = MipProcessor.derive({
    name: 'JSCompressor',
    files: ['*.js'],

    compressOptions: {},
    mangleOptions: {},

    /**
     * 单一文件处理
     *
     * @param {FileInfo} 文件信息实例
     * @param {Builder} 构建器实例
     */
    processFile: function (file, builder) {
        var options = prepareOptions({
            compress: this.compressOptions,
            mangle: this.mangleOptions
        });

        var ast = uglifyJS.parse(file.data, {filename: file.fullPath});
        ast.figure_out_scope();
        ast = ast.transform(new uglifyJS.Compressor(options.compress));

        // need to figure out scope again so mangler works optimally
        ast.figure_out_scope();
        ast.compute_char_frequency(options.mangle);
        ast.mangle_names(options.mangle);

        var stream = new uglifyJS.OutputStream({});
        ast.print(stream);

        file.setData(stream.get());
    }
});

/**
 * 准备 uglifyjs 的压缩参数
 *
 * @inner
 * @param {Object} options 用户设置的参数
 * @param {Object=} options.compress 压缩参数
 * @param {Object=} options.mangle 变量处理参数
 * @return {Object}
 */
function prepareOptions(options) {
    return {
        compress: objectAssign(
            {
                warnings: false,
                // see https://github.com/ecomfe/edp/issues/230
                conditionals: false
            },
            options.compress
        ),
        mangle: objectAssign(
            {},
            options.mangle
        )

    };
}

