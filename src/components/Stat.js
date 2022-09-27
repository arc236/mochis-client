import React from 'react'

export default function Stat({title, value}) {
  return (
    <article className="tile">
        <div className="tile-header">
            <i className="ph-lightning-light"></i>
            <h3>
                <span>{title}</span>
                <span>{value}</span>
            </h3>
        </div>
    </article>
  )
}
