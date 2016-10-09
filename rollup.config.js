const out = "main";
export default {
  entry: `src/${out}.js`,
  targets: [
    { dest: `dist/${out}.cjs.js`, format: `cjs` },
    { dest: `dist/${out}.iife.js`, format: `iife` }
  ],
  external:[
    '@fae/ecs',
    'mini-signals'
  ]
};