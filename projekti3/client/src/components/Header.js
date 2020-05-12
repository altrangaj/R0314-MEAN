import React from 'react'

const Header = ({ title }) => 
<div style={{ position: 'relative', top: '1.5em', height: 'fit-content', lineHeight: '1.5em',}}>
  <div style={{
    display: 'inline-block',
    float: 'left',
    textAlign: 'left',
    borderBottom: 'solid .1em black',
    borderRadius: '0 0 .333em 0',
    backgroundColor: 'black',
  }}
  >
    <span style={{
      fontSize: '1.5em', padding: '0 .2em 0 0em', fontFamily: 'Russo One, sans-serif', color: '#a9bfd6',
    }}
    >
      {title}
    </span>
  </div>
</div>

export default Header