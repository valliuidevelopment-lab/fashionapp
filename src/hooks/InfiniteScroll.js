import React, {useRef, useCallback} from "react";

function InfiniteScroll(callback, options = {}) {

    const observer = useRef();

    const lastRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        callback();
      }
    }, options);
    if (node) observer.current.observe(node);
  }, [callback, options]);

    return lastRef;
}

export default InfiniteScroll;
