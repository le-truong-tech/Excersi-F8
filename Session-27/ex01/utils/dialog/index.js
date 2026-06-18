import { headers } from "../const/customer.js"

const renderDialog = (headers, data, isEdit) => {
  /*
  * data: {
  *   id: number,
  *   name: string ...
  * }
  *
  * isEdit: bool
  * */

  const overlay = document.createElement('div')
  overlay.setAttribute('class', 'popup-overlay')

  const label = document.createElement('label')
  label.classList = 'popup-backdrop'
  label.setAttribute('for', 'popup-toggle')

  const popupContent = document.createElement('div')
  popupContent.setAttribute('class', 'panel popup-content')

  const panelHeader = document.createElement('div')
  panelHeader.setAttribute('class', 'panel-header')
  panelHeader.setAttribute('style', 'border-bottom: none; padding-bottom: 0;')

  const panelTitle = document.createElement('h2')
  panelTitle.innerText = 'Customer details'
  panelHeader.append(panelTitle)

  const popupBody = document.createElement('div')
  popupBody.setAttribute('class', 'popup-body')

  const formGrid = document.createElement('div')
  formGrid.setAttribute('class', 'form-grid')
  for (let row = 1; row <= headers.length - 2; row++) {
    const div = document.createElement('div')
    div.setAttribute('class', 'form-group full-width');

    const  label = document.createElement('label')
    const input = document.createElement('input')

    label.innerText = headers[row].text
    label.setAttribute('class', 'form-label');
    if (headers[row].key === 'email') input.setAttribute('type', 'email')
    if (headers[row].key === 'phone') input.setAttribute('type', 'tel')
    input.setAttribute('class', 'form-input')

    if (isEdit) input.value = `${data[headers[row].key]}`
    else {
      if (headers[row].key === 'companyName') input.setAttribute('placeholder', 'tên công ty')
      else if(headers[row].key === 'email') input.setAttribute('placeholder', 'abcx@example.com')
      else if(headers[row].key === 'phone') input.setAttribute('placeholder', '0912254856')
      else if(headers[row].key === 'address') input.setAttribute('placeholder', 'Que Son Trung, Da Nang')
      else if(headers[row].key === 'taxId') input.setAttribute('placeholder', '018381123413')
    }

    div.append(label);
    div.append(input);

    formGrid.append(div);
  }

  popupBody.append(formGrid)

  const popupFooter = document.createElement('div');
  popupFooter.setAttribute('class', 'popup-footer')
  const labelCancel = document.createElement('label');
  const btnSave = document.createElement('button');

  labelCancel.setAttribute('for', 'popup-toggle')
  labelCancel.setAttribute('class', 'btn btn-cancel')
  labelCancel.innerText = 'Cancel'
  btnSave.setAttribute('type', 'button')
  btnSave.setAttribute('class', 'btn btn-save')
  btnSave.innerText = 'Save'

  labelCancel.addEventListener('click', () => {
    overlay.remove()
  })
  btnSave.addEventListener('click', () => {
    overlay.remove()
  })

  popupFooter.append(labelCancel)
  popupFooter.append(btnSave)

  popupContent.append(panelHeader)
  popupContent.append(popupBody)
  popupContent.append(popupFooter)

  overlay.append(label)
  overlay.append(popupContent)

  return overlay
}

export {
  renderDialog
}