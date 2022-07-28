function mapToResponse(user) {
    if (user === undefined || user === null) return {}
    const userResponse = { 
        _id: user._id,
        name: user.name,
        email: user.email,
        age: user.age
    }
    return userResponse
}

module.exports = {
    mapToResponse
}