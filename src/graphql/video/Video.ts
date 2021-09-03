import { Field, ObjectType } from 'type-graphql';
import Category from '../category/Category';

@ObjectType()
class Video {
  @Field()
  _id: String;

  @Field()
  name: String;

  @Field()
  description: String;

  @Field(() => Category)
  category: Category;
}

export default Video;
