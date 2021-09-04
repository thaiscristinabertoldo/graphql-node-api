import { Field, InputType, ObjectType } from 'type-graphql';

@ObjectType()
export class Category {
  @Field()
  name: String;

  @Field()
  description: String;

  @Field()
  _id: String;
}

@InputType()
export class CategoryInput {
  @Field()
  description: String;

  @Field()
  name: String;
}
