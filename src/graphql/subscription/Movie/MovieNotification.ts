import { Field, ObjectType } from 'type-graphql';
import { Result } from '../Notification';

@ObjectType()
export class MovieNotification {
  @Field({ nullable: true })
  date: Date;

  @Field({ nullable: true })
  error?: String;

  @Field({ nullable: true })
  result?: Result;
}
