import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";

export const EmailForm = () => {
  const [accept, setAccept] = useState(false);
  const [data, setData] = useState({
    email: "",
    name: "",
    subject: "",
    message: "",
  });
  const form = useRef();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const sendEmail = (e) => {
    e.preventDefault();

    const emailData = {
      to_email: data.email,  
      subject: data.subject,
      name: data.name,
      email: data.email,
      message: data.message,
    };

    emailjs
      .send(
        "service_dbvy41w",  
        "template_b2fzyfh",  
        emailData,           
        {
          publicKey: "TdpAl7R-CphAOIxi6",  
        }
      )
      .then((response) => {
        Toast.fire({
          icon: "success",
          color: "#fff",
          background: "#1e9fe3",
          title: "Email sent successfully!",
        });
        setData({
          email: "",
          name: "",
          subject: "",
          message: "",
        });
        setAccept(false);
      })
      .catch((error) => {
        Toast.fire({
          icon: "error",
          color: "#fff",
          background: "#1e9fe3",
          title: `Error sending email: ${error}`,
        });
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newData = { ...data, [name]: value };
    setData(newData);

    if (
      newData.email !== "" &&
      newData.message !== "" &&
      newData.name !== "" &&
      newData.subject !== ""
    ) {
      setAccept(true);
    } else {
      setAccept(false);
    }
  };

  return (
    <div className="m-auto px-4 mt-4 mb-8" id="connectMe">
      <h1 className="text-2xl font-semibold">Send Email to me</h1>
      <form ref={form} onSubmit={sendEmail} className="mt-10">
        <div className="container mx-auto px-4 justify-center text-center">
          <div>
            <label
              htmlFor="user_email"
              className="block text-start ms-0 sm:ms-[20%] mb-2 text-white font-bold"
            >
              Email:
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              required
              className="w-full sm:w-[60%] bg-[#000000] py-3 px-4 rounded-md mb-4 border-2"
              value={data.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="user_name"
              className="block text-start ms-0 sm:ms-[20%] mb-2 text-white font-bold"
            >
              Name:
            </label>
            <input
              name="name"
              type="text"
              placeholder="Enter name"
              required
              className="w-full sm:w-[60%] bg-[#000000] py-3 px-4 rounded-md mb-4 border-2"
              value={data.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="user_subject"
              className="block text-start ms-0 sm:ms-[20%] mb-2 text-white font-bold"
            >
              Subject:
            </label>
            <input
              name="subject"
              type="text"
              placeholder="Enter subject"
              required
              className="w-full sm:w-[60%] bg-[#000000] py-3 px-4 rounded-md mb-4 border-2"
              value={data.subject}
              onChange={handleChange}
            />
          </div>
          <textarea
            name="message"
            placeholder="Write message..."
            required
            className="w-full sm:w-[60%] bg-[#000000] py-3 px-4 rounded-md mb-4 border-2 h-[200px]"
            value={data.message}
            onChange={handleChange}
          ></textarea>
          <button
            disabled={!accept}
            type="submit"
            className={`w-full sm:w-[60%] items-start text-white py-3 rounded-full ${
              accept
                ? "bg-gradient-to-t from-blue-500 to-cyan-500 hover:from-blue-700 hover:to-cyan-700"
                : "bg-gradient-to-t from-gray-500 to-zinc-500"
            }`}
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};
