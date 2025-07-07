"use client"

import { useState, useEffect,useRef } from "react"
import { SparklesCore } from "@/components/ui/sparkles"

export default function EduPortalLanding() {

  const [selectedRole, setSelectedRole] = useState<"student" | "teacher" | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const registerRef = useRef<HTMLDivElement>(null)
  const [showRegister, setShowRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    department: "",
    year: "",
    email: "",
    collegeId: "",
    wallet: walletAddress,
  });

  useEffect(() => {
    setIsLoaded(true)
    // Check if wallet is already connected
    checkWalletConnection()
  }, [])

  const checkWalletConnection = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" })
        if (accounts.length > 0) {
          setWalletAddress(accounts[0])
        }
      } catch (error) {
        console.log("Error checking wallet connection:", error)
      }
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  useEffect(() => {
  setFormData(prev => ({ ...prev, wallet: walletAddress }));
  }, [walletAddress]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Registration successful!");
        setFormData({
          name: "",
          department: "",
          year: "",
          email: "",
          collegeId: "",
          wallet: "",
        });
        setShowRegister(false);
      } else {
        alert("Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to submit form.");
    }
    finally {
    setIsLoading(false);
  }
  };


  const connectWallet = async () => {
    if (typeof window !== "undefined" && window.ethereum) {
      setIsConnecting(true)
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        setWalletAddress(accounts[0])
      } catch (error) {
        console.error("Error connecting wallet:", error)
      } finally {
        setIsConnecting(false)
      }
    } else {
      alert("Please install MetaMask or another Web3 wallet!")
    }
  }

  const disconnectWallet = () => {
    setWalletAddress("")
    setSelectedRole(null)
  }


  const handleRegisterClick = () => {
    setShowRegister(true);
    setTimeout(() => {
      registerRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100); // small delay to allow DOM to render
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-indigo-950 text-white relative overflow-hidden">
      {/* Animated Background */}
       <SparklesCore
    id="tsparticlesfullpage"
    background="transparent"
    minSize={0.6}
    maxSize={1.4}
    particleDensity={100}
    className="absolute top-0 left-0 w-full h-full z-0"
    particleColor="#FFFFFF"
  />

      {/* Floating Particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}

      {/* Main Content */}
      <div
        className={`relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12 transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Header */}
        <div className="text-center mb-16 space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl md:text-8xl font-light tracking-wider bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              EduChain
            </h1>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent mx-auto"></div>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Join the future of decentralized education. Connect your wallet to get started.
          </p>
        </div>

        {/* Wallet Status */}
        {walletAddress && (
          <div className="mb-8 p-4 bg-green-500/10 border border-green-500/30 rounded-xl backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-300 text-sm">
                  Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                </span>
              </div>
              <button onClick={disconnectWallet} className="text-xs text-gray-400 hover:text-white transition-colors">
                Disconnect
              </button>
            </div>
          </div>
        )}

        {/* Role Selection */}
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-3xl mb-12">
          {/* Student Card */}
          <div
            className={`group relative cursor-pointer transition-all duration-500 ${
              selectedRole === "student" ? "scale-105" : "hover:scale-102"
            }`}
            onClick={() => setSelectedRole(selectedRole === "student" ? null : "student")}
          >
            <div
              className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
                selectedRole === "student"
                  ? "bg-gradient-to-br from-blue-500/20 to-cyan-500/20 shadow-2xl shadow-blue-500/25 border-2 border-blue-400/50"
                  : "bg-white/5 group-hover:bg-white/10 border border-white/10"
              }`}
            ></div>

            <div className="relative p-8 backdrop-blur-sm rounded-3xl">
              <div className="text-center space-y-6">
                <div
                  className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    selectedRole === "student"
                      ? "bg-blue-500 shadow-lg shadow-blue-500/50"
                      : "bg-white/10 group-hover:bg-white/20"
                  }`}
                >
                  <img className="" src="https://i.pinimg.com/736x/ef/a3/1f/efa31f21b681c3ed3f29c147de99d6aa.jpg">
                </img>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-3">Student</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Access courses, submit assignments, and earn blockchain-verified certificates
                  </p>
                </div>

                {selectedRole === "student" && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>
                    {["Course Library Access", "Assignment Submission", "NFT Certificates", "Progress Tracking"].map(
                      (feature, i) => (
                        <div key={i} className="flex items-center justify-center text-sm text-blue-300">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></div>
                          {feature}
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Teacher Card */}
          <div
            className={`group relative cursor-pointer transition-all duration-500 ${
              selectedRole === "teacher" ? "scale-105" : "hover:scale-102"
            }`}
            onClick={() => setSelectedRole(selectedRole === "teacher" ? null : "teacher")}
          >
            <div
              className={`absolute inset-0 rounded-3xl transition-all duration-500 ${
                selectedRole === "teacher"
                  ? "bg-gradient-to-br from-purple-500/20 to-pink-500/20 shadow-2xl shadow-purple-500/25 border-2 border-purple-400/50"
                  : "bg-white/5 group-hover:bg-white/10 border border-white/10"
              }`}
            ></div>

            <div className="relative p-8 backdrop-blur-sm rounded-3xl">
              <div className="text-center space-y-6">
                <div
                  className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    selectedRole === "teacher"
                      ? "bg-purple-500 shadow-lg shadow-purple-500/50"
                      : "bg-white/10 group-hover:bg-white/20"
                  }`}
                >
                 <img className="" src="https://i.pinimg.com/736x/13/f6/95/13f695dcfcd259a05af600e934bba297.jpg">
                </img>
                </div>

                <div>
                  <h3 className="text-2xl font-semibold mb-3">Teacher</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Create courses, manage students, and issue verified credentials
                  </p>
                </div>

                {selectedRole === "teacher" && (
                  <div className="space-y-3 animate-fade-in">
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent"></div>
                    {["Course Creation", "Student Management", "Grade Assignments", "Issue Certificates"].map(
                      (feature, i) => (
                        <div key={i} className="flex items-center justify-center text-sm text-purple-300">
                          <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></div>
                          {feature}
                        </div>
                      ),
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {!walletAddress ? (
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className="group relative px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-2xl hover:shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center space-x-2">
                {isConnecting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Connecting...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Connect Wallet</span>
                  </>
                )}
              </span>
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          ) : selectedRole ? (
            <button
              onClick={handleRegisterClick}
              className={`group relative px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
                selectedRole === "student"
                  ? "bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-2xl hover:shadow-blue-500/25"
                  : "bg-gradient-to-r from-purple-500 to-pink-500 hover:shadow-2xl hover:shadow-purple-500/25"
              }`}
            >
              <span className="relative z-10">Register as {selectedRole === "student" ? "Student" : "Teacher"}</span>
              <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          ) : (
            <p className="text-gray-400 text-center">Select a role to continue</p>
          )}
        </div>

        {/* Login Option */}
        {walletAddress && (
          <div className="m-8 text-center">
            <p className="text-gray-400 mb-4">Already have an account?</p>
            <button className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300 underline underline-offset-4">
              Login with Wallet
            </button>
          </div>
        )}

      <div ref={registerRef}>
        {showRegister && (
          <section className="max-w-xl mx-auto bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-6">Registration Form</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-2 rounded bg-black border border-white/10"
                required
              />
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Department"
                className="w-full p-2 rounded bg-black border border-white/10"
                required
              />
              <select
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full p-2 rounded bg-black border border-white/10"
                required
              >
                <option value="">Select Year</option>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email ID"
                className="w-full p-2 rounded bg-black border border-white/10"
                required
              />
              <input
                type="text"
                name="collegeId"
                value={formData.collegeId}
                onChange={handleChange}
                placeholder="College ID"
                className="w-full p-2 rounded bg-black border border-white/10"
                required
              />
              <input
                type="text"
                name="wallet"
                value={walletAddress}
                readOnly
                className="w-full p-2 rounded bg-black border border-white/10 text-gray-400"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-4 py-2 w-full rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="w-4 h-4 animate-spin"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
                      />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </button>

            </form>
          </section>
        )}
      </div>

        {/* Footer */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-6 text-xs text-gray-500">
          <button className="hover:text-white transition-colors duration-300">Privacy</button>
          <button className="hover:text-white transition-colors duration-300">Terms</button>
          <button className="hover:text-white transition-colors duration-300">Help</button>
        </div>
      </div>
    </div>
  )
}
