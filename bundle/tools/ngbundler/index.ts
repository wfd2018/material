import { rollup, RollupFileOptions, OutputOptions } from 'rollup';
const resolve = require('rollup-plugin-node-resolve');
const sourcemaps = require('rollup-plugin-sourcemaps');

const globals = {
  '@angular/common': 'ng.common',
  '@angular/core': 'ng.core',
  '@angular/forms': 'ng.forms',
  '@angular/router': 'ng.router',
  '@material/animation': 'mdc.animation',
  '@material/checkbox': 'mdc.checkbox',
  '@material/drawer': 'mdc.drawer',
  '@material/drawer/slidable': 'mdc.drawer',
  '@material/form-field': 'mdc.formField',
  '@material/icon-toggle': 'mdc.iconToggle',
  '@material/linear-progress': 'mdc.linearProgress',
  '@material/menu': 'mdc.menu',    
  '@material/radio': 'mdc.radio',
  '@material/ripple': 'mdc.ripple',
  '@material/select': 'mdc.select',
  '@material/slider': 'mdc.slider',
  '@material/switch': 'mdc.switch',
  '@material/snackbar': 'mdc.snackbar',
  '@material/textfield': 'mdc.textfield',  // checked, not exported as mdc.textField yet
  '@material/textfield/bottom-line': 'mdc.textfield',
  '@material/textfield/helper-text': 'mdc.textfield',
  '@material/textfield/icon': 'mdc.textfield',
  '@material/textfield/label': 'mdc.textfield',
  '@material/toolbar': 'mdc.toolbar',
  '@material/tabs': 'mdc.tabs',
  'rxjs/Observable': 'Rx',
  'rxjs/Subject': 'Rx',
  'rxjs/Subscription': 'Rx',    
  'rxjs/operators/filter': 'Rx',
  'rxjs/operators/take': 'Rx',
  'rxjs/operators/takeUntil': 'Rx',
  'tslib': 'tslib'
};

const inputOptions: RollupFileOptions = {
    input: 'build/material.js',
    plugins: [
        resolve({jail: '/src', modulesOnly: true}),
        sourcemaps()        
    ],
    onwarn: function(warning) {
        // Suppress known error message caused by TypeScript compiled code with Rollup
        // https://github.com/rollup/rollup/wiki/Troubleshooting#this-is-undefined
        if (typeof warning === 'string')
            console.log("Rollup warning: ", warning)
        else if (warning.code !== 'THIS_IS_UNDEFINED' && warning.code !== 'UNUSED_EXTERNAL_IMPORT')
            console.log("Rollup warning [", warning.code, "]: ", warning.message);
    },
    external: Object.keys(globals)
};
const outputOptionsEs5: OutputOptions = {
    file: 'dist/material.es5.js',
    format: 'es',
    sourcemap: true,
    globals: globals
};
const outputOptionsUmd: OutputOptions = {
    file: 'dist/material.umd.js',
    format: 'umd',
    sourcemap: true,
    globals: globals,
    name: 'blox.material'
};

async function build(writeOptions: OutputOptions) {
  const bundle = await rollup(inputOptions);
  await bundle.write(writeOptions);
}

build(outputOptionsEs5);
build(outputOptionsUmd);

