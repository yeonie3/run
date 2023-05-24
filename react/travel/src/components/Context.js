import { createContext, useContext, useState } from "react";

const Context = createContext()

export function IdContextProvider({ children }){
    const [placeId, setPlaceId] = useState(null);
    const [contentTypeId, setContentTypeId] = useState('32');
    const [placeList, setPlaceList] = useState([]);
    const [selectedCoord, setSelectedCoord] = useState({coordX : 128.601445, coordY : 35.8714354});

    return(
        <Context.Provider value = {{placeId, setPlaceId, placeList, setPlaceList, selectedCoord, setSelectedCoord, contentTypeId , setContentTypeId}}>
            {children}
        </Context.Provider>
    )
}

export function useIdContext() {
    return useContext(Context)
}

export default IdContextProvider;