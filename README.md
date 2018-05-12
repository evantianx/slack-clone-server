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

* [`Sequelize`](https://github.com/sequelize/sequelize)

> Sequelize is a promise-based Node.js ORM for Postgres, MySQL, SQLite and Microsoft SQL Server. It features solid transaction support, relations, read replication and more.

### database

采用 PostgreSQL：

```bash
brew install postgresql
```

> 正常情况下，安装完成后，PostgreSQL 服务器会自动在本机的 5432 端口开启。

```bash
# 进入 PostgreSQL 命令行模式
psql -d postgres
# 创建数据库
postgres=# create database slack;
# 退出
postgres=# \q
# 连接数据库
postgres=# \c
# 展示数据库所有 table
postgres=# \d
```

```js
const sequelize = new Sequelize("slack", "postgres", "postgres", {
  dialect: "postgres",
  // camelcase 2 snakecase  eg. teamId --> team_id
  define: {
    underscored: true
  }
});
```
