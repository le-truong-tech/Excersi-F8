import {renderDialog} from "../dialog/index.js";

const renderTable = (headers, rows, className = null) => {
  const div = document.createElement('div')

  if (className) div.classList = className

  const table = document.createElement('table')
  const thead = document.createElement('thead')
  const tbody = document.createElement('tbody')

  const headerRow = document.createElement('tr')

  for (const header of headers) {
    const th = document.createElement('th')
    th.innerText = header.text
    headerRow.append(th)
  }
  const actionC = document.createElement('th')
  actionC.innerText = 'Action'
  headerRow.append(actionC)
  thead.append(headerRow)

  for (const row of rows) {
    const tr = document.createElement('tr')

    for (const header of headers) {
      const td = document.createElement('td')
      td.innerText = row[header.key]
      tr.append(td)
    }

    const action = document.createElement('td')
    action.innerHTML = `
      <label for="popup-toggle" class="action-icon edit" title="Edit">✎</label>
      <span class="action-icon delete" title="Delete">🗑</span>
    `
    const popup = action.querySelector('.edit')
    popup.addEventListener('click', () => {
      const dialog = renderDialog(headers, row, true)
      document.body.append(dialog)
    });
    action.classList = 'actions'

    tr.append(action)

    tbody.append(tr)
  }

  table.append(thead)
  table.append(tbody)
  div.append(table)

  return div
}

export {
  renderTable
}