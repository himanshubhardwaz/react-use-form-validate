export default function equals(config) {
    return function (value) {
        if (value !== config.value) {
            return config.message;
        } else return null
    }
}