const { FuseBox, TypeScriptHelpers, SourceMapPlainJsPlugin, UglifyJSPlugin } = require('fuse-box')

const isDev = process.env.NODE_ENV != "production"
const isServer = process.argv.indexOf('--server') > -1
const outFile = `transitionable.${isDev ? 'js' : 'min.js'}`

const fuseBox = FuseBox.init({
    homeDir: 'src/',
    package: "transitionable",
    globals: { "transitionable": "Transitionable" },
    sourceMap: {
      bundleReference: `${outFile}.map`,
      outFile: `dist/${outFile}.map`,
    },
    outFile: `dist/${outFile}`,
    plugins: [
        TypeScriptHelpers(),
        SourceMapPlainJsPlugin(),
        isDev ? null : UglifyJSPlugin()
    ].filter(Boolean)
});

if (isServer) {
    fuseBox.devServer(">index.ts", { root: './', port: 8080 })
    
} else {
    if (isDev) {
        fuseBox.bundle(">index.ts")
    } else {
        fuseBox.bundle(">index.ts")
    }
}
