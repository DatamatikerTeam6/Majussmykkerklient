import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "../components/button/Button";
import { Heading } from "../components/heading/Heading";
import { useNavigate } from "react-router-dom";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber ] = useState("+4553387124"); // Tilføjet til OTP
  const [otp, setOtp] = useState(""); // OTP-input
  const [isOtpSent, setIsOtpSent] = useState(false); // Status for OTP
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    
    event.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Reset error message before login attempt
    try {
      const response = await fetch("https://localhost:7187/api/Accounts/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        localStorage.setItem("token", token);

        // Send OTP efter login
        const otpResponse = await fetch("https://localhost:7187/send-otp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ phoneNumber }), // Sender telefonnummer
        });

        if (otpResponse.ok) {
          setIsOtpSent(true); // Skift til OTP-verifikation
          alert("OTP sendt til dit telefonnummer.");
        } else {
          const errorData = await otpResponse.json();
          console.error("OTP fejl:", errorData);
          setErrorMessage(`Kunne ikke sende OTP. Fejl: ${errorData.message || "Ukendt fejl"}`);
        }
      } else {
        const errorData = await response.json(); // Parse login fejl responsen
        setErrorMessage(`Forkert email eller kodeord. Fejl: ${errorData.message || "Ukendt fejl"}`);
      }
    } catch (error) {
      
      console.error("Login fejl:", error);
      setErrorMessage(`En fejl opstod under OTP-verifikation. Fejl: ${error.message || "Ukendt fejl"}`);
      
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Reset error message before OTP verification attempt
    try {
      const otpResponse = await fetch("https://localhost:7187/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber, code: otp }),
      });

      if (otpResponse.ok) {
        alert("Login og OTP-verifikation succesfuld!");
        // Redirect eller yderligere handlinger efter login og OTP
        navigate('/calendar'); // Omdiriger til Calendar.js
        window.location.reload();
      } else {
        const errorData = await otpResponse.json(); // Parse OTP fejl responsen
        setErrorMessage(`OTP-verifikation fejlede. Fejl: ${errorData.message || "Ukendt fejl"}`);
      }
    } catch (error) {
      console.error("OTP-verifikation fejl:", error);
      setErrorMessage("En fejl opstod under OTP-verifikation. Prøv igen.");
    } finally {
      setLoading(false);    
    }
  };

  return (
    <>
      <Helmet>
        <title>User Login - Access Your Account</title>
        <meta
          name="description"
          content="Log in to your account using your email and password. Secure and easy access to manage your account and services."
        />
      </Helmet>
      <div className="flex w-full flex-col items-start justify-center gap-16 bg-white-a700 py-[146px] pl-[690px] pr-14 lg:px-0">
        <Heading
          size="texts"
          as="h1"
          className="ml-[90px] text-[64px] font-medium tracking-[-1.41px] text-gray-900 lg:text-[48px] md:ml-0 md:text-[48px]"
        >
          Log ind
        </Heading>
        {!isOtpSent ? (
          <form onSubmit={handleLogin} className="w-[46%] lg:w-full md:w-full">
            <div className="mb-[244px] mt-16 flex flex-col items-start gap-[76px] lg:gap-[57px] md:gap-[57px] sm:gap-[38px]">
              <div className="flex flex-col items-start justify-center self-stretch">
                <Heading as="h2" className="text-[20px] font-medium tracking-[-0.22px] text-black-900 lg:text-[17px]">
                  Email
                </Heading>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="h-[54px] w-[76%] rounded border-solid border-black-900"
                />
              </div>

              <div className="flex flex-col items-start justify-center self-stretch">
                <Heading as="h3" className="text-[20px] font-medium tracking-[-0.22px] text-black-900 lg:text-[17px]">
                  Kodeord
                </Heading>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  required
                  className="h-[54px] w-[76%] rounded border-solid border-black-900"
                />
              </div>

              <div className="flex flex-col items-start justify-center self-stretch">
                <Heading as="h3" className="text-[20px] font-medium tracking-[-0.22px] text-black-900 lg:text-[17px]">
                  Telefonnummer (til OTP)
                </Heading>
                <input
                  type="text"
                  value={phoneNumber}                                    
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  required
                  className="h-[54px] w-[76%] rounded border-solid border-black-900"
                  placeholder="+45XXXXXXXX"
                />
              </div>

              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <div>
                <Button
                  shape="round"
                  className="ml-[134px] min-w-[126px] rounded px-[30px] tracking-[-0.44px] sm:ml-0 sm:px-4"
                  type="submit"
                  disabled={loading} // Disable button while loading
                >
                  {loading ? "Logger ind..." : "Log ind"}
                </Button>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="w-[46%] lg:w-full md:w-full">
            <div className="mb-[244px] mt-16 flex flex-col items-start gap-[76px] lg:gap-[57px] md:gap-[57px] sm:gap-[38px]">
              <Heading as="h2" className="text-[20px] font-medium tracking-[-0.22px] text-black-900 lg:text-[17px]">
                Indtast OTP
              </Heading>
              <input
                type="text"
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
                required
                className="h-[54px] w-[76%] rounded border-solid border-black-900"
              />
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              <div>
                <Button
                  shape="round"
                  className="ml-[134px] min-w-[126px] rounded px-[30px] tracking-[-0.44px] sm:ml-0 sm:px-4"
                  color = "cyan_100"
                  type="submit"
                  disabled={loading} // Disable button while loading
                >
                  {loading ? "Bekræfter..." : "Bekræft OTP"}
                </Button>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
