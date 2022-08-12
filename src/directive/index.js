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
