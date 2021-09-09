/**
 * Random Token generator
 * @returns {string}
 */
export const getToken = () => Math.random().toString(36).substr(2)

export const PhoneNumber = (number) => {
  if (isEmptyString(number)) return null
}

// https://habr.com/ru/post/565726/

/**
 * Является ли строка пустой?
 * @param str
 * @returns {boolean}
 */
export const isEmptyString = (str) => !str.trim().length

/**
 * Является ли объект пустым?
 * @param obj
 * @returns {boolean}
 */
export const objectEmpty = (obj) => {
  let arr = []
  for (let key in obj) {
    arr.push(!obj[key])
  }
  return !arr.includes(false)
}

/**
 * Является ли значение числом (целым или с плавающей точкой/запятой)?
 * @param num
 * @returns {function(*, *=): boolean}
 */
export const isNumeric = (num) => {
  const numeric = (delimiter = '.') => new RegExp(`^[+-]?([0-9]*\\${delimiter})?[0-9]+$`)
  return (str, delimiter) => numeric(delimiter).test(num)
}

/**
 * Является ли значение номером сотового телефона?
 * @param num
 * @returns {boolean}
 */
export const isMobilePhone = (num) => {
  const mobilePhoneRegexp = /^(\+?7|8)?9\d{9}$/
  const removeNonDigits   = (str) => str.replace(/\D+/g, '')
  return mobilePhoneRegexp.test(removeNonDigits(num))
}

/**
 * Форматирование номера телефона
 * @param number
 * @returns {string|*}
 */
export const phoneFormat = (number) => {
  if (!isMobilePhone) return number
  let cleaned = ('' + number).replace(/\D/g, '')
  let match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/)
  return (match)
    ? `+${match[1]} (${match[2]}) ${match[3]}-${match[4]}-${match[5]}`
    : number
}

/**
 * клонирование объетов
 * @param obj
 * @param hash
 * @returns {any|Set<T>}
 */
export const clone = (obj, hash = new WeakMap()) => {

  if (Object(obj) !== obj) return obj
  if (obj instanceof Set) return new Set(obj)
  if (hash.has(obj)) return hash.get(obj)

  const result = obj instanceof Date ? new Date(obj)
    : obj instanceof RegExp ? new RegExp(obj.source, obj.flags)
      : obj.constructor ? new obj.constructor()
        : Object.create(null)

  hash.set(obj, result)

  if (obj instanceof Map)
    Array.from(obj, ([key, val]) => result.set(key, clone(val, hash)))

  return Object
    .assign(result, ...Object.keys(obj)
                             .map(key => ({[key]: clone(obj[key], hash)})))
}

/**
 * number Format
 * @param num
 * @param currency
 * @returns {string}
 */
export const numberFormat = (num, currency = true) => {
  if (!num) return ''
  const options = (currency)
    ? {
      style:                 'currency',
      currency:              'RUB',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }
    : {
      style:                 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }

  return new Intl.NumberFormat('ru-RU', options).format(num)
}
