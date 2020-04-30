class ConstantsService {
  get Configs() {
    if (process.env.NODE_ENV === 'production') {
      return {
        geocodingApiKey: '4a9d4d27ef164904b94e8c6534966432',
        covidDataUrl: 'https://api.covid19india.org',
        pushPublicKey: "BGu1xK1u0zFGibK-V-BhmRNIrzGniwPOmC9AOnR5c4AMFKgXdGgT8jbI_yMz9S6PX3jQ9pmu5TqCs5DPjwrui3I",
        apiUrl:'http://api.covid2.in'
      };
    } else {
      return {
        geocodingApiKey: '4a9d4d27ef164904b94e8c6534966432',
        covidDataUrl: 'https://api.covid19india.org',
        pushPublicKey: "BGu1xK1u0zFGibK-V-BhmRNIrzGniwPOmC9AOnR5c4AMFKgXdGgT8jbI_yMz9S6PX3jQ9pmu5TqCs5DPjwrui3I",
        apiUrl: 'http://localhost:5000'
      };
    }
  }
  get pages() {
    return {
      pinned_district: 'Watched',
      location: 'Location',
      all_district: 'Districts',
      all_states: 'States',
      country_brief: 'India',
    };
  }
}

export default new ConstantsService();
