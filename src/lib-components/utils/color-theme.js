export const Theme = {
  'color-primary-100':             '#f3f5f7',
  'color-primary-200':             '#e8ecef',
  'color-primary-300':             '#c6cbcf',
  'color-primary-400':             '#979ba0',
  'color-primary-500':             '#5a5d61',
  'color-primary-600':             '#414853',
  'color-primary-700':             '#2d3545',
  'color-primary-800':             '#1c2438',
  'color-primary-900':             '#11182e',
  'color-primary-transparent-100': 'rgba(90, 93, 97, 0.08)',
  'color-primary-transparent-200': 'rgba(90, 93, 97, 0.16)',
  'color-primary-transparent-300': 'rgba(90, 93, 97, 0.24)',
  'color-primary-transparent-400': 'rgba(90, 93, 97, 0.32)',
  'color-primary-transparent-500': 'rgba(90, 93, 97, 0.4)',
  'color-primary-transparent-600': 'rgba(90, 93, 97, 0.48)',
  'color-success-100':             '#dbfbd6',
  'color-success-200':             '#b2f8ae',
  'color-success-300':             '#81ea86',
  'color-success-400':             '#5ed56e',
  'color-success-500':             '#30ba50',
  'color-success-600':             '#239f4c',
  'color-success-700':             '#188546',
  'color-success-800':             '#0f6b3f',
  'color-success-900':             '#09593a',
  'color-success-transparent-100': 'rgba(48, 186, 80, 0.08)',
  'color-success-transparent-200': 'rgba(48, 186, 80, 0.16)',
  'color-success-transparent-300': 'rgba(48, 186, 80, 0.24)',
  'color-success-transparent-400': 'rgba(48, 186, 80, 0.32)',
  'color-success-transparent-500': 'rgba(48, 186, 80, 0.4)',
  'color-success-transparent-600': 'rgba(48, 186, 80, 0.48)',
  'color-info-100':                '#d9eafe',
  'color-info-200':                '#b3d3fe',
  'color-info-300':                '#8cbafe',
  'color-info-400':                '#70a3fd',
  'color-info-500':                '#417ffc',
  'color-info-600':                '#2f61d8',
  'color-info-700':                '#2047b5',
  'color-info-800':                '#143192',
  'color-info-900':                '#0c2178',
  'color-info-transparent-100':    'rgba(65, 127, 252, 0.08)',
  'color-info-transparent-200':    'rgba(65, 127, 252, 0.16)',
  'color-info-transparent-300':    'rgba(65, 127, 252, 0.24)',
  'color-info-transparent-400':    'rgba(65, 127, 252, 0.32)',
  'color-info-transparent-500':    'rgba(65, 127, 252, 0.4)',
  'color-info-transparent-600':    'rgba(65, 127, 252, 0.48)',
  'color-warning-100':             '#fef7cf',
  'color-warning-200':             '#fdee9f',
  'color-warning-300':             '#fbe16f',
  'color-warning-400':             '#f8d44b',
  'color-warning-500':             '#f4bf12',
  'color-warning-600':             '#d19e0d',
  'color-warning-700':             '#af8009',
  'color-warning-800':             '#8d6305',
  'color-warning-900':             '#754f03',
  'color-warning-transparent-100': 'rgba(244, 191, 18, 0.08)',
  'color-warning-transparent-200': 'rgba(244, 191, 18, 0.16)',
  'color-warning-transparent-300': 'rgba(244, 191, 18, 0.24)',
  'color-warning-transparent-400': 'rgba(244, 191, 18, 0.32)',
  'color-warning-transparent-500': 'rgba(244, 191, 18, 0.4)',
  'color-warning-transparent-600': 'rgba(244, 191, 18, 0.48)',
  'color-danger-100':              '#ffe4d7',
  'color-danger-200':              '#ffc2b0',
  'color-danger-300':              '#ff9988',
  'color-danger-400':              '#ff736b',
  'color-danger-500':              '#ff3a41',
  'color-danger-600':              '#db2a40',
  'color-danger-700':              '#b71d3e',
  'color-danger-800':              '#931239',
  'color-danger-900':              '#7a0b36',
  'color-danger-transparent-100':  'rgba(255, 58, 65, 0.08)',
  'color-danger-transparent-200':  'rgba(255, 58, 65, 0.16)',
  'color-danger-transparent-300':  'rgba(255, 58, 65, 0.24)',
  'color-danger-transparent-400':  'rgba(255, 58, 65, 0.32)',
  'color-danger-transparent-500':  'rgba(255, 58, 65, 0.4)',
  'color-danger-transparent-600':  'rgba(255, 58, 65, 0.48)'
}

export const SetCssVar = (obj, prefix = '--cui') => {
  let vars = (obj) ? obj : Theme
  for (let prop in vars) {
    //eslint-disable-next-line no-prototype-builtins
    if (vars.hasOwnProperty(prop)) {
      document.documentElement.style.setProperty(`${prefix}-${prop}`, vars[prop])
    }
  }

  return vars
}

export const hexToRgb = hex =>
  hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
    ,(m, r, g, b) => '#' + r + r + g + g + b + b)
     .substring(1).match(/.{2}/g)
     .map(x => parseInt(x, 16))
