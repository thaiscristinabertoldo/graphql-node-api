import { Field, ObjectType, registerEnumType } from 'type-graphql';

export enum NotificationType {
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

registerEnumType(NotificationType, {
  name: 'NotificationType',
});

export interface NotificationPayload {
  error?: String;
  result?: Result;
}

@ObjectType()
export class Result {
  @Field(() => NotificationType)
  type: NotificationType;

  @Field()
  id: String;
}
