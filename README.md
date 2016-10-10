mip-processor-jscompress
===========

MIP Processor For JS Compress


<a href="https://circleci.com/gh/mipengine/mip-processor-jscompress/tree/master"><img src="https://img.shields.io/circleci/project/mipengine/mip-processor-jscompress/master.svg?style=flat-square" alt="Build Status"></a>

### usage

```js
var Builder = require('mip-builder');
var JSCompressor = require('mip-processor-jscompress');

var builder = new Builder({
    // bla bla

    processor: [
        // bla bla
        
        new JSCompressor()
    ]
});

builder.build();

```
