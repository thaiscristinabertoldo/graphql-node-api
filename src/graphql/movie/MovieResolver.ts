import {
  Arg,
  Mutation,
  Publisher,
  PubSub,
  Query,
  Resolver,
} from 'type-graphql';

import { MovieSchema } from '../../model';
import {
  NotificationPayload,
  NotificationType,
} from '../subscription/Notification';
import { sendNotification } from '../subscription/sendNotification';
import { TOPICS } from '../subscription/topics';
import { Movie, MovieInput } from './Movie';

@Resolver(Movie)
export class MovieResolver {
  @Query(() => [Movie])
  async movies() {
    const movies = await MovieSchema.find().populate('category');
    return movies;
  }

  @Query(() => Movie)
  async movie(@Arg('id') id: String) {
    const movie = await MovieSchema.findById(id).populate('category');
    return movie;
  }

  @Mutation(() => Movie)
  async createMovie(
    @Arg('movieInput') movieInput: MovieInput,
    @PubSub(TOPICS.MOVIE_NOTIFICATION) publish: Publisher<NotificationPayload>
  ) {
    const movie = await MovieSchema.create(movieInput);

    await sendNotification({
      fnPublish: publish,
      type: NotificationType.ADD,
      id: movie?._id,
    });

    return movie;
  }

  @Mutation(() => Movie)
  async updateMovie(
    @Arg('id') id: String,
    @Arg('movieInput') movieInput: MovieInput,
    @PubSub(TOPICS.MOVIE_NOTIFICATION) publish: Publisher<NotificationPayload>
  ) {
    const movie = await MovieSchema.findOneAndUpdate(id, movieInput, {
      new: true,
    });

    await sendNotification({
      fnPublish: publish,
      type: NotificationType.UPDATE,
      id: movie?._id,
    });

    return movie;
  }

  @Mutation(() => Boolean)
  async deleteMovie(
    @Arg('id') id: String,
    @PubSub(TOPICS.MOVIE_NOTIFICATION) publish: Publisher<NotificationPayload>
  ) {
    const movie = await MovieSchema.findByIdAndRemove(id);

    await sendNotification({
      fnPublish: publish,
      type: NotificationType.DELETE,
      id: movie?._id,
    });

    return movie ? true : false;
  }
}
