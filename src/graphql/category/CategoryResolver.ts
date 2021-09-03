import { Arg, Field, InputType, Mutation, Query, Resolver } from 'type-graphql';
import CategorySchema from '../../model/CategorySchema';
import Category from './Category';

@InputType()
class CategoryInput {
  @Field()
  description: String;

  @Field()
  name: String;
}

@Resolver(Category)
class CategoryResolver {
  @Query(() => [Category])
  async categories() {
    const categories = await CategorySchema.find();
    return categories;
  }

  @Query(() => Category)
  async category(@Arg('id') id: String) {
    const category = await CategorySchema.findById(id);
    return category;
  }

  @Mutation(() => Category)
  async createCategory(@Arg('categoryInput') categoryInput: CategoryInput) {
    const category = await CategorySchema.create(categoryInput);
    return category;
  }

  @Mutation(() => Category)
  async updateCategory(
    @Arg('id') id: String,
    @Arg('categoryInput') categoryInput: CategoryInput
  ) {
    const category = await CategorySchema.findOneAndUpdate(id, categoryInput);
    return category;
  }

  @Mutation(() => Boolean)
  async deleteCategory(@Arg('id') id: String) {
    const category = await CategorySchema.findByIdAndRemove(id);

    return category ? true : false;
  }
}

export default CategoryResolver;
