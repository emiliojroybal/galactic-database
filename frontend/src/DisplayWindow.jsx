import { useContext } from "react"
import AppContext from "./AppContext"
import Editor from "./Editor";

export default function DisplayWindow() {

    const { selectedElement, databaseObject, currentTypeWindow } = useContext(AppContext);

    return (
        <div className="display-window">
            {selectedElement.id ? 
            <>
                <h1>{selectedElement.name}</h1>
                <Editor />
            </> : ""}
        </div>
    )
}