
class ConstantsService {


  get Configs() {
    if (process.env.NODE_ENV === 'production') {
      return {
        geocodingApiKey: '4a9d4d27ef164904b94e8c6534966432',
        covidDataUrl: 'https://api.covid19india.org'
      };
    }
    else {
      return {
        geocodingApiKey: '4a9d4d27ef164904b94e8c6534966432',
        covidDataUrl: 'http://localhost:3000'
      }
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
