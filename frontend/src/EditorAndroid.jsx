import { useContext } from "react";
import AppContext from "./AppContext";
import EditorContext from "./EditorContext";

export default function EditorAndroid() {

    const { handleChange, formData } = useContext(EditorContext);
    const { databaseObject } = useContext(AppContext);

    const typeList = databaseObject["android_type"];

    return (
        <>
            <div className="new-type-inputs">
                <p>Name: </p>
                <input name="name" type="text" value={formData.name ? formData.name : ""} onChange={handleChange}></input>
                <p>Type: </p>
                <select name="typeID" value={formData.typeID ? formData.typeID : ""} onChange={handleChange}>
                    <option value={""}>Select type</option>
                    {typeList.map((type) => {
                        return (
                            <option value={type.id}>{type.name}</option>
                        )
                    })}
                </select>
                <p>baseEfficiency: </p>
                <input name="baseEfficiency" type="text" value={formData.baseEfficiency ? formData.baseEfficiency : ""} onChange={handleChange}></input>
                <p>baseHealth: </p>
                <input name="baseHealth" type="text" value={formData.baseHealth ? formData.baseHealth : ""} onChange={handleChange}></input>
            </div>
        </>
    )
}