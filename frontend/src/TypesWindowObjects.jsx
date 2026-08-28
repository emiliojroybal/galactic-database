import { useContext, useEffect, useState } from "react";
import AppContext from "./AppContext";
import TypesPopup from "./TypesPopup";

export default function TypesWindowObjects() {

    
    const { databaseObject, currentTypeWindow, loading, 
        databaseChanges, setDatabaseChanges, databaseAdditions, databaseDeletions, setSelectedElement, 
        setShowNewPopup, showNewPopup } = useContext(AppContext);

    const [objectsList, setObjectsList] = useState([]);

    const handleRightClick = (e) => {
        e.preventDefault();
        setSelectedElement(false);
        setShowNewPopup(true);
    };

    useEffect(() => {
        const getObjectsList = () => {
            let newObjectsList = [];
            if (currentTypeWindow) {
                if (databaseObject[currentTypeWindow]) newObjectsList = [...databaseObject[currentTypeWindow]];
                databaseAdditions.forEach(addition => {
                    if (addition.key == currentTypeWindow) {
                        newObjectsList.push(addition);
                    }
                });
                if (newObjectsList) newObjectsList = newObjectsList.sort((a,b) => a.name.localeCompare(b.name));
                console.log(newObjectsList);
            };
            setObjectsList(newObjectsList);
        }

        getObjectsList();
    }, [currentTypeWindow, databaseAdditions, databaseChanges, databaseDeletions])

    return (
        <div className="types-window-objects">
            {showNewPopup ? <TypesPopup setShowNewPopup={setShowNewPopup}/> : ""}
            <div className="list" onContextMenu={handleRightClick}>
                {loading ? <h1>Loading...</h1> : 
                    objectsList.map((object) => {
                        return (
                            <button className="list-element" key={object.id} onClick={() => setSelectedElement(object)}>
                                {(databaseChanges.indexOf(object) >= 0 || databaseAdditions.indexOf(object) >= 0) ? `${object.name}*` : object.name}  
                            </button>
                        )})
                }
            </div>
        </div>
    )
}