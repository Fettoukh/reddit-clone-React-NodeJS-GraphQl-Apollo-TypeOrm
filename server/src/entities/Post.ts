import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType() // so this class can be used a grapqhql type in the resolvers
@Entity()
export class Post {

  @Field() // used with object types to expose those dields to our graphql schema
  @PrimaryKey()
  id!: number;

  @Field(() => String) //while using graphql we need to specift this types
  @Property({type : "date"})
  createdAt = new Date();

  @Field(() => String) 
  @Property({ type :"date" ,  onUpdate: () => new Date() })
  updatedAt = new Date();

  @Field() 
  @Property({type : "text"})
  title!: string;

}