
import './Header.css'
const Header = () => {
  return (
    <div className='header'>
      <div className="header-contents">
        <h2>
            Order your favourite food here
        </h2>
        <p>
            Choose your favourite dishes and enjoy the gourmet.
        </p>
         <a href="#explore-menu">
        <button>View Menu</button>
            </a>
      </div>
    </div>
  )
}

export default Header
