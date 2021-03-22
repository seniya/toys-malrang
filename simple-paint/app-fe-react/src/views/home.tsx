import '../assets/home.scss'

function Home () {
  return (
    <>
      <div className="bg-img"></div>

      <canvas id="canvas"></canvas>

      <nav className="tools-bar">
      <div className="button button-clear" data-clear></div>
      </nav>

      <nav className="thickness-bar">
        <div className="thickness active" data-thickness="4"></div>
        <div className="thickness" data-thickness="12"></div>
        <div className="thickness" data-thickness="24"></div>
        <div className="thickness" data-thickness="48"></div>
        <div className="thickness" data-thickness="128"></div>
      </nav>

      <nav className="color-bar">
        <div className="color" data-color="#9b59b6"></div>
        <div className="color" data-color="#3498db"></div>
        <div className="color" data-color="#2ecc71"></div>
        <div className="color active" data-color="#1abc9c"></div>
        <div className="color" data-color="#f1c40f"></div>
        <div className="color" data-color="#e67e22"></div>
        <div className="color" data-color="#E73C61"></div>
      </nav>
    </>
  )
}

export default Home
