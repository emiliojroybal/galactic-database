import { useContext } from "react"
import AppContext from "./AppContext"
import { saveDatabase } from "./useDatabase"

export default function DisplayHeader() {

    const { setRefresh, databaseChanges, databaseAdditions, databaseDeletions } = useContext(AppContext);

    return (
        <div className="display-header">
            <div className="display-header-content">
                <h1>Galactic Database</h1>
                <div className="display-header-buttons-container">
                    <div className="display-header-buttons">
                        <button className="display-header-button" onClick={() => setRefresh(true)}>Refresh Database</button>
                        <button className="display-header-button" onClick={() => saveDatabase(databaseChanges, databaseAdditions, databaseDeletions, setRefresh)}>Save to Database</button>
                    </div>
                </div>
            </div>
        </div>
    )
}