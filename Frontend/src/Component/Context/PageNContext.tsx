import { createContext } from "react";

export const pageContext = createContext({
    currentPage: '',
    setCurrentPage:(page:string) =>{},
});