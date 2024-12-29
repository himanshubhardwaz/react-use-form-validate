# react-use-form-validate

# This package has been deprecated. Please use [@heisenburg/react](https://www.npmjs.com/package/@heisenburg/react) instead.

> Super customizable validation library for forms in react

[![NPM](https://img.shields.io/npm/v/react-use-form-validate.svg)](https://www.npmjs.com/package/react-use-form-validate) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-use-form-validate
```

## Usage

```jsx
import React from "react";
import { useValidation } from "react-use-form-validate";

const validationFunction = (value) => {
  return value === "abc";
};

const App = () => {
  let config = {
    fields: {
      email: {
        isRequired: { message: "Email is Required" },
        isEmail: { message: "Please enter a valid Email address" },
      },
      password: {
        isRequired: { message: "Password is Required" },
      },
      maxField: {
        max: {
          message: "Max size exceeded",
          length: 5,
        },
      },
      minField: {
        min: {
          message: "Min size not fulfilled",
          length: 5,
        },
      },
      equalField: {
        equals: {
          message: "Does not match expected value",
          value: "React",
        },
      },
      regexField: {
        pattern: {
          message: "You can only enter alphabets in this field",
          regex: /^[A-Za-z]+$/,
        },
      },
      validatorField: {
        customValidator: {
          message: "Validation failed by validator function",
          validator: validationFunction,
        },
      },
    },
    onSubmit: (context) => {
      if (context.isFormValid) {
        console.log("Form is valid and ready to be submitted");
      } else {
        console.log("Form is valid and ready to be submitted");
      }
    },
    showErrors: "blur",
  };

  const { getFieldProps, getFormProps, errors } = useValidation(config);

  return (
    <form {...getFormProps()}>
      <input {...getFieldProps("email")} type="text" placeholder="Email" />
      {errors.email && (
        <div>
          <p>
            {/* {errors.email ? errors.email : submittedErrors.email} */}
            {errors.email}
          </p>
        </div>
      )}

      <div>
        <input
          {...getFieldProps("password")}
          type="password"
          placeholder="Password"
        />
        {errors.password && (
          <div>
            <p>{errors.password}</p>
          </div>
        )}
      </div>

      <div>
        <input
          {...getFieldProps("maxField")}
          type="text"
          placeholder="Max 5 char"
        />
        {errors.maxField && (
          <div>
            <p>{errors.maxField}</p>
          </div>
        )}
      </div>

      <div>
        <input
          {...getFieldProps("minField")}
          type="text"
          placeholder="min 5 char"
        />
        {errors.minField && (
          <div>
            <p>{errors.minField}</p>
          </div>
        )}
      </div>

      <div>
        <input
          {...getFieldProps("equalField")}
          type="text"
          placeholder="Enter react"
        />
        {errors.equalField && (
          <div>
            <p>{errors.equalField}</p>
          </div>
        )}
      </div>

      <div>
        <input
          {...getFieldProps("regexField")}
          type="text"
          placeholder="Enter only alphabets in this field"
        />
        {errors.regexField && (
          <div>
            <p>{errors.regexField}</p>
          </div>
        )}
      </div>

      <div>
        <input
          {...getFieldProps("validatorField")}
          type="text"
          placeholder='Only accepted value is: "abc"'
        />
        {errors.validatorField && (
          <div>
            <p>{errors.validatorField}</p>
          </div>
        )}
      </div>

      <div>
        <button type="submit">SUBMIT</button>
      </div>
    </form>
  );
};

export default App;
```

## License

MIT © [himanshubhardwaz](https://github.com/himanshubhardwaz)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
