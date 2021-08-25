const path = require('path');
const fs = require('fs');


const rawPlugin = () => {
  return {
    name: 'raw',
    setup(build) {
      build.onResolve({ filter: /^raw:/ }, (args) => {
        const realPath = args.path.replace(/^raw:/, '');

        return {
          path: path.resolve(args.resolveDir, realPath),
          namespace: '_raw',
        };
      });

      build.onLoad({ filter: /.*/, namespace: '_raw' }, async (args) => {
        const contents = await fs.promises.readFile(args.path);
        return {
          contents: contents.toString(),
          loader: 'text',
        };
      });
    },
  };
};

module.exports = rawPlugin;