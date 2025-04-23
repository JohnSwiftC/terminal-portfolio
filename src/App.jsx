import { useState } from 'react'
//import './App.css'

import Terminal from './Terminal'
import TitleCard from './TitleCard';

function App() {

  const [showTitleCard, setShowTitleCard] = useState(true);
  
  return (
    <>
    <div>
      {showTitleCard && (
        <TitleCard 
          title = "Welcome!"
          subtitle=""
          duration={3000}
        />
      )}
      <Terminal />
    </div>
    </>
  )
}

export default App
