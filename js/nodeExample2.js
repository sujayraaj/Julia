const Julia = require('./Julia');
for(let i=0;i<180;i++){
    let j=(2*Math.PI*i)/180;
    let sin = Math.sin(j)/100;
    let cos = Math.cos(j)/100;
    let Image1 = new Julia({
        width:1000,
        height:1000,
        maxLength:4.0,
        maxIterations:255,
        c:[-0.75+cos,0.11+sin]
    });
    let str;
    Image1.generateColorMap((i,m)=>[Math.ceil(255*Math.sin(Math.PI*i/(m))),Math.ceil(255*Math.sin(Math.PI*i/(2*m))),Math.ceil(255*Math.cos(Math.PI*i/(2*m)))])
    Image1.generateRaster();
    if(i<10) str=`00${i}`;
    else if(i>=10 && i < 100) str = `0${i}`;
    else str = `${i}`;
    console.log(`image-${str}.png`);
    Image1.writeToFile(`im-${str}.png`);
    
}
