import './SuccessLogin.css'

function SuccessLogin({ user, onLogout }) {
  return (
    <div className="welcome-box">
      <h1>Welcome, {user?.username || "User"}</h1>
      <p>Here are your details:</p>
      <p>- Email: {user?.email}</p>
      <p>- Id: {user?.id}</p>
      <button className="logout-btn" onClick={onLogout}>
        <i className='bx bx-log-out'></i>
        Log out
      </button>
    </div>
  );
}

export default SuccessLogin