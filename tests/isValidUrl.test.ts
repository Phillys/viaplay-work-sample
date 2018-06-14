import viaplayApi from '../src/external/viaplayApi';

test('valid url', () => {
  expect(viaplayApi.isValidUrl('https://content.viaplay.se/pc-se/film/arrival-2016')).toBe(true);
});

test('invalid protocol', () => {
  expect(viaplayApi.isValidUrl('http://content.viaplay.se/pc-se/film/arrival-2016')).toBe(false);
});

test('invalid hostname', () => {
  expect(viaplayApi.isValidUrl('https://content.play.se/pc-se/film/arrival-2016')).toBe(false);
});

test('invalid base path', () => {
  expect(viaplayApi.isValidUrl('https://content.viaplay.se/pc-se/barn/arrival-2016')).toBe(false);
});

test('invalid path, missing movie resource', () => {
  expect(viaplayApi.isValidUrl('https://content.viaplay.se/pc-se/film/')).toBe(false);
});