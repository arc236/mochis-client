import React, { useEffect, useState } from 'react'
import Stat from './Stat'
import StubList from './StubList'
import { DarkModeSwitch } from 'react-toggle-dark-mode';


export default function Promo({serial}) {
    const [isDarkMode, setDarkMode] = useState(false)
    const [currentSerial, setCurrentSerial] = useState(serial)
    const [newSerial, setNewSerial] = useState("")
    const [batchStatus, setBatchStatus] = useState({})
    const [stubs, setStubs] = useState([])
    const [updated, setUpdated] = useState(false)
    const [initialized, setInitialized] = useState(false)
    
    const base_url = 'http://192.168.68.104:7777'

    useEffect(() => {
        if (isDarkMode) {
            document.body.style.background = "#1f1f1f";
        } else {
            document.body.style.background = "white";
        }
        
        fetch(`${base_url}/api/v1/batches/status/${currentSerial}`)
        .then(res => res.json())
        .then(status => {
            setBatchStatus(status)
            setInitialized(true)
        })
    }, [setBatchStatus, currentSerial, isDarkMode])

    if (initialized) {
        fetch(`${base_url}/api/v1/stubs?batch_id=${batchStatus.id}`)
        .then(res => res.json())
        .then(stubs => {
            setStubs(stubs)
            setInitialized(false)
        })
    }

    if (updated) {
        fetch(`${base_url}/api/v1/batches/status/${currentSerial}`)
        .then(res => res.json())
        .then(status => {
            setBatchStatus(status)
            setUpdated(false)
        })
    }

    const createNewBatch = () => {
        if (newSerial.trim().length >= 5) {
            console.log("Creating new batch: ", newSerial)
            fetch(`${base_url}/api/v1/batches/create/${newSerial}`, {method: "POST"})
            .then(res => res.json())
            .then(data => {
                setCurrentSerial(data.batch_serial)
                setNewSerial("")
                setUpdated(true)
                setInitialized(true)
            })
        } else {
            console.log("Batch Serial too short: ", newSerial)
        }
    }

    const toggleDarkMode = () => {
        setDarkMode(!isDarkMode);
        if (isDarkMode) {
            document.body.style.background = "#1f1f1f";
        } else {
            document.body.style.background = "white";
        }
      };

    return (
        <div className={`${isDarkMode ? "dark-mode" : ""}`}>
            {batchStatus.status === "COMPLETED" &&
            <form>
                <label>
                    Mochis Promo #{batchStatus.serial} - {batchStatus.status}
                    <input type="text" name="serial" value={newSerial} onChange={e =>
                        {
                            setNewSerial(e.target.value)
                        }
                        }/>
                </label>
                <input type="button" value="Create New Batch" onClick={createNewBatch}/>
                <DarkModeSwitch style={{ marginBottom: '-.6rem', position: 'relative', left: '280px' }}
                    checked={isDarkMode}
                    onChange={toggleDarkMode}
                    moonColor={"white"}
                    size={20}/>
            </form>}
            {batchStatus.status !== "COMPLETED" && <span>
                Mochis Promo #{batchStatus.serial}
                <DarkModeSwitch style={{ marginBottom: '-.6rem', position: 'relative', left: '660px' }}
                    checked={isDarkMode}
                    onChange={toggleDarkMode}
                    moonColor={"white"}
                    size={20}/>
                </span>}
            <div className="tiles">
                <Stat title="Unopened" value={batchStatus.closed}/>
                <Stat title="Opened" value={batchStatus.opened}/>
                <Stat title="Opened Prizes" value={batchStatus.opened_prizes}/>
                <Stat title="Remaining Prizes" value={batchStatus.remaining_prizes}/>
            </div>
            <StubList stubs={stubs} setUpdated={setUpdated} baseUrl={base_url}></StubList>
        </div>
    )
}
