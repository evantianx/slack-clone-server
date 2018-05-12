## slack-clone-server

### 初始化配置

* eslint(airbnb)

  ```js
  yarn add -D eslint
  ```

  ```bash
  (
    export PKG=eslint-config-airbnb;
    npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG@latest"
  )
  ```

  > [eslint-config-airbnb](https://www.npmjs.com/package/eslint-config-airbnb)

* babel

  ```js
  yarn add -D babel-cli babel-preset-env babel-preset-stage-3
  ```

  > `babel-preset-stage-3` 包括 async 以及对象展开符（object rest spread）

  安装完毕后在 `.babelrc` 中配置:

  ```js
  {
    "presets": ["env", "stage-3"]
  }
  ```

* nodemon

  > Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. Perfect for development.

  ```js
  yarn add -D nodemon
  ```

最后配置 `package.json` ：

```js
// ...

"scripts": {
  "start": "nodemon --exec babel-node index.js"
}
// ...
```

运行 `yarn start` 即可。

### 项目依赖

* [`graphql-tools`](https://github.com/apollographql/graphql-tools)

  > generate and mock GraphQL.js schemas

  basics:

  ```js
  import { makeExecutableSchema } from "graphql-tools";
  const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers
  });
  ```

* [`apollo-express-server`](https://github.com/apollographql/apollo-server)

  > Setting up Apollo Server with Express.js or Connect

  > [More](https://www.apollographql.com/docs/apollo-server/)

  * [`graphiqlExpress`](https://github.com/apollographql/apollo-server/blob/master/docs/source/graphiql.md)

    ```js
    import { graphiqlExpress } from "apollo-server-express";

    app.use(
      "/graphiql",
      graphiqlExpress({
        endpointURL: "/graphql"
      })
    );
    ```
