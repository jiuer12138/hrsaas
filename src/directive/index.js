export const imgError = {
  inserted: (el, binding) => {
    el.onerror = () => {
      el.src = binding.value
    }
  }
}
