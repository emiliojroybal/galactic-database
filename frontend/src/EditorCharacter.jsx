import { useContext } from "react";
import AppContext from "./AppContext";
import EditorContext from "./EditorContext";

export default function EditorCharacter() {

    const { handleChange, formData } = useContext(EditorContext);
    const { databaseObject } = useContext(AppContext);

    const factionList = databaseObject["faction"];
    const speciesList = databaseObject["species"];

    return (
        <>
            <div className="editor-inputs">
                <p>Name: </p>
                <input className="editor-input" name="name" type="text" value={formData.name ? formData.name : ""} onChange={handleChange}></input>
                <p>Faction: </p>
                <select className="editor-input" name="factionIDs" value={formData.factionIDs ? formData.factionIDs : ""} onChange={handleChange}>
                    <option value={""}>Select faction</option>
                    {factionList.map((faction) => {
                        return (
                            <option value={faction.id}>{faction.name}</option>
                        )
                    })}
                </select>
                <p>Species: </p>
                <select className="editor-input" name="speciesID" value={formData.speciesID ? formData.speciesID : ""} onChange={handleChange}>
                    <option value={""}>Select species</option>
                    {speciesList.map((species) => {
                        return (
                            <option value={species.id}>{species.name}</option>
                        )
                    })}
                </select>
            </div>
        </>
    )
}