import { Link } from "react-router-dom";
import { useRef, useState } from "react";
function Register() {
const [loading,setLoading] = useState(false)

  const usename = useRef("");
  const email = useRef("");
  const password = useRef("");

  function validate() {
    return true;
  }

  function handleRegister(e) {
    e.preventDefault();
    const isValid = validate();
    if (isValid) {
      const user = {
        usename: usename.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      setLoading(true)
      fetch("https://auth-rg69.onrender.com/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then(res => res.json())
        .then(data => {
          if(data.message == 'User registered successfully!'){
            navigate('/login');
          }
          if(data.message == 'Failed Email is already in use!'){
            alert(data.message);
            email.current.focus();
          }
          if(data.message == 'Failed! Username is already in use!'){
            alert(data.message);
            user.current.focus();
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        })
    }
  }

  return (
    <div>
      <h1 className="text text-center mt-3">Register page</h1>
      <form onSubmit={handleRegister} className="w-50 mx-auto mt-5 d-flex flex-column gap-4">
        <input
          ref={usename}
          type="text"
          className="form-control"
          placeholder="Enter username"
        />
        <input
          ref={email}
          type="email"
          className="form-control"
          placeholder="Enter email"
        />

        <input
          ref={password}
          type="password"
          placeholder="Enter password"
          className="form-control"
        />
        <button disabled = {loading ? true : false} className="btn btn-success w-100">{loading ? "loading..." : "REGISTER"}</button>
        <Link to="/login">Login</Link>
      </form>
     
    </div>
  );
}

export default Register;
