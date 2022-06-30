export default function customValidator(config) {
    return function (value) {
        if (!config.validator(value)) return config.message;
        else return null;
    }
}