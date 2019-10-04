import React, { useEffect, useState } from 'react'
import api from '../../api'
import './Libraryy.scss'

export default function Library() {
  const [library, setLibrary] = useState([])
  useEffect(() => {
    api
      .getLibrary()
      .then(library => {
        setLibrary(library)
      })
      .catch(err => console.log(err))
  }, [])
  return (
    <div>
      <div className="MyPattern">
        <h2 className="libraryMainTitle">Library</h2>

        <div>
          <div className="masonrygrid">
            {library.map((c, i) => (
              <div className="item item--2x2" key={i}>
                <img src={c.image} alt="img" className="imageToPattern" />
                <div className="descriptionLabel">
                  <label>
                    {c.name}
                    <label className="descriptionLabelId"></label>
                    {c.description}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
