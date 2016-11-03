module.exports = {
  '/api_': {
    target: 'https://follow.center',
    changeOrigin: true
  },
  '/web_socket': {
    target: 'wss://follow.center',
    wss: true,
    changeOrigin: true
  },
  '/static/uploaded_files/': {
    target: 'https://follow.center',
    changeOrigin: true
  }
}
