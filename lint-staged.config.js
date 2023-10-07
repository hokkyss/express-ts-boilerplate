module.exports = {
  '**/*.(ts|js)?(x)': function (filenames) {
    return ['npm', 'run', 'lint', filenames.join(' ')].join(' ')
  },
}
