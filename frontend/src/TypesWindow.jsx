import { useEffect, useState } from "react"

export default function TypesWindow() {

    const [ objectsList, setObjectsList ] = useState([]);
    const [ selectedType, setSelectedType ] = useState("");

    useEffect(() => {
        const fetchObjectsList = () => {
            if (selectedType) {
                fetch(`http://localhost:3000/${selectedType}`)
                .then(data => data.json())
                .then(jsonData => setObjectsList(jsonData));
            }
        }

        fetchObjectsList();
    }, [selectedType])

    return (
        <div className="types-window">
            <div className="window-header">
                <p className="window-header-title">Types</p>
                <button className="window-header-close-button">X</button>
            </div>
            <div className="window-main">
                <div className="types-window-sidebar">
                    <div className="list">
                        <button className="sidebar-list-element" onClick={() => setSelectedType("android")}>Android</button>
                        <button className="sidebar-list-element" onClick={() => setSelectedType("character")}>Character</button>
                        <button className="sidebar-list-element" onClick={() => setSelectedType("faction")}>Faction</button>
                        <button className="sidebar-list-element" onClick={() => setSelectedType("item")}>Item</button>
                        <button className="sidebar-list-element" onClick={() => setSelectedType("location")}>Location</button>
                        <button className="sidebar-list-element" onClick={() => setSelectedType("ship")}>Ship</button>
                        <button className="sidebar-list-element" onClick={() => setSelectedType("ship_system")}>Ship System</button>
                    </div>
                </div>
                <div className="types-window-objects">
                    <div className="list">
                        {objectsList.map((object) => {
                            return (
                                <button className="list-element">
                                    {object.name}  
                                </button>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}