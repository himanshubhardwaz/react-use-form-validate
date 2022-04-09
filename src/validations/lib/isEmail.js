// This is the same email regex as browsers use when type="email"
const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

// eslint-disable-next-line import/no-anonymous-default-export
const isEmail = config => value => {
    return !EMAIL_REGEXP.test(value) ? config.message : null;
};

export default isEmail