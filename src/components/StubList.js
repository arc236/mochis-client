import React from 'react'
import Stub from './Stub'

export default function StubList({stubs, setUpdated, baseUrl}) {
  return (
    <div className="stubs">
        {stubs.map(s => {
            return (
                <Stub stub={s} i={stubs.indexOf(s)+1} key={s.id} setUpdated={setUpdated} baseUrl={baseUrl}/>
            )}
        )}
    </div>
  )
}
