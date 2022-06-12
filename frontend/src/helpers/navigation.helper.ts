type Path = string | {
  path: string,
  routes: Record<string, Path>
}

export const combinePaths = (...paths: Path[]) => {
  return paths.map(p => typeof p === 'object' ? p.path : p).join('/')
}

const getNavPaths = <T extends Record<string, Path>>(paths : T) => paths as T

export const NAV_PATHS = getNavPaths({
  root: '/',
  home: 'home',
  recipe: {
    path: 'recipe',
    routes: {
      id: ':id'
    }
  }
})
