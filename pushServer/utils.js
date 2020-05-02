class Utils {

    getSelectedAttirbutes(keys, input) {
        const obj = {}
        for (let key in input) {
            if (keys.some(r => r === key)) {
                obj[key] = input[key]
            }
        }
        return obj;
    }
}


module.exports = new Utils();