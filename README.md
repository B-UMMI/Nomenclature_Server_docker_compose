# Nomenclature_Server_docker_compose :whale2: :package:

Docker-compose for the [Nomenclature Server](https://github.com/B-UMMI/Nomenclature_Server) webapp.
It uses the following docker images: 
* postgres: `postgres:10`
* virtuoso: `openlink/virtuoso-opensource-7:7.2`
* redis: `redis:5.0.6`  
* nginx: `nginx:1.17`
* node: `node:13`
* NS API: [this dockerfile](https://github.com/B-UMMI/Nomenclature_Server_docker_compose/blob/master/Dockerfile)
* NS UI: [this dockerfile](https://github.com/B-UMMI/Nomenclature_Server_docker_compose/blob/master/frontend_react/chewie_ns/Dockerfile.prod)


## Starting the compose 
To start the compose run:
```
docker-compose up --build
```

Launch the NS app by accessing [127.0.0.1:5000/NS/api/docs](http://127.0.0.1:5000/NS/api/docs) on your browser. This link will take you to the Swagger page of the API.


## Notes
If you need to run SPARQL queries directly in Virtuoso, access the Virtuoso Conductor at  [localhost:8080](http://localhost:8890/).

Make sure that these ports are not already in use by other services. More info available [here](https://www.cyberciti.biz/faq/unix-linux-check-if-port-is-in-use-command/).


## Contacts 
* Chewie-NS development team (imm-bioinfo@medicina.ulisboa.pt)
