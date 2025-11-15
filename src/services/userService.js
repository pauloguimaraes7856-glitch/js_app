let users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" },
    { id: 4, name: "Dave" },
]

export const getAllUsersService = () => {
    return users
}


export const getUserByIdService = (id) => {
    return users.find(u => u.id === parseInt(id))
}


export const createUserService = (userData) => {
    const newUser = {
        id: users.length + 1,
        name: userData.name
    }
    users.push(newUser)
    return newUser
}


export const updateUserService = (id, userData) => {
    const index = users.findIndex(u => u.id === parseInt(id))
    if (index === -1) return null

    users[index] = { ...users[index], ...userData }
    return users[index]
}


export const deleteUserService = (id) => {
    const index = users.findIndex(u => u.id === parseInt(id))
    if (index === -1) return false

    users.splice(index, 1)
    return true
}
