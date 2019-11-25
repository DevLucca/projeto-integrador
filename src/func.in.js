class func {
    constructor (){
    }
    async tryAwait( untilGetResult, callback ) {
        try {
            const data = await untilGetResult
            console.log(data)
            return callback( data )
        } catch ( error ) {
            return callback ( error )
        }

    }
}
module.exports = func