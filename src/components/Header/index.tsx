import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div
      style={{
        border: '1px solid green',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <p>
        <b>Header</b>
      </p>
      <Link to="posts">Post</Link>
      <Link to="blog">Blog</Link>
    </div>
  )
}

export default Header
