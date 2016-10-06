mip-processor-jscompress (MIP Processor For JS Compress)
===========

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
