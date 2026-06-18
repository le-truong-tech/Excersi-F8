import {renderTable, headers, getTable} from './utils/index.js'
import {renderDialog} from "./utils/dialog/index.js";




const init = async () => {
  const customers = await getTable()

  const panel = document.querySelector('.panel')
  panel.append(renderTable(headers, customers, 'table-container'))

  const btnAdd = document.querySelector('.btn-add')
  btnAdd.addEventListener('click', () => {
    const dialog = renderDialog(headers,{}, false)
    document.body.append(dialog)
  })
}

init()