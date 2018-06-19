// Explanation of why to use import rather than require
// @link https://github.com/webpack/webpack/issues/1973#issuecomment-185744317
const routeImports = {
  app: () => [
    import('containers/App/reducer'),
    import('containers/App/sagas'),
    import('containers/App'),
  ],
  login: () => [
    import('containers/Login/reducer'),
    import('containers/Login/sagas'),
    import('containers/Login'),
  ]
};

export default routeImports;
