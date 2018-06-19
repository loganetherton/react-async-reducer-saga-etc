// Explanation of why to use import rather than require
// @link https://github.com/webpack/webpack/issues/1973#issuecomment-185744317
const routeImports = {
  app: () => [
    import('Containers/App/reducer'),
    import('Containers/App/sagas'),
    import('Containers/App'),
  ]
};

export default routeImports;
