const renderProfile = (data) => {
    const mainEl = document.createElement('div');
    mainEl.setAttribute('class', 'main')

    const headerEl = document.createElement('div')
    headerEl.setAttribute('class', 'header')
    const h1 = document.createElement('h1')
    h1.innerText = `${data.firstName} ${data.lastName}`
    const userRoleEl = document.createElement('span')
    userRoleEl.setAttribute('class', 'userRole')
    userRoleEl.innerText = `${data.role}`
    headerEl.append(h1)
    headerEl.append(userRoleEl)
    mainEl.append(headerEl)

    const keys = ['gender', 'phone', 'country']
    for (const key of keys) {
        const divEl = document.createElement('div')
        const labelEl = document.createElement('label')
        const spanEl = document.createElement('span')
        labelEl.innerText = `${key}: `
        spanEl.innerText = `${data[key]}`
        divEl.append(labelEl)
        divEl.append(spanEl)
        mainEl.append(divEl)
    }

    const buttonEl = document.createElement('button')
    buttonEl.innerText = 'Sign out'
    mainEl.append(buttonEl)

    return mainEl
}
export {
    renderProfile
}