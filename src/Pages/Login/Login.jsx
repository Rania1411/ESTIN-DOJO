import Footer from '../../Components/Footer/Footer.jsx';
import styles from "./Login.module.css";
import logo from "../../assets/dojo.png";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { useState } from 'react';
import axios from 'axios';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fields.email || !fields.password) { setError("Please fill in all fields."); return; }

    setLoading(true);

    if (!fields.email.endsWith("@estin.dz")) {
      setError("Email must be an @estin.dz address.");
      setLoading(false);
      return;
    }

    try {
      let res;
      try {
        res = await axios.post("http://localhost:5000/api/auth/login", {
          email: fields.email,
          password: fields.password,
        });
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message === 'Invalid credentials') {
          try {
            res = await axios.post("http://localhost:5000/api/auth/register", {
              name: fields.email.split("@")[0],
              email: fields.email,
              password: fields.password,
              year: "1CP"
            });
          } catch (registerErr) {
            if (registerErr.response && registerErr.response.data && registerErr.response.data.message === 'User already exists') {
              throw new Error("Invalid email or wrong password");
            }
            throw registerErr;
          }
        } else {
          throw err;
        }
      }

      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during authentication.");
    } finally {
      setLoading(false);
    }
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