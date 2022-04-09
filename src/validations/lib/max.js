export default function max(config) {
    return function (value) {
        if (value.length > config.length) {
            return config.message;
        } else return null;
    }
}