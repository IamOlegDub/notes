import { useEffect } from "react";

export function useOutsideClick(elementRef, handler) {
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                elementRef?.current &&
                !elementRef.current.contains(event.target)
            ) {
                handler();
            }
        };
        // Bind the event listener
        document.addEventListener("mouseup", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, [elementRef, handler]);
}
