// vue.config.js
module.exports = {
    configureWebpack: {
        module: {
            rules: [
                {
                    // make all files ending in .json5 use the `json5-loader`
                    test: /\.json5$/,
                    use: 'json5-loader',
                    type: 'javascript/auto'
                },
            ],
        },
    }
}
