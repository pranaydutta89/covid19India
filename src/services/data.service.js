import storageService from "./storage.service";
class DataService {

    processStateData(data) {
        data.forEach(j => {
            j.confirmed = j.districtData.map(r => r.confirmed).reduceRight((total, num) => total + num)
            j.active = j.districtData.map(r => r.active).reduceRight((total, num) => total + num)
            j.deceased = j.districtData.map(r => r.deceased).reduceRight((total, num) => total + num)
            j.recovered = j.districtData.map(r => r.recovered).reduceRight((total, num) => total + num)

        })
    }

    async getStateDataFromApi() {
        const res = await fetch(
            'https://api.covid19india.org/v2/state_district_wise.json'
        );
        const apiData = await res.json();
        this.processStateData(apiData);
        storageService.localStorageSetItem('stateData', {
            lastUpdatedTimeStamp: Date.now(),
            stateData: apiData
        });
        return apiData;
    }
    async  stateWiseData() {

        const data = storageService.localStorageGetItem('stateData');
        if (data) {
            const { lastUpdatedTimeStamp, stateData } = data;
            if ((Date.now() - lastUpdatedTimeStamp) / 1000 >= 60) {
                //old data fetch new and return
                return await this.getStateDataFromApi();
            } else {
                //if less time before last request then fetch old data
                return stateData;
            }
        }
        else {
            return await this.getStateDataFromApi();
        }
    }
}


export default new DataService();