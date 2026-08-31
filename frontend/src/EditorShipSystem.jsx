import { useContext } from "react";
import AppContext from "./AppContext";
import EditorContext from "./EditorContext";

export default function EditorShipSystem() {

    const { handleChange, formData } = useContext(EditorContext);
    const { databaseObject } = useContext(AppContext);

    const typeList = databaseObject["ship_system_type"];

    return (
        <>
            <div className="editor-inputs">
                <p>Name: </p>
                <input className="editor-input" name="name" type="text" value={formData.name ? formData.name : ""} onChange={handleChange}></input>
                <p>Type: </p>
                <select className="editor-input" name="typeID" value={formData.typeID ? formData.typeID : ""} onChange={handleChange}>
                    <option value={""}>Select type</option>
                    {typeList.map((type) => {
                        return (
                            <option value={type.id}>{type.name.charAt(0).toUpperCase() + type.name.slice(1)}</option>
                        )
                    })}
                </select>
                <p>baseEfficiency: </p>
                <input className="editor-input" name="baseEfficiency" type="text" value={formData.baseEfficiency ? formData.baseEfficiency : ""} onChange={handleChange}></input>
                <p>baseHealth: </p>
                <input className="editor-input" name="baseHealth" type="text" value={formData.baseHealth ? formData.baseHealth : ""} onChange={handleChange}></input>
            </div>
        </>
    )
}