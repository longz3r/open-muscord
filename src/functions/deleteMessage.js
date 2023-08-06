async function deleteMessage(message) {
    try {
        message.delete()
    } catch (err) {
        console.err(err)
    }
}

module.exports = deleteMessage