const Julia = require('./Julia');

let Image1 = new Julia({
    width:1000,
    height:1000,
    maxLength:4.0,
    maxIterations:255,
    c:[-0.4,0.6]
});

Image1.generateRaster();
Image1.writeToFile('test.png');
