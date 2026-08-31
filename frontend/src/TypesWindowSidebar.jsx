import { useContext } from "react";
import AppContext from "./AppContext";

export default function TypesWindowSidebar() {

    const { currentTypeWindow, setCurrentTypeWindow, setSelectedElement } = useContext(AppContext);

    const changeTab = (newTab) => {
        setSelectedElement({});
        setCurrentTypeWindow(newTab);
    }

    return(
        <div className="types-window-sidebar">
            <div className="list">
                <button className="sidebar-list-element" data-selected={currentTypeWindow == "android"} onClick={() => changeTab("android")}>Android</button>
                <button className="sidebar-list-element" data-selected={currentTypeWindow == "character"} onClick={() => changeTab("character")}>Character</button>
                <button className="sidebar-list-element" data-selected={currentTypeWindow == "faction"} onClick={() => changeTab("faction")}>Faction</button>
                <button className="sidebar-list-element" data-selected={currentTypeWindow == "item"} onClick={() => changeTab("item")}>Item</button>
                <button className="sidebar-list-element" data-selected={currentTypeWindow == "location"} onClick={() => changeTab("location")}>Location</button>
                <button className="sidebar-list-element" data-selected={currentTypeWindow == "ship"} onClick={() => changeTab("ship")}>Ship</button>
                <button className="sidebar-list-element" data-selected={currentTypeWindow == "ship_system"} onClick={() => changeTab("ship_system")}>Ship System</button>
                <button className="sidebar-list-element" data-selected={currentTypeWindow == "species"} onClick={() => changeTab("species")}>Species</button>
            </div>
        </div>
    )
}