#include<iostream>
#include<complex>
#include<fstream>
#include<cstdlib>
#include <time.h>

using namespace std;

inline double squaredLength(float *i){
double r=i[0];
double im=i[1];
return r*r+im*im;
}

// Can be used alter type fo Julia Fractal created
// F =  z*z + c //  c = CA + iCB
float CA= -0.4;
float CB = 0.6;

// The main Julia Set function, defined recursively

int Julia(float *init,int &count)
{
if(squaredLength(init)>4.0f){
return count;
}
if(count>=255){
return 255;
}
else{
++count;
double r=init[0];
double im=init[1];
float *arr = new float[2];
arr[0]=r*r-im*im + CA;
arr[1]=2*r*im +CB;
return Julia(arr,count);
}
}

// set is used to set a pixel in our raster to a specified grayscale

bool set(int i,int j,int color,int **im,int row,int column){
if(0>j||j>column) return false;
if(0>i||i>row) return false;
im[j][i]=color;
}

// writes PPM (NetBMP) images such implementation leaves scope for multicolored fractals

void writePPM(ostream& out,int **raster,int ny,int nx)
{
//output header
out <<  "P6\n";
out <<  nx  <<' '<< ny << '\n';
out << "255\n";
for(int i=ny-1;i>=0;i--)
for(int j=0;j<nx;j++){
out.put(raster[j][i]);
out.put(raster[j][i]);
out.put(raster[j][i]);
}
}

int main(int argc, char* argv[])
{
clock_t startTime = clock();
if(argc!=5){
printf("Usage: %s <row/column width> <CA> <CB> <output-filename>\nWhere the function is F = z*z +c\n c = CA + iCB\n",*argv);
return 1;
}
else{
int row=atoi(argv[1]);
int column=row, count, jul;
int **im;
float t,tt;
CA = atof(argv[2]);
CB = atof(argv[3]);
ofstream fout(argv[4]);
im = new int* [column];
for(int k=0;k<column;k++)
im[k]=new int [row];

for(int i=-row/2;i<row/2;i++)
{
for(int j=-column/2;j<column/2;j++)
{
count=0;
float *arr = new float[2];
arr[0] = (float)i*4.0/(float)row;
arr[1] = ((float)j*4.0)/(float)column;
jul=Julia(arr,count);
delete [] arr;
set(i+(row/2),j+(column/2),jul,im,row,column);
}
}
writePPM(fout,im,row,column);
fout.close();
for(int k=0;k<column;k++)
delete [] im[k];
delete [] im;
double secs = double( clock() - startTime ) / (double)CLOCKS_PER_SEC;
cout<<"Execution Time : "<<secs<<endl;
return 0;
}
}
