import { __prod__ } from "./constants";
import { Post } from "./entities/Post";
import {MikroORM} from "@mikro-orm/core"
import path from "path"

export default {
    migrations : {
        path: path.join(__dirname,'./migrations'), // path to the folder with migrations
        pattern: /^[\w-]+\d+\.[tj]s$/, // regex pattern for the migration files
    },
    password : "postgresql",
    entities : [Post],
    dbName : "lireddit",
    type :"postgresql",
    debug : !__prod__
} as Parameters<typeof MikroORM.init>[0] // so the type gets more specific
// we got the type that init in the index file expect since we are using typescript