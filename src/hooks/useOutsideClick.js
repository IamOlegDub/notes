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
        document.addEventListener("mouseup", handleClickOutside);
        return () => {
            document.removeEventListener("mouseup", handleClickOutside);
        };
    }, [elementRef, handler]);
}
