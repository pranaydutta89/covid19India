class ConstantsService {

    get pages() {
        return {
            pinned_district: 'Pinned Districts',
            location: 'Location',
            all_district: 'All Districts',
            all_states: 'All States',
        }
    }
}

export default new ConstantsService();