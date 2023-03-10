docker build -t vue .
echo "docker run --rm -it -p 8080:8080 vue" > run.sh
chmod +x run.sh
./run.sh
