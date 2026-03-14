class CrudRepository {
  constructor(model) {
    this.model = model;
  }
  async create(data) {
    const response = await this.model.create(data);
    return response;
  }
  async getAll() {
    const response = await this.model.find({});
    return response;
  }
  async getById(id) {
    console.log("Id received is ", id);
    const response = await this.model.findById(id);
    return response;
  }
  async destroy(id) {
    const response = await this.model.findByIdAndDelete(id);
    return response;
  }
  async update(id, data) {
    const response = await this.model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    return response;
  }
  async deleteMany(modelIds) {
    const response = await this.model.deleteMany({ _id: { $in: modelIds } });
    return response;
  }
}
export default CrudRepository;
