# Getting started

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) version 18 or higher.
- A text editor with Typescript and Vue support.


### File Structure

An Aeria system usually consists of two separate parts, the `backend` and the `frontend`. There are rarer use cases when only the backend part is used. If that's what you need, then you're free to skip all the steps regarding `frontend` and `aeria-ui`. You may have the feeling that we are actually documenting two distinct packages altogheter, but it's all intended as the Aeria objective is to make the fullstack experience the most cohesive as possible.

```
.
├── backend
│   ├── src
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
├── frontend
│   ├── src
│   │   └── index.ts
│   ├── package.json
│   └── tsconfig.json
└── package.json
```

Although `pnpm` is used by the Aeria internal workflows, in this documentatil we will use `npm` to illustrate the examples as it is the most popular package manager. You are encouraged to replace it with your package manage of choice in any of the steps below.


### Backend installation

In order to install the Backend dependencies and configure the basic scripts, let's first change our working directory to `./backend` (use your OS `cd` command). Then let's instantiate a `package.json` using the `npm init -y` command. Finally, let's install the required dependencies.

```sh [npm]
$ cd backend
$ npm init -y
$ npm i sonata-backend
$ npm i -D sonata-build
```

After the `package.json` file is created and the dependencies are all in place, let's open the `package.json` file using a text editor and edit the `script` part like the following:

```json
{
    "scripts": {
        "build": "sonata-build -m pipeline"
    }
}
```

### Frontend installation

Let's cd into `frontend` and run the `npm init -y` command again to generate another `package.json`. This time we'll install `aeria-ui` dependencies.

```sh [npm]
$ cd frontend
$ npm init -y
$ npm i waltz-ui
$ npm i -D waltz-build
```

