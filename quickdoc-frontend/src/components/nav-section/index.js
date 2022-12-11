// ----------------------------------------------------------------------

export { default as NavSectionVertical } from './vertical';
export { default as NavSectionHorizontal } from './horizontal';

export function isExternalLink(path) {
  return path.includes('http');
}

export function getActive(path, pathname, asPath) {
  const checkPath = path.startsWith('#');

  return (!checkPath && pathname===path) || (!checkPath && asPath===path);
}
