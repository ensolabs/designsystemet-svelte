export function useDebounceCallback(callback, delay = 50) {
    let timeout = null;
    $effect(() => () => {
        if (timeout)
            clearTimeout(timeout);
    });
    return (...args) => {
        if (timeout)
            clearTimeout(timeout);
        timeout = window.setTimeout(() => {
            callback(...args);
        }, delay);
    };
}
