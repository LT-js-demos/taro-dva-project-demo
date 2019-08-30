import { create } from 'dva-core'
import createLoading from 'dva-loading'

let app

function createApp(opt) {
  app = create(opt)
  app.use(createLoading())

  if (!global.registered) {
    opt.models.forEach(model => app.model(model))
  }

  global.registered = true
  app.start()

  const store = app._store
  app.getStore = () => store
  app.dispatch = store.dispatch

  return app
}

export default {
  createApp,
  getDispatch() {
    return app.dispatch
  }
}
