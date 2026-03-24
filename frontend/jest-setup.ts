import '@testing-library/jest-dom';
import { TextDecoder, TextEncoder } from 'util';

// jsdom16 doesn't contain TextEncoder & Decoder.
// Therefore add Polyfill in Node.js environment.
Object.assign(global, { TextDecoder, TextEncoder });

// Start JSDOM setting for Radix UI components
// JSDOM does not fully implement PointerEvent and related APIs used by Radix UI.
// As a result, click on DialogTrigger doesn't work in tests without these mocks.
// https://github.com/radix-ui/primitives/issues/1220
class MockPointerEvent extends Event {
  button: number;
  ctrlKey: boolean;
  pointerType: string;

  constructor(type: string, props: PointerEventInit = {}) {
    super(type, props);
    this.button = props.button ?? 0;
    this.ctrlKey = props.ctrlKey ?? false;
    this.pointerType = props.pointerType ?? 'mouse';
  }
}

if (!window.PointerEvent) {
  window.PointerEvent = MockPointerEvent as unknown as typeof PointerEvent;
}

if (!window.ResizeObserver) {
  window.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

if (!window.HTMLElement.prototype.scrollIntoView) {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
}

if (!window.HTMLElement.prototype.releasePointerCapture) {
  window.HTMLElement.prototype.releasePointerCapture = jest.fn();
}

if (!window.HTMLElement.prototype.hasPointerCapture) {
  window.HTMLElement.prototype.hasPointerCapture = jest.fn(() => false);
}

if (!window.HTMLElement.prototype.setPointerCapture) {
  window.HTMLElement.prototype.setPointerCapture = jest.fn();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
window.PointerEvent = MockPointerEvent as any;
window.HTMLElement.prototype.scrollIntoView = jest.fn();
window.HTMLElement.prototype.releasePointerCapture = jest.fn();
window.HTMLElement.prototype.hasPointerCapture = jest.fn();
// END JSDOM setting
