import { useContext } from "react";
import AppContext from "./AppContext";
import EditorContext from "./EditorContext";

export default function EditorShip() {

    const { handleChange, formData } = useContext(EditorContext);
    const { databaseObject } = useContext(AppContext);

    const typeList = databaseObject["ship_type"];
    const factionList = databaseObject["faction"];

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
                <p>baseIntegrity: </p>
                <input className="editor-input" name="baseIntegrity" type="text" value={formData.baseIntegrity ? formData.baseIntegrity : ""} onChange={handleChange}></input>
                <p>initialLocationX: </p>
                <input className="editor-input" name="initialLocationX" type="text" value={formData.initialLocationX ? formData.initialLocationX : ""} onChange={handleChange}></input>
                <p>initialLocationY: </p>
                <input className="editor-input" name="initialLocationY" type="text" value={formData.initialLocationY ? formData.initialLocationY : ""} onChange={handleChange}></input>
                <p>systemSlots: </p>
                <input className="editor-input" name="systemSlots" type="text" value={formData.systemSlots ? formData.systemSlots : ""} onChange={handleChange}></input>
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