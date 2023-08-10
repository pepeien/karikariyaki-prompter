# karikariyaki-prompter

### tl;dr

```
git clone https://github.com/pepeien/karikariyaki-prompter.git
cd karikariyaki-prompter/
npm install && npm start
```

### Setting up

1. Navigate towards the `src/environment` folder;

2. Open the file `environment.ts` for development or `environment.prod.ts` for production;

3. These are the variables and their descriptions:

|  Variable  | Description                      |  Type   | Default | Required |
| :--------: | :------------------------------- | :-----: | :-----: | :------: |
| production | If the environment is production | Boolean |         |    ✅    |
|   apiURI   | API address                      | String  |         |    ✅    |
|   wsURI    | API socket address               | String  |         |    ✅    |
|   wsPath   | API socket path                  | String  |         |    ✅    |

### Running

1. At the root of the project;

2. Issue `npm install` wait for the installation;

3. Issue `npm start`;

##### Requirements

-   [npm](https://nodejs.org/en/download/package-manager) (Windows, Linux, Mac)

### Building

1. At the root of the project;

2. Issue `npm install` wait for the installation;

3. Issue `npm run build`;

##### Requirements

-   [npm](https://nodejs.org/en/download/package-manager) (Windows, Linux, Mac)
