export function mergPath(staticPath: string, path: string | string[]) {
  if (Array.isArray(path)) {
    return path.map((path) => `${`${staticPath}/${path}`}`);
  } else {
    return `${`${staticPath}/${path}`}`;
  }
}
