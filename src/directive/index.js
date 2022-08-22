import store from '@/store'

export const imgError = {
  inserted: (el, binding) => {
    if (!el.src) {
      return (el.src = binding.value)
    }
    el.onerror = () => {
      el.src = binding.value
    }
  },
  update: (el, binding) => {
    if (!el.src) {
      return (el.src = binding.value)
    }
  }
}

export const isHas = {
  inserted: (el, binding) => {
    const has = store.state.permission.points.includes(binding.value)

    if (!has) {
      el.remove()
    }
  }
}
