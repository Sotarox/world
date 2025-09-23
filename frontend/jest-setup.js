import '@testing-library/jest-dom';
// jsdom16 doesn't contain TextEncoder & Decoder.
// Therefore add Polyfill in Node.js environment.
import { TextEncoder, TextDecoder } from 'util';
Object.assign(global, { TextDecoder, TextEncoder });