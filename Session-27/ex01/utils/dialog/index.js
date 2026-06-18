import { headers } from "./customer.js"

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

    label.innerText = data[headers[row].text]
    label.setAttribute('class', 'form-label');

    if (headers[row].key === 'email') input.setAttribute('type', 'email')
    if (headers[row].key === 'phone') input.setAttribute('type', 'tel')
    input.setAttribute('class', 'form-input')

    if (isEdit) input.value = `${data[headers[row].key]}`
    else input.setAttribute('placeholder', 'oke')

    div.append(label);
    div.append(input);

    formGrid.append(div);
  }

  popupBody.append(formGrid)


  popupContent.append(panelHeader)

  overlay.append(popupBody)
  return overlay
}

export {
  renderDialog
}