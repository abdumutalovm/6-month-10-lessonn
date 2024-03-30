import { Link } from "react-router-dom";
import { useRef, useState } from "react";
function Register() {
const [loading,setLoading] = useState(false)

  const username = useRef("");
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
        password: password.current.value,
      };
      setLoading(true)
      fetch("https://auth-rg69.onrender.com/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then(res => res.json())
        .then(data => {
       if(data.message){

        if(data.id){
          localStorage.setItem('token',data.accessToken);
          localStorage.setItem('token',data);
          navigate('/');
        }
        if(data.message == 'User Not found.'){
          alert(data.message);
          username.current.focus();
        }

        if(data.message == 'Invalid Password!'){
          alert(data.message);
          password.current.focus();
        }
       }
          username.current.value = '';
          password.current.value = '';
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
      <h1 className="text text-center mt-3">Login page</h1>
      <form onSubmit={handleRegister} className="w-50 mx-auto mt-5 d-flex flex-column gap-4">
        <input
          ref={username}
          type="text"
          className="form-control"
          placeholder="Enter username"
        />
     

        <input
          ref={password}
          type="password"
          placeholder="Enter password"
          className="form-control"
        />
        <button disabled = {loading ? true : false} className="btn btn-success w-100">{loading ? "loading..." : "REGISTER"}</button>
        <Link className=" text-center" to="/register">Register</Link>
      </form>
     
    </div>
  );
}

export default Register;
