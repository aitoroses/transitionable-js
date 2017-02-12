const { FuseBox, TypeScriptHelpers, UglifyJSPlugin } = require('fuse-box')

const isDev = process.env.NODE_ENV != "production"

const fuseBox = FuseBox.init({
    homeDir: 'src/',
    globals: { default: "Transitionable" },
    outFile: `./dist/transitionable.${isDev ? 'js' : 'min.js'}`,
    plugins: [
        // TypeScriptHelpers(),
        isDev ? null : UglifyJSPlugin()
    ].filter(Boolean)
});

if (isDev) {
    fuseBox.devServer(">index.ts [src/**/*.ts]", { root: './', port: 8080 })

} else {

    fuseBox.bundle(">index.ts [src/**/*.ts]")
}
