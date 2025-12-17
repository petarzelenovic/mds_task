export function debounceFn(fn, wait) {
  let timeoutId;

  return function debounced(...args) {
    const context = this;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}
