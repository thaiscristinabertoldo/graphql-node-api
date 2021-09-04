import { Resolver, Root, Subscription } from 'type-graphql';
import { NotificationPayload } from '../Notification';
import { TOPICS } from '../topics';
import { MovieNotification } from './MovieNotification';

@Resolver()
export class MovieNotificationResolver {
  @Subscription({
    topics: TOPICS.MOVIE_NOTIFICATION,
  })
  movieNotification(
    @Root() notificationPayload: NotificationPayload
  ): MovieNotification {
    return {
      ...notificationPayload,
      date: new Date(),
    };
  }
}
