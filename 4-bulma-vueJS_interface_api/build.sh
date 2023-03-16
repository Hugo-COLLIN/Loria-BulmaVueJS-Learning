if (docker ps -a | grep vue); then
  docker stop vue
  docker rm vue
  docker image rm vue
fi
docker build -t vue .
echo "docker run -d -p 8080:80 vue" > run.sh
chmod +x run.sh
./run.sh
