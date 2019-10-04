import React, { useEffect, useState } from 'react'
import api from '../../api'

export default function MyPattern() {
  const [myPattern, setMyPattern] = useState([])
  useEffect(() => {
    api
      .getMyPattern()
      .then(myPattern => {
        setMyPattern(myPattern)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      <div className="MyPattern">
        <h2 className="libraryMainTitle">My Patterns</h2>

        <div>
          <div className="masonrygrid">
            {myPattern.map((c, i) => (
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
