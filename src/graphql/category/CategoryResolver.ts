import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Category, CategoryInput } from './Category';
import CategorySchema from '../../model/CategorySchema';

@Resolver(Category)
export class CategoryResolver {
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
