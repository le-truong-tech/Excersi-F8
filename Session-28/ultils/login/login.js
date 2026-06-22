const API_URL = 'https://dummyjson.com/auth'
const onLogin = async () => {
    console.log('da vao')
    const usernameEl = document.querySelector('input[name=username]').value
    const passwordEl = document.querySelector('input[name=password]').value
    console.log(API_URL+'/login')
    if (!usernameEl || !passwordEl) confirm('Please enter all the necessary information')
    else {
        try {
            const res = await fetch(API_URL+'/login', {
                method : 'POST',
                headers: {'Content-Type': 'application/json'},
                body : JSON.stringify({
                    username: usernameEl,
                    password: passwordEl
                })
            })
            const data = await res.json()
            const {accessToken, refreshToken} = data
            localStorage.setItem('accessToken', accessToken)
            localStorage.setItem('refreshToken', refreshToken)
            window.location.href = '../index.html'
        }
        catch {
            confirm('Error data')
        }
    }
}
const getAccessToken = async () => {
    try {
        console.log('vao get tokent')
        const res = await fetch(API_URL+'/refresh',{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                refreshToken: localStorage.getItem('refreshToken')
            })
        })
        const data = await res.json()
        if (data.message === 'Refresh token required') window.location.href='./login/index.html'
        else {
            localStorage.setItem('accessToken', data.accessToken)
            return await getUser()
        }

    }
    catch {
        confirm('Error data')
    }
}
const getUser = async () => {
    try {
        console.log('vao get user')
        const res = await fetch(API_URL+'/me', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+ localStorage.getItem('accessToken')
            }
        })
        const data = await res.json()
        if (data.message === 'Token Expired!' || data.message ==='Invalid/Expired Token!') return await getAccessToken()
        else return data
    }
    catch {
        confirm('Error data')
    }
}
export {
    onLogin, getUser, getAccessToken
}