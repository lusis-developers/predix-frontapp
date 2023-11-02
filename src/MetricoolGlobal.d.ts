export { };

interface BeTracker {
  t(options: { hash: string }): void;
}


declare global {
  interface Window {
    beTracker: BeTracker;
  }
}