import React from 'react'
import { useValidation } from 'use-react-form-validate'

const App = () => {
  let config = {
    fields: {
      email: {
        isRequired: { message: 'Email is Required' },
        isEmail: { message: 'Please enter a valid Email address' }
      },
      password: {
        isRequired: { message: 'Password is Required' }
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
        <button
          type='submit'
        >
          SUBMIT
        </button>
      </div>

    </form >
  )
}

export default App
