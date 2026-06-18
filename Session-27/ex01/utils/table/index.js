import {renderDialog} from "../dialog/index.js";
import {headers} from "../const/customer.js";
const API_URL = 'http://localhost:3000/customers'
const getTable = async () => {
  try {
    const response = await fetch(API_URL)
    return await response.json()
  } catch {
    alert('get data failed')
  }
}
const deleteRow = async (id) => {
  console.log(id, '1');
  try {
    await fetch(API_URL+`/${id}`, {
      method : 'DELETE'
    })
    return true;
  } catch {
    return false;
  }
}
const editRow = async (id, data) => {
  try {
    await fetch(API_URL+`/${id}`,{
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    return true
  } catch {
    return false
  }
}
const addRow = async (data) => {
  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    return true
  } catch {
    return false
  }
}
const reloadTable = async () => {
  const table = await getTable()
  const panel = document.querySelector('.panel')
  document.querySelector('.table-container').remove()
  const tableContainer = document.createElement('div')
  tableContainer.setAttribute('class', 'table-container')
  tableContainer.append(renderTable(headers, table))
  panel.append(tableContainer)
}
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

    const deleteRowEl = action.querySelector('.delete')
    deleteRowEl.addEventListener('click', async () => {
      if(confirm('Do you can delete')) {
        const res = await deleteRow(row.id);
        if (res) {
          alert('Delete success')
          await reloadTable()
        }
        else  alert('Delete fail')
      }
    })
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
  renderTable, getTable, deleteRow, editRow, reloadTable, addRow
}