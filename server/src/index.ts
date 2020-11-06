import { MikroORM } from "@mikro-orm/core"
import { __prod__ } from "./constants"
import { Post } from "./entities/Post"
import mikroConfig from "./mikro-orm.config"
import express from "express"
import {ApolloServer} from "apollo-server-express"
import {buildSchema} from "type-graphql"
import { HelloResolver } from "./resolvers/hello"
import { PostResolver } from "./resolvers/post"
import "reflect-metadata"

const main = async () => {
    const orm = await MikroORM.init(mikroConfig)
    await orm.getMigrator().up() // to run the migrations automaticaly so the sql is generated int he migartion file instead of running them in the cli

    const app = express()

    const apolloServer = new ApolloServer({
        schema : await buildSchema({
            resolvers : [HelloResolver , PostResolver],
            validate : false
        }),
        context : () => ({em : orm.em}) // special object that is accessible by all my resolvers
    })

    apolloServer.applyMiddleware({app})
    app.listen(4000 , () => {
        console.log("server started on localhost : 4000")
    })

}

main().catch(err => {
    console.error(err)
})
