module.exports = {
  '*.{ts,tsx}': [
    () => 'npm run tailwind:build',
    'eslint --fix', 
    'prettier --write'
  ],
}