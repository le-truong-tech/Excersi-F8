import {renderTable, headers} from './utils/index.js'
import {renderDialog} from "./utils/dialog/index.js";

const getCustomers = async () => {
  try {
    const response = await fetch('http://localhost:3000/customers')
    return await response.json()
  } catch {
    alert('get data failed')
  }
}


const init = async () => {
  const customers = await getCustomers()

  const panel = document.querySelector('.panel')
  panel.append(renderTable(headers, customers))

  const btnAdd = document.querySelector('.btn-add')
  btnAdd.addEventListener('click', () => {
    const dialog = renderDialog(headers,{}, false)
    document.body.append(dialog)
  })
}

init()