import React, { useState } from 'react'

export default function Stub({stub, i, setUpdated, baseUrl}) {
    const [currentStub, setCurrentStub] = useState(stub)
    const [clicks, setClicks] = useState(0)
    const [clickedId, setClickedId] = useState(-1)
    const [showWin, setShowWin] = useState(false)

    const openStub = () => {

        // initial click
        if (clicks === 0) {
            setClicks(1)
            setClickedId(currentStub.id)
            return
        }

        // second click
        if (clicks === 1) {
            if (clickedId !== currentStub.id) {
                setClickedId(currentStub.id)
                return
            }
        }

        if (!currentStub.open) {
            setClicks(0)
            setClickedId(-1)
            fetch(`${baseUrl}/api/v1/stubs/open/${currentStub.id}`,{method: "POST"})
                .then(
                    res => res.json()
                )
                .then(data => {
                    setCurrentStub(data)
                    setUpdated(true)
                }
            )
        }
    }

    return (
        <article className={`stub${currentStub.open ? (currentStub.prize ? "-opened-win" : "-opened") : (clickedId === currentStub.id) ? "-clicked" : ""}`} key={currentStub.id} onClick={openStub}>
            <div className="stub-header">
                <i className="ph-lightning-light"></i>
                    <h3>
                        {showWin && i<=9 && currentStub.open === false && currentStub.prize && <span className='i-less'>{i}</span>}
                        {showWin && i>9 && currentStub.open === false && currentStub.prize && <span className='i-more'>{i}</span>}
                        {showWin === false && i<=9 && currentStub.open === false && <span className='i-less'>{i}</span>}
                        {showWin === false && i>9 && currentStub.open === false && <span className='i-more'>{i}</span>}
                        {currentStub.open && currentStub.prize === false && <span className='sad'>😭</span>}
                        {currentStub.open && currentStub.prize && <span>WIN</span>}
                    </h3>
            </div>
        </article>
    )
}
