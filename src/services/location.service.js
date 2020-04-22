class LocationService {

    get GeoLocationAccess() {
        return new Promise((res, rej) => {
            navigator.geolocation.getCurrentPosition((position) => {
                res(position.coords);
                // same as above
            }, (error) => {
                rej(error)
            });
        })
    }


    async currentLocation() {
        const position = await this.GeoLocationAccess;
        const { latitude, longitude } = position;
        const constructMapApiURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyArsR0pTwkxruxnG-ymhXWWLk65jyWkBfk`;
        const fetchRes = await fetch(constructMapApiURL);
        const data = await fetchRes.json();
        const { results } = data;
        const addressComponents = results.map(r => r.address_components);
        let cityName;
        let stateName;
        for (let address of addressComponents) {
            cityName = address.find(r => r.types.some(j => j === 'administrative_area_level_2'));
            stateName = address.find(r => r.types.some(j => j === 'administrative_area_level_1'));
            if (cityName && stateName) {
                break;
            }
        }

        if (cityName && stateName) {
            const { long_name: cityLongName, short_name: cityShortName } = cityName
            const { long_name: stateLongName, short_name: stateShortName } = stateName
            return {
                city: {
                    longName: cityLongName,
                    short_name: cityShortName
                },
                state: {
                    longName: stateLongName,
                    short_name: stateShortName
                },
            }
        }
    }

}

export default new LocationService();