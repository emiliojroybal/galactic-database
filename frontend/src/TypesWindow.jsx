import { useEffect, useState, useContext } from "react";
import AppContext from "./AppContext";
import TypesPopup from "./TypesPopup";
import TypesWindowSidebar from "./TypesWindowSidebar";
import TypesWindowObjects from "./TypesWindowObjects";

export default function TypesWindow() {


    return (
        <div className="types-window">
            <TypesWindowSidebar />
            <TypesWindowObjects />
        </div>
    )
}