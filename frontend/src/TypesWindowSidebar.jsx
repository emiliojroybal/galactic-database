import { useContext } from "react";
import AppContext from "./AppContext";

export default function TypesWindowSidebar() {

    const { setCurrentTypeWindow } = useContext(AppContext);

    return(
        <div className="types-window-sidebar">
            <div className="list">
                <button className="sidebar-list-element" onClick={() => setCurrentTypeWindow("android")}>Android</button>
                <button className="sidebar-list-element" onClick={() => setCurrentTypeWindow("character")}>Character</button>
                <button className="sidebar-list-element" onClick={() => setCurrentTypeWindow("faction")}>Faction</button>
                <button className="sidebar-list-element" onClick={() => setCurrentTypeWindow("item")}>Item</button>
                <button className="sidebar-list-element" onClick={() => setCurrentTypeWindow("location")}>Location</button>
                <button className="sidebar-list-element" onClick={() => setCurrentTypeWindow("ship")}>Ship</button>
                <button className="sidebar-list-element" onClick={() => setCurrentTypeWindow("ship_system")}>Ship System</button>
                <button className="sidebar-list-element" onClick={() => setCurrentTypeWindow("species")}>Species</button>
            </div>
        </div>
    )
}