all: 
	g++ ./cpp/juliaFractal.cpp -o juliaFractal -O3

clean:
	rm juliaFractal
