require('dotenv').config({ path: './env' })
console.log({ gdrive_client_email: process.env.GDRIVE_CLIENT_EMAIL })
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    ['module-resolver', {
      alias: {
        '@controllers': './src/controllers',
        '@models': './src/models',
        '@messages': './src/messages',
        '@service': './src/service',
      }
    }],
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: false }]
  ],
  ignore: [
    '**/*.spec.ts'
  ]
}
