class ConstantsService {
  get pages() {
    return {
      pinned_district: 'Watched',
      location: 'Location',
      all_district: 'Districts',
      all_states: 'States',
    };
  }
}

export default new ConstantsService();
