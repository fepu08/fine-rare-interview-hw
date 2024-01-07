# Fine+Rare Challenge

## Prerequisites

Docker should be installed and running on your machine, see: [Install Docker Engine](https://docs.docker.com/engine/install/)

## Start and Stop

### Using Docker CLI

- To _start_ execute: `docker compose up -d --build` or you can use
- To _stop_ execute: `docker compose down`

### Using Script files

- On UNIX like operating system

  - make them executable `chmod +x docker-up.sh && chmod +x docker-down.sh`

- On Windows use `git bash`
- To _start_ execute: `docker-up.sh`
- To _stop_ execute: `docker-down.sh`

## Set-up docker-compose.yml (optional)

You can customize various settings in the `docker-compose.yml` file:

- **Backend Service**:

  - To change the port used to access the backend service from your host, modify the `ports` setting. The format is `<host-port>:<container-port>`. For example, to use port 5000 on your host, change to `5000:3000`.

- **Database Service (db)**:

  - **Port Mapping**: To access MongoDB directly from your host machine, change the first part of the port mapping. For example, `5000:27017` allows access at `localhost:5000`. However, within your Docker network (like in your backend service), continue using `db:27017` for connections.

  - **Credentials**: Change the MongoDB username, password, and database name under the `environment` section. Remember to update the `MONGO_CONNECTION_URI` in your backend service accordingly.

    ```yml
    environment:
      - MONGO_INITDB_ROOT_USERNAME=newusername
      - MONGO_INITDB_ROOT_PASSWORD=newpassword
      - MONGO_INITDB_DATABASE=newdbname
    ```

    After changing, ensure your backend service's `MONGO_CONNECTION_URI` reflects these updates:

    ```yaml
    environment:
      - MONGO_CONNECTION_URI=mongodb://newusername:newpassword@db:27017/newdbname
    ```

## Info

Docker should detect file changes, so you don't need to stop and start every time you make change although if you want to add package you first need to stop then start containers again.

In NodeJS, you can connect MongoDB using `db` (service name of mongo) instead of `localhost` in your connection string, though you can connect to DB on host machine using `localhost`.

## Contribution

1. Find an issue you would like to complete
2. Fork repo
3. On your forked repo create a new branch from `feature` branch (see [Branching strategy](#branching-strategy))

### Branching Strategy

We use a GIT-like branching strategy:

- _Features_: Create a new branch from the `feature` branch using the following naming convention:
  - Start with `#` followed by the issue number and an underscore `_`.
  - Then, the issue title in lowercase and snake case `title_of_issue`.
  - For example: `#1_initial_project_setup`.

This strategy and naming convention helps keep track of issues and maintain consistent branch names.

> [!IMPORTANT] When using branch names formatted like this (e.g., for checkout), enclose them in double quotes: `git checkout -b "#1_initial_project_setup"`.

### Creating your feature branch

You can create your feature branch manually or using `create-branch-issue.sh`:

- You need to install [GitHub CLI](https://github.com/cli/cli)
- On UNIX like operating system

  - make it executable `chmod +x create-branch-issue.sh`

- On Windows use `git bash`
  - it may throw error `whereis: command not found` but it will executes anyway
- usage: `./create-branch-from-issue.sh <issue-number>`
  - e.g. `./create-branch-from-issue.sh 1`

The usage of this script is optional.
