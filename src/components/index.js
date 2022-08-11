import pageTools from './pageTools'
const components = [pageTools]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}
