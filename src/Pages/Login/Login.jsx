import Footer from '../../Components/Footer/Footer.jsx';
import styles from "./Login.module.css";
import logo from "../../assets/dojo.png";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useState } from 'react';

function Login() {
  const navigate = useNavigate();
  const [fields, setFields] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fields.email || !fields.password) { setError("Please fill in all fields."); return; }

    setLoading(true);

    setTimeout(() => {
      if (!fields.email.endsWith("@estin.dz")) {
        setError("Email must be an @estin.dz address.");
        setLoading(false);
        return;
      }
      const newUser = {
        id: Date.now(),
        name: fields.email.split("@")[0],
        hours: 0,
        year:['1cp','2cp','1cs','2cs','3cs']
      };

      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      const exists = existingUsers.find(u => u.name === newUser.name);
      if (!exists) {
        existingUsers.push(newUser);
        localStorage.setItem("users", JSON.stringify(existingUsers));
      }

      localStorage.setItem("currentUser", JSON.stringify(newUser));
      navigate("/dashboard");
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.loginForm}>

          <div className={styles.welcome}>
            <img src={logo} alt="logo" className={styles.logo} />
            <h2>Welcome Back</h2>
            <p>Enter your credentials to access the dojo</p>
          </div>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className={styles.errorBanner} role="alert">
                <span className={styles.errorIcon}>!</span>
                {error}
              </div>
            )}

            <div className={styles.field}>
              <label htmlFor="email">Email Address</label>
              <div className={styles.inputBox}>
                <FaEnvelope />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="student@estin.dz"
                  value={fields.email}
                  onChange={handleChange}
                  disabled={loading}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className={styles.field}>
              <div className={styles.passwordHeader}>
                <label htmlFor="password">Password</label>
                <span onClick={() => navigate("/forgot-password")}>
                  Forgot password?
                </span>
              </div>
              <div className={styles.inputBox}>
                <FaLock />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={fields.password}
                  onChange={handleChange}
                  disabled={loading}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                />
              </div>
            </div>

            <button className={styles.button} type="submit" disabled={loading}>
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login;