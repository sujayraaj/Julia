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
        this.raster = [];
        let count;
        for(let i=-row/2;i<row/2;i++)
        {
        for(let j=-column/2;j<column/2;j++)
        {
        count=0;
        let planeXY=[i*4.0/row,(j*4.0)/column];
        let colorIndex = this.iterate(planeXY,count);
        let l = i+(row/2);
        let r = j+(column/2);
        let offset = (r * row + l) * 4 // RGBA = 4 bytes
        this.raster.push(this.colorMap[colorIndex])    // R
        }
        }
    }
    writeToCanvas(ctx,x,y){
        if(!this.raster) return -1;
        for(let i=0;i<this.width;i++){
            for(let j=0;j<this.height;j++){
                let color = this.raster[this.height*i + j]
                ctx.fillStyle = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                ctx.fillRect(x+i, y+j, x+i+1, y+j+1);
            }
        }
        return 0;
    }
}
