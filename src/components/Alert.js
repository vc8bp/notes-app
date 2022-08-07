import React from 'react'

export default function Alert(props) {

    const {type, message} = props;

  const capitalize = (Word) => {
    const lower = Word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }
  return (
      //style={{ height: "60px" }}
      <div style={{ height: "60px" }}> 
      {!type && <div className={`alert alert-${type}`} role="alert">
      <strong>{type}</strong>{message}
      </div>}
      {console.log("alert triggered")}
      </div>

    
  )
}
