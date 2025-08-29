import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../CSS/Login.module.css"; // ✅ cricket theme CSS
import { toast } from "react-toastify";
import { getUserFromStorage, setCurrentUser } from "../utils/authUtils";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  
const handleLogin = async (e) => {
  e.preventDefault();

  // Validate form data
  if (!email || !password) {
    toast.error("Please fill in all fields");
    return;
  }

  try {
    // Get user from localStorage using utility function
    const user = getUserFromStorage(email);
    
    if (user && user.password === password) {
      // Set current user session
      const sessionSuccess = setCurrentUser({
        id: user.id,
        name: user.name,
        email: user.email
      });

      if (!sessionSuccess) {
        toast.error("Failed to create user session. Please try again.");
        return;
      }

      toast.success("Login successful! 🎉");
      
      // Clear form
      setEmail("");
      setPassword("");
      
      navigate("/booking/id");
    } else {
      toast.error("Invalid email or password. Please check your credentials.");
    }
  } catch (error) {
    console.error("Login error:", error);
    toast.error("Login failed. Please try again.");
  }
};

  return (
    <div className={styles["auth-container"]}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e)=>setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e)=>setPassword(e.target.value)} 
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account?{" "}
        <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
