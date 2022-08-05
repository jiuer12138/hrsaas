export const transListToTree = (list, pid) => {
  const arr = []
  list.forEach((item) => {
    if (item.pid === pid) {
      const children = transListToTree(list, item.id)
      if (children.length) item.children = children
      arr.push(item)
    }
  })
  return arr
}
