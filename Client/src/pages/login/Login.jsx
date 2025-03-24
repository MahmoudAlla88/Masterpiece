
import { useState, useEffect } from "react";
import { User, Mail, Lock, Phone } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
const [videoHeight, setVideoHeight] = useState(90);
const [isRegister, setIsRegister] = useState(false);
const [loading, setLoading] = useState(false);
const [formData, setFormData] = useState({
  fullName: '',
  phone: '',
  email: '',
  password: '',
});

const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: value,
  }));
};
const toggleRegister = () => {
 
    setIsRegister(!isRegister);
   
    setVideoHeight(isRegister ? 90 : 201); 
    
  };
const handleGoogleSignIn = () => {
  setLoading(true);
 
  setLoading(false);
};


const handleRegister = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const response = await axios.post(
      "http://localhost:4000/user/signup",
      {
        name: formData.fullName,
        phone: formData.phone,
        email:formData.email,
        password: formData.password,
      },
      { withCredentials: true } // يضمن إرسال واستقبال الكوكيز
    );
    toast.success(response.data.message);
    navigate("/");
    
  } catch (error) {
    console.error(error);
    toast.error(
      error.response?.data?.message || "Registration failed"
    );
  } finally {
    setLoading(false);
  }
};

const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  try {
    const response = await axios.post(
      "http://localhost:4000/user/login",
      {
        email: formData.email,
        password: formData.password,
      },
      { withCredentials: true }
    );
    toast.success(response.data.message);
    // يمكنك تخزين بيانات المستخدم أو إعادة التوجيه هنا
    navigate("/");
  } catch (error) {
    console.error(error);
    toast.error(
      error.response?.data?.message || "Login failed"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4">
      <Toaster position="top-right" />
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side - Video Section */}
        <div className={`hidden md:block md:w-1/2 relative h-${videoHeight}`}>
        <video
          src="src/assets/7667419-uhd_2160_4096_25fps.mp4"
           alt="Luxury Villa"
           className={`${isRegister ? 'h-210' : 'h-166'} w-full object-cover`}
           autoPlay
           loop
           muted
            />
          <div className="absolute inset-0 flex flex-col justify-center px-12 text-white bg-black/30">
            <h2 className="text-4xl font-bold mb-6">
              {isRegister ? "Start Your Journey" : "Welcome Back"}
            </h2>
            <p className="text-lg opacity-90">
              {isRegister
                ? "Create your account and join our community today."
                : "Sign in to access your personalized experience."}
            </p>
          </div>
        </div>

        {/* Right Side - Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {isRegister ? "Create Account" : "Sign In"}
              </h3>
              <p className="text-gray-600">
                {isRegister
                  ? "Fill in your details to get started"
                  : "Enter your credentials to continue"}
              </p>
            </div>

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-300"
            >
              <img
                src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                alt="Google"
                className="w-6 h-6"
              />
              {loading ? "Loading..." : "Continue with Google"}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <form
              onSubmit={isRegister ? handleRegister : handleLogin}
              className="space-y-6"
            >
              {/* Form Fields */}
              <div className="space-y-4">
                {isRegister && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <div className="relative">
                        <User
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <input
                          name="fullName"
                          type="text"
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#EA0054] focus:border-transparent transition-all duration-300"
                          placeholder="Enter your name"
                          value={formData.fullName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <input
                          name="phone"
                          type="tel"
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#EA0054] focus:border-transparent transition-all duration-300"
                          placeholder="+96200 0000 000"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      name="email"
                      type="email"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#EA0054] focus:border-transparent transition-all duration-300"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                      size={20}
                    />
                    <input
                      name="password"
                      type="password"
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#EA0054] focus:border-transparent transition-all duration-300"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-purple-500 hover:bg-purple-600 text-white py-4 rounded-lg font-semibold text-sm uppercase tracking-wide hover:bg-[#EA0054] transition-all duration-300"
              >
                {loading
                  ? "Loading..."
                  : isRegister
                  ? "Create Account"
                  : "Sign In"}
              </button>
            </form>

            {/* Toggle Link */}
            <p className="text-center text-gray-600">
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <button
               onClick={toggleRegister}
                // onClick={() => setIsRegister(!isRegister)}
                className="  text-[#c448e6]   font-semibold  transition-colors duration-300"
              >
                {isRegister ? "Sign In" : "Create Account"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;