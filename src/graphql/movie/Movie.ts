import { Field, InputType, ObjectType } from 'type-graphql';
import { Category } from '../category';

@ObjectType()
export class Movie {
  @Field()
  _id?: String;

  @Field()
  name: String;

  @Field()
  description: String;

  @Field({ nullable: true })
  category?: Category;
}

@InputType()
export class MovieInput {
  @Field()
  description: String;

  @Field()
  name: String;

  @Field()
  category: String;
}
