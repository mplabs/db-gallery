export const getLayout = (entries) => ({
  type: 'GET_LAYOUT',
  payload: entries
})

export const layouted = (entries, layout) => ({
  type: 'LAYOUTED',
  payload: entries.map((entry, index) => 
    Object.assign(entry, { layout: layout.boxes[index] })
  )
})
