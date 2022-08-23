import PageTools from './pageTools'
import MyTest from '@/components/MyTest'
import UploadExcel from '@/components/UploadExcel'
import UploadImg from '@/components/UploadImg'
import Calendar from './Calendar'
import FullScreen from './FullScreen'
import ToggleLang from './ToggleLang'
import TagsView from '@/layout/components/TagsView'

const components = [
  PageTools,
  MyTest,
  UploadExcel,
  UploadImg,
  Calendar,
  FullScreen,
  ToggleLang,
  TagsView
]
export default {
  install(Vue) {
    components.forEach((component) => {
      Vue.component(component.name, component)
    })
  }
}
