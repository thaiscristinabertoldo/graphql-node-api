import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import VideoSchema from '../../model/VideoSchema';
import Video from './Video';

@InputType()
class VideoInput {
  @Field()
  description: String;

  @Field()
  name: String;

  @Field()
  category: String;
}

@Resolver(Video)
class VideoResolver {
  @Query(() => [Video])
  async videos() {
    const videos = await VideoSchema.find().populate('category');
    return videos;
  }

  @Query(() => Video)
  async video(@Arg('id') id: String) {
    const video = await VideoSchema.findById(id).populate('category');
    return video;
  }

  @Mutation(() => Video)
  async createVideo(@Arg('videoInput') videoInput: VideoInput) {
    const video = await VideoSchema.create(videoInput);
    return video;
  }

  @Mutation(() => Video)
  async updateVideo(
    @Arg('id') id: String,
    @Arg('videoInput') videoInput: VideoInput
  ) {
    const video = await VideoSchema.findOneAndUpdate(id, videoInput);
    return video;
  }

  @Mutation(() => Boolean)
  async deleteVideo(@Arg('id') id: String) {
    const video = await VideoSchema.findByIdAndRemove(id);
    return video ? true : false;
  }
}

export default VideoResolver;
