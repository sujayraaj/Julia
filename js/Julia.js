const file = require('fs');
const Jimp = require('jimp');

class Julia {
    constructor({width,height,c,maxLength,maxIterations}){
        this.width = width;
        this.height = height;
        this.c = c;
        this.maxL = maxLength;
        this.maxI = maxIterations;
    }
    squaredLength(complexNum){
        let r = complexNum[0], im = complexNum[1];
        return r*r+im*im;   
    }
    iterate(complexNum,count){
        if( count >= this.maxI)
            return this.maxI-1;
        if(this.squaredLength(complexNum)>this.maxL)
            return count;
        count++;
        let r=complexNum[0];
        let im=complexNum[1];
        let nextComplexNum = [r*r-im*im + this.c[0],2*r*im +this.c[1]];
        return this.iterate(nextComplexNum,count);
    }
    generateColorMap(colormapFunc){
        this.colorMap = [];
        for(let iter=0;iter<this.maxI;iter++){
            this.colorMap.push(colormapFunc(iter,this.maxI));
        }
    }
    generateRaster(){
        if(!this.colorMap) this.generateColorMap((i,m)=>[Math.ceil(255*i/m),Math.ceil(255*i/m),Math.ceil(255*i/m),255]);
        const row = this.height;
        const column = this.width;
        const __self = this;
        this.raster = new Jimp(row, column, function (err, image) {
            let buffer = image.bitmap.data;
            let count;
            for(let i=-row/2;i<row/2;i++)
            {
            for(let j=-column/2;j<column/2;j++)
            {
            count=0;
            let planeXY=[i*4.0/row,(j*4.0)/column];
            let colorIndex = __self.iterate(planeXY,count);
            let l = i+(row/2);
            let r = j+(column/2);
            let offset = (r * row + l) * 4 // RGBA = 4 bytes
            buffer[offset    ] = __self.colorMap[colorIndex][0]    // R
            buffer[offset + 1] = __self.colorMap[colorIndex][1]    // G
            buffer[offset + 2] = __self.colorMap[colorIndex][2]    // B
            buffer[offset + 3] = __self.colorMap[colorIndex][3]   // Alpha
        }
            }
          })
    }
    writeToFile(name){
        if(!this.raster) return -1;
        this.raster.write(name);
        return 0;
    }
}

module.exports = Julia;
