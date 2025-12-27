import Chai from "./Chai.jsx";

function App() {
  const username = "chai aur code"

  return (
    <>
      <Chai />
      <h1>Helllllo {username}</h1>  // {username} this is called evaluated expression, so cant write any conditionals inside {}
      <p>Test para</p>
    </>
  )
}

export default App
