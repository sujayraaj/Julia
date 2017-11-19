# Generate various types of Julia Fractals ( Either JS or C++ )

![Julia Fractal](https://raw.githubusercontent.com/sujayraaj/julia-fractal-creator/master/raster-001.png)

## Usage

### NodeJS version
Install dependencies

    npm install

require the class in your file

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

### C++ version
Compiling :

	make

Running :

	juliaFractal <row/column width> <output-filename>

