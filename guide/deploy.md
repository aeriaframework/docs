# Deploy

## docker-compose

Repositories created with `create-aeria-app` comes with a ready-to-use docker-compose.yml file, alongside with dockerfiles to build the api, the web, and to bring up a nginx reverse proxy to serve both. This is the bare minimal required to deploy a full Aeria app exposing a single port. You may change or augment this file as needed.

```docker-compose
version: '3.8'

services:
  mongo:
    image: mongo
    restart: always
    volumes:
      - /tmp/mongodb-test:/data/db
      - api-build:/opt/application/api-build
    logging:
      driver: none

  api:
    build:
      context: api
    restart: always
    depends_on:
      - mongo
    volumes:
      - api-build:/opt/application/api-build
    env_file: api/production.env

  web:
    build:
      context: web
    depends_on:
      - api
    volumes:
      - api-build:/opt/application/api
      - web-build:/var/www/html

  nginx:
    build:
      context: nginx
    restart: always
    depends_on:
      - web
    ports:
      - 80:80
    volumes:
      - web-build:/var/www/html

volumes:
  api-build:
  web-build:

```

### Installing dependencies

You will by default need `docker` and `docker-compose` installed in order to deploy.
On Debian-based distros, you can install both dependencies with `sudo apt install docker docker-compose`. Follow [this link](https://docs.docker.com/engine/install/) to get guidance on how to install the Docker Engine on each Linux distro and operating system.

### Deploying locally

To deploy directly on your host machine, the following commands will suffice.
Browse to `http://localhost:8080` after they are finished to see it has worked.

```
# docker-compose build
# docker-compose up -d
```

### Deploying remotely

To deploy on remote machines over SSH, [Docker contexts](https://docs.docker.com/engine/context/working-with-contexts/) are strongly recommended.

1. Make sure you have public and private SSH keys set up.

2. Create a Docker context if you hadn't already.

::: warning WARNING
If you aren't logged in as root on your host machine, don't escalate privileges
before running `docker context` commands, otherwise your SSH keys won't read.
:::

```
$ docker context create remote --docker host=ssh://root@89.116.186.44
```

3. Switch over to the context you just created.

```
$ docker context use remote
```

4. Run the commands to build and bring up the container orchestration as you would do locally.

```
$ docker-compose build
$ docker-compose up -d
```


