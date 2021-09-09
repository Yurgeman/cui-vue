const devPresets = [ '@vue/babel-preset-app' ]

const buildPresets = [
  // [
  //   '@vue/cli-plugin-babel/preset'
  // ]
  [
    '@babel/preset-env',
    {
      // Example: Always transpile optional chaining/nullish coalescing
      // include: [
      //   (optional-chaining|nullish-coalescing)/
      // ],
    }
  ]
  // [ '@babel/plugin-proposal-decorators', { 'legacy': true } ]
]

module.exports = {
  presets: ( process.env.NODE_ENV === 'development' ? devPresets : buildPresets ),
  plugins: [
    // [ '@babel/plugin-proposal-decorators', { 'legacy': true } ],
    // [ '@babel/plugin-proposal-class-properties', { 'loose': true } ]
  ]
}
