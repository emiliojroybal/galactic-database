import { useContext, useState } from "react";
import AppContext from "./AppContext";
import TypesContext from "./EditorContext";
import EditorAndroid from "./EditorAndroid";
import Editor from "./Editor";

export default function TypesPopup() {

    const { setDatabaseChanges, currentTypeWindow, setShowNewPopup, setSelectedElement } = useContext(AppContext);

    return (
        <div className="overlay">
            <div className="popup">
                <div className="popup-header">
                    <button onClick={() => setShowNewPopup(false)}>X</button>
                </div>
                <h3>New Element</h3>
                <Editor />
            </div>
        </div>
    )
}