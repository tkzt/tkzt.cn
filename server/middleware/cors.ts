export default defineEventHandler(async (event) => {
  // add extra cors origins
  // currently: ['fine-weather.tkzt.cn']
  event.node.res.setHeader('Access-Control-Allow-Origin', 'https://fine-weather-gallery.tkzt.cn')
  event.node.res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  event.node.res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
})
