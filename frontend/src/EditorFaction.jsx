import { useContext } from "react";
import AppContext from "./AppContext";
import EditorContext from "./EditorContext";

export default function EditorFaction() {

    const { handleChange, formData } = useContext(EditorContext);
    const { databaseObject } = useContext(AppContext);

    return (
        <>
            <div className="editor-inputs">
                <p>Name: </p>
                <input className="editor-input" name="name" type="text" value={formData.name ? formData.name : ""} onChange={handleChange}></input>
            </div>
        </>
    )
}