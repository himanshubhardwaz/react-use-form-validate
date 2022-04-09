export default function pattern(config) {
    return function (value) {
        if (!config.regex.test(value)) {
            return config.message;
        } else return null;
    }
}