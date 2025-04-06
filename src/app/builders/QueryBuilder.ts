import { FilterQuery, Query } from "mongoose";

export class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, any>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchAbleField: string[]) {
    const searchTerm = this.query.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchAbleField.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            } as FilterQuery<T>)
        ),
      });
    }
    return this;
  }

  filter(filterFields: string[]) {
    const queryObj = { ...this.query };
    const filters: Record<string, any> = {};
    const excludeFields = ["searchTerm", "sort", "limit", "page", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);

    filterFields.forEach((field) => {
      if (queryObj[field]) {
        filters[field] = queryObj[field];
      }
    });

    // ✅ Min & Max Price Filtering
    if (queryObj.minPrice || queryObj.maxPrice) {
      filters.price = {};
      if (queryObj.minPrice) {
        filters.price.$gte = Number(queryObj.minPrice);
      }
      if (queryObj.maxPrice) {
        filters.price.$lte = Number(queryObj.maxPrice);
      }
    }
    if (queryObj.rating) {
      filters.ratingAverage = {
        $gte: Number(queryObj.rating),
      };
    }

    this.modelQuery = this.modelQuery.find(filters);
    return this;
  }

  sort() {
    const sort =
      (this.query.sort as string)?.split(",")?.join(" ") || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }
  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }
  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}
