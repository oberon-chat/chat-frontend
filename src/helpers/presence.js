export const metas = (item) => (item.metas || [])[0] || {}
export const meta = (item, key) => metas(item)[key]
