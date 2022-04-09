export default function isRequired(config) {
    return function (value) {
        if (value === '') {
            return config.message;
        } else {
            return null;
        }
    };
}