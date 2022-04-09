# react-use-form-validate

> Super customizable validation library for forms in react

[![NPM](https://img.shields.io/npm/v/react-use-form-validate.svg)](https://www.npmjs.com/package/react-use-form-validate) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-use-form-validate
```

## Usage

```jsx
import { useValidation } from "react-use-form-validate"

const App = () => {
  let config = {
    fields: {
      email: {
        isRequired: { message: 'Email is Required' },
        isEmail: { message: 'Please enter a valid Email address' }
      },
      password: {
        isRequired: { message: 'Password is Required' }
      },
      maxField: {
        max: {
          message: 'Max size exceeded',
          length: 5
        }
      },
      minField: {
        min: {
          message: 'Min size not fulfilled',
          length: 5
        }
      },
      equalField: {
        equals: {
          message: 'Does not match expected value',
          value: 'React'
        }
      },
      regexField: {
        pattern: {
          message: 'You can only enter alphabets in this field',
          regex: /^[A-Za-z]+$/
        }
      }
    },
    onSubmit: context => {
      if (context.isFormValid) {
        console.log('Form is valid and ready to be submitted')
      } else {
        console.log('Form is valid and ready to be submitted')
      }
    },
    // showError: `${formSubmitted ? 'always' : 'blur'}`
    showErrors: 'blur'
  }

  const { getFieldProps, getFormProps, errors } = useValidation(config)

  return (
    <form {...getFormProps()}>
      <input
        {...getFieldProps('email')}
        type='text'
        placeholder='Email'
      />
      {
        errors.email &&
        <div>
          <p>
            {/* {errors.email ? errors.email : submittedErrors.email} */}
            {errors.email}
          </p>
        </div>
      }

      <div>
        <input
          {...getFieldProps('password')}
          type='password'
          placeholder='Password'
        />
        {
          errors.password &&
          <div>
            <p>
              {errors.password}
            </p>
          </div>
        }
      </div>

      <div>
        <input
          {...getFieldProps('maxField')}
          type='text'
          placeholder='Max 5 char'
        />
        {
          errors.maxField &&
          <div>
            <p>
              {errors.maxField}
            </p>
          </div>
        }
      </div>

      <div>
        <input
          {...getFieldProps('minField')}
          type='text'
          placeholder='min 5 char'
        />
        {
          errors.minField &&
          <div>
            <p>
              {errors.minField}
            </p>
          </div>
        }
      </div>

      <div>
        <input
          {...getFieldProps('equalField')}
          type='text'
          placeholder='Enter react'
        />
        {
          errors.equalField &&
          <div>
            <p>
              {errors.equalField}
            </p>
          </div>
        }
      </div>

      <div>
        <input
          {...getFieldProps('regexField')}
          type='text'
          placeholder='Enter only alphabets in this field'
        />
        {
          errors.regexField &&
          <div>
            <p>
              {errors.regexField}
            </p>
          </div>
        }
      </div>

      <div>
        <button
          type='submit'
        >
          SUBMIT
        </button>
      </div>

    </form >
  )
}
```

## License

MIT © [himanshu76200](https://github.com/himanshu76200)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
