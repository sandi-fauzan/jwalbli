module.exports = {
    publicPath: process.env.NODE_ENV === "production" ? "": "/",
    chainWebpack: config => config.resolve.symlinks(false)
      
}

// module.exports = {
//     publicPath: "",
// }

