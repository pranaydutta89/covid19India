class UtilityService {

    cloneDeep(data) {
        return JSON.parse(JSON.stringify(data));
    }
}

export default new UtilityService();