import CrudRepository from "./crudRepository.js";

class ChannelRepository extends CrudRepository {
  constructor(model) {
    this.model = model;
  }
}
export default ChannelRepository;
