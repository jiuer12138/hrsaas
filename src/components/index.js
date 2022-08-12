import pageTools from './pageTools'
import UploadExcel from './UploadExcel'
const components = [pageTools, UploadExcel]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}
