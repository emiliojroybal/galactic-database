import { useContext, useEffect, useState } from "react";
import AppContext from "./AppContext";
import TypesPopup from "./TypesPopup";

export default function TypesWindowObjects() {

    
    const { databaseObject, currentTypeWindow, setSelectedElement, 
        setShowNewPopup, showNewPopup } = useContext(AppContext);

    const [objectsList, setObjectsList] = useState([]);

    const handleRightClick = (e) => {
        e.preventDefault();
        setSelectedElement(false);
        setShowNewPopup(true);
    };

    useEffect(() => {
        const getObjectsList = () => {
            if (databaseObject[currentTypeWindow]) setObjectsList(databaseObject[currentTypeWindow]);
            else setObjectsList([]);
        }

        getObjectsList();
    }, [currentTypeWindow, databaseObject])

    return (
        <div className="types-window-objects">
            {showNewPopup ? <TypesPopup setShowNewPopup={setShowNewPopup}/> : ""}
            <div className="list" onContextMenu={handleRightClick}>
                {objectsList.map((object) => {
                    return (
                        <button className="list-element" key={object.id} onClick={() => setSelectedElement(object)}>
                            {object.name}  
                        </button>
                    )})}
            </div>
        </div>
    )
}