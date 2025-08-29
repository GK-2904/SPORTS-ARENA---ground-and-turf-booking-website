import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styles from "../CSS/Register.module.css";  // ✅ import module CSS
import { toast } from "react-toastify";
import { saveUserToStorage, setCurrentUser, debugLocalStorage } from "../utils/authUtils";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleDebug = () => {
    const debugInfo = debugLocalStorage();
    console.log('Debug info:', debugInfo);
    toast.info("Check console for localStorage debug info");
  };


const handleRegister = async (e) => {
  e.preventDefault();

  // Validate form data
  if (!name || !email || !password) {
    toast.error("Please fill in all fields");
    return;
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    toast.error("Please enter a valid email address");
    return;
  }

  // Validate password strength
  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long");
    return;
  }

  try {
    // Create user object
    const userData = {
      id: Date.now().toString(), // Add unique ID
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password,
      registeredAt: new Date().toISOString()
    };

    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = existingUsers.find(user => user.email === userData.email);
    
    if (userExists) {
      toast.error("User with this email already exists!");
      return;
    }

    // Save user to localStorage using utility function
    const saveSuccess = saveUserToStorage(userData);
    if (!saveSuccess) {
      toast.error("Failed to save user data. Please try again.");
      return;
    }

    // Set current user session
    const sessionSuccess = setCurrentUser({
      id: userData.id,
      name: userData.name,
      email: userData.email
    });

    if (!sessionSuccess) {
      toast.error("Failed to create user session. Please try again.");
      return;
    }

    toast.success("Registration successful! 🎉");
    
    // Clear form
    setName("");
    setEmail("");
    setPassword("");
    
    navigate("/login");
  } catch (error) {
    console.error("Registration error:", error);
    toast.error("Registration failed. Please try again.");
  }
};

  return (
    <div className={styles["auth-container"]}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input 
          type="text" 
          placeholder="Full Name" 
          value={name} 
          onChange={(e)=>setName(e.target.value)} 
        />
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
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account?{" "}
        <Link to="/login">Login</Link>
      </p>
      
      {/* Debug button for development */}
      <button 
        onClick={handleDebug}
        style={{
          marginTop: '20px',
          padding: '8px 16px',
          backgroundColor: '#6c757d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '0.9rem'
        }}
      >
        Debug localStorage
      </button>
    </div>
  );
};

export default Register;
