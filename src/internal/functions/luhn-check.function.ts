/**
 * Luhn algorithm for checking the validity of a credit card number
 * Code taken from https://stackoverflow.com/a/23222562
 *
 * @param val the normalized credit card number (only digits, no spaces or dashes)
 */
const luhnCheck = (val: string) => {
  let sum = 0
  for (let i = 0; i < val.length; i++) {
    let intVal = parseInt(val[i]!)
    if (isNaN(intVal)) {
      return false
    }

    if (i % 2 == 0) {
      intVal *= 2

      if (intVal > 9) {
        intVal = 1 + (intVal % 10)
      }
    }

    sum += intVal
  }

  return sum % 10 === 0
}

export default luhnCheck
