import { useContext } from "react";
import AppContext from "./AppContext";
import EditorContext from "./EditorContext";

export default function EditorLocation() {

    const { handleChange, formData } = useContext(EditorContext);
    const { databaseObject } = useContext(AppContext);

    const factionList = databaseObject["faction"];
    const LocationList = databaseObject["location_type"];

    return (
        <>
            <div className="editor-inputs">
                <p>Name: </p>
                <input className="editor-input" name="name" type="text" value={formData.name ? formData.name : ""} onChange={handleChange}></input>
                <p>Type: </p>
                <select className="editor-input" name="locationType" value={formData.locationType ? formData.locationType : ""} onChange={handleChange}>
                    <option value={""}>Select type</option>
                    {LocationList.map((type) => {
                        return (
                            <option value={type.id}>{type.name.charAt(0).toUpperCase() + type.name.slice(1)}</option>
                        )
                    })}
                </select>
                <p>LocationX: </p>
                <input className="editor-input" name="locationX" type="text" value={formData.locationX ? formData.locationX : ""} onChange={handleChange}></input>
                <p>LocationY: </p>
                <input className="editor-input" name="locationY" type="text" value={formData.locationY ? formData.locationY : ""} onChange={handleChange}></input>
                <p>Controlling Faction: </p>
                <select className="editor-input" name="controllingFactionID" value={formData.controllingFactionID ? formData.controllingFactionID : ""} onChange={handleChange}>
                    <option value={""}>Select faction</option>
                    {factionList.map((faction) => {
                        return (
                            <option value={faction.id}>{faction.name}</option>
                        )
                    })}
                </select>
            </div>
        </>
    )
}