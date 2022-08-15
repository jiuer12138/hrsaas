import pageTools from './pageTools'
import UploadExcel from './UploadExcel'
import UploadImage from './UploadImage'
const components = [pageTools, UploadExcel, UploadImage]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}
