export default function min(config) {
    return function (value) {
        if (value.length < config.length) {
            return config.message;
        } else return null;
    }
}