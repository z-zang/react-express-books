/* eslint-disable no-undef */
module.exports = () => {
    return {
        plugins: [
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            require('postcss-bem-fix')({
                style: 'suit',
                separators: {
                    descendent: '__'
                }
            })
        ],
    }
}