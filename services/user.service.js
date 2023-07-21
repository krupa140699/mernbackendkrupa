exports.getUsers = async function () {

    try {
        var users = await {user: 'user data'}
        return users;
    } catch (e) {
        // Log Errors
        throw Error('Error while Paginating Users')
    }
}