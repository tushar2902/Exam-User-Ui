"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [Email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [fullName, setFullName] = useState("");
  const [lastName, setLastName] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSendOtp = async () => {
    if (!Email) {
      setError("Please enter your phone number or email.");
      return;
    }
    setError("");
    setOtpSent(true);
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setError("Please enter a valid OTP.");
      return;
    }
    setError("");
    router.push("/profile-setup");
  };

  // Placeholder for future Google login logic
  const handleGoogleLogin = () => {
    alert("Google login will be implemented later.");
  };

  return (
    <section className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center">Create an Account</h2>

        {error && <p className="text-red-500 text-sm text-center mt-2">{error}</p>}

        {!otpSent ? (
          <>
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-3 border border-gray-300 rounded-lg mt-4"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="w-full p-3 border border-gray-300 rounded-lg mt-4"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter Email"
              className="w-full p-3 border border-gray-300 rounded-lg mt-4"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              className="w-full mt-4 px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
              onClick={handleSendOtp}
            >
              Send OTP
            </button>

            {/* SSO Divider Section */}
            <div className="flex items-center mt-6 mb-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-sm text-gray-500">Or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Google Sign-In Button */}
            <div className="mt-4">
              <button
                className="w-full p-3 bg-white text-black font-bold rounded-lg flex items-center justify-center border border-gray-300 hover:bg-gray-100"
                onClick={handleGoogleLogin}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#4285F4"
                    d="M24 9.5c3.9 0 7.4 1.3 10.1 3.8l7.4-7.4C36.9 2 30.9 0 24 0 14.6 0 6.5 5.1 2.5 12.5l8.5 6.6C14 13.5 18.7 9.5 24 9.5z"
                  />
                  <path
                    fill="#34A853"
                    d="M46.2 24.6c0-1.5-.1-2.9-.3-4.3H24v8.7h12.6c-.6 3-2.3 5.6-4.8 7.3l7.4 5.7c4.4-4.1 7-10.1 7-17.4z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M12.4 28.2c-1-3-1-6.2 0-9.2l-8.5-6.6c-2.6 5.1-2.6 11.3 0 16.5l8.5-6.6z"
                  />
                  <path
                    fill="#EA4335"
                    d="M24 48c6.9 0 12.7-2.3 16.9-6.2l-7.4-5.7c-2.3 1.5-5.1 2.4-8.1 2.4-5.3 0-9.8-3.5-11.5-8.2l-8.5 6.6C9.5 42.9 16.2 48 24 48z"
                  />
                </svg>
                <span>Sign up with Google</span>
              </button>
            </div>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              className="w-full p-3 border border-gray-300 rounded-lg mt-4"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button
              className="w-full mt-4 px-6 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
              onClick={handleVerifyOtp}
            >
              Verify & Create Account
            </button>
          </>
        )}
      </div>
    </section>
  );
}
