import { Link } from 'react-router-dom'
import "./NoMatch.css"

function NoMatch() {
  return (
    <div className="no-match">
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page of the app</Link>
      </p>
    </div>
  )
}

export default NoMatch