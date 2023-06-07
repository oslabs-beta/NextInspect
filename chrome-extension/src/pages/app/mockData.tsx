export interface IMockData{
  name: string;
  url: string;
  method: string;
  status: number;
  protocol: string;
  type: string;
  initiator: string;
  size: string;
  time: string;
}
export const mockData: IMockData[] = [
  {name: 'app', url: 'https://nextjs.org/docs/app', method: 'GET', status: 304, protocol: 'h2', type: 'fetch', initiator: '4046-323cd9a11e3ddab7.js:1', size: '45 B', time: '64 ms'},
  {name: 'another-one', url: 'https://nextjs.org/docs/another-one', method: 'POST', status: 200, protocol: 'h2', type: 'fetch', initiator: '4046-323cd9a.js:1', size: '68 B', time: '65 ms'},
  {name: 'yet-another-one', url: 'https://nextjs.org/docs/yet-another-one', method: 'GET', status: 304, protocol: 'h2', type: 'fetch', initiator: '4046.js:1', size: '88 B', time: '66 ms'},
  {name: 'app', url: 'https://nextjs.org/docs/app', method: 'GET', status: 304, protocol: 'h2', type: 'fetch', initiator: '4046-323cd9a11e3ddab7.js:1', size: '45 B', time: '64 ms'},
  {name: 'another-one', url: 'https://nextjs.org/docs/another-one', method: 'POST', status: 200, protocol: 'h2', type: 'fetch', initiator: '4046-323cd9a.js:1', size: '68 B', time: '65 ms'},
  {name: 'yet-another-one', url: 'https://nextjs.org/docs/yet-another-one', method: 'GET', status: 304, protocol: 'h2', type: 'fetch', initiator: '4046.js:1', size: '88 B', time: '66 ms'},
  {name: 'app', url: 'https://nextjs.org/docs/app', method: 'GET', status: 304, protocol: 'h2', type: 'fetch', initiator: '4046-323cd9a11e3ddab7.js:1', size: '45 B', time: '64 ms'},
  {name: 'another-one', url: 'https://nextjs.org/docs/another-one', method: 'POST', status: 200, protocol: 'h2', type: 'fetch', initiator: '4046-323cd9a.js:1', size: '68 B', time: '65 ms'},
  {name: 'yet-another-one', url: 'https://nextjs.org/docs/yet-another-one', method: 'GET', status: 304, protocol: 'h2', type: 'fetch', initiator: '4046.js:1', size: '88 B', time: '66 ms'},
  {name: 'app', url: 'https://nextjs.org/docs/app', method: 'GET', status: 304, protocol: 'h2', type: 'fetch', initiator: '4046-323cd9a11e3ddab7.js:1', size: '45 B', time: '64 ms'},
  {name: 'another-one', url: 'https://nextjs.org/docs/another-one', method: 'POST', status: 200, protocol: 'h2', type: 'fetch', initiator: '4046-323cd9a.js:1', size: '68 B', time: '65 ms'},
  {name: 'yet-another-one', url: 'https://nextjs.org/docs/yet-another-one', method: 'GET', status: 304, protocol: 'h2', type: 'fetch', initiator: '4046.js:1', size: '88 B', time: '66 ms'}
]

