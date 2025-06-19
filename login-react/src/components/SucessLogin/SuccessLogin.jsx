import './SuccessLogin.css'

function SuccessLogin({ user, onLogout }) {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-sky-50 via-sky-100 to-sky-200">
      <div 
        className="
          w-full max-w-lg bg-sky-50 rounded-3xl p-10 
          shadow-lg text-center text-gray-800 font-poppins m-5
        "
      >
        <h1 className="mb-5 text-blue-900 text-3xl font-semibold">Welcome, {user?.username || "User"}</h1>
        <p className="text-lg text-left my-2 text-gray-800 font-medium">Here are your details:</p>
        <p className="text-lg text-left my-2 text-gray-800">- Email: {user?.email}</p>
        <p className="text-lg text-left my-2 text-gray-800">- Id: {user?.id}</p>
        <button 
          className="
            w-36 h-10 bg-blue-900 rounded-md 
            shadow-md border-none 
             hover:bg-blue-700 transition-colors
            cursor-pointer text-base text-white font-semibold 
            mt-5 mx-auto duration-200
            flex items-center justify-center
          "
          onClick={onLogout}
        >
          <i className='bx bx-log-out align-middle mr-2'></i>
          Log out
        </button>
      </div>
    </div>
  );
}

export default SuccessLogin