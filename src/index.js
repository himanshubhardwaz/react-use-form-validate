import { useReducer, useMemo } from 'react'
import useDeepCompareEffect from 'use-deep-compare-effect'
import * as validators from './validations/index'

function validateField(fieldValue = '', fieldConfig) {
  for (let validatorName in fieldConfig) {
    const validatorConfig = fieldConfig[validatorName]
    const validator = validators[validatorName]
    const configuredValidator = validator(validatorConfig)
    const errorMessage = configuredValidator(fieldValue)

    if (errorMessage) {
      return errorMessage
    }
  }
  return null
}

function validateFields(fieldValues, fieldConfigs) {
  const errors = {}
  for (let fieldName in fieldConfigs) {
    const fieldConfig = fieldConfigs[fieldName]
    const fieldValue = fieldValues[fieldName]

    errors[fieldName] = validateField(fieldValue, fieldConfig)
  }
  return errors
}

const initialState = {
  values: {},
  errors: {},
  blurred: {},
  submitted: false
}

function validationReducer(state, action) {
  switch (action.type) {
    case 'change':
      const values = { ...state.values, ...action.payload }
      return {
        ...state,
        values
      }
    case 'submit':
      return { ...state, submitted: true }
    case 'validate':
      return { ...state, errors: action.payload }
    case 'blur':
      const blurred = {
        ...state.blurred,
        [action.payload]: true
      }
      return { ...state, blurred }
    default:
      throw new Error('Unknown action type')
  }
}

function getErrors(state, config) {
  if (config.showErrors === 'always' || state.submitted) {
    return state.errors
  }
  if (config.showErrors === 'blur') {
    return Object.entries(state.blurred)
      .filter(([, blurred]) => blurred)
      .reduce((acc, [name]) => ({ ...acc, [name]: state.errors[name] }), {})
  }
  return state.submitted ? state.errors : {}
}

export const useValidation = config => {
  const [state, dispatch] = useReducer(validationReducer, initialState)

  useDeepCompareEffect(() => {
    const errors = validateFields(state.values, config.fields)
    dispatch({ type: 'validate', payload: errors })
  }, [state.values, config.fields])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const errors = useMemo(() => getErrors(state, config), [
    state.errors,
    state.blurred,
    state.submitted,
    config.showErrors
  ])

  const isFormValid = useMemo(
    () => Object.values(errors).every(error => error === null),
    [errors]
  )

  return {
    errors,
    submittedErrors: state.submitted ? state.errors : {},
    submitted: state.submitted,
    isFormValid,
    getFormProps: () => ({
      onSubmit: e => {
        e.preventDefault()
        const presentErrors = getErrors(state, { ...config, showErrors: 'always' })
        const isInitialFormValid = !!Object.values(presentErrors).every(error => error === null)
        dispatch({ type: 'submit' })
        if (config.onSubmit) {
          config.onSubmit({ ...state, isFormValid, isInitialFormValid })
        }
      }
    }),
    getFieldProps: fieldName => ({
      onChange: e => {
        const { value } = e.target
        if (!config.fields[fieldName]) {
          return
        }
        dispatch({
          type: 'change',
          payload: { [fieldName]: value }
        })
      },
      onBlur: () => {
        dispatch({ type: 'blur', payload: fieldName })
      },
      name: fieldName,
      value: state.values[fieldName] || ''
    })
  }
}
