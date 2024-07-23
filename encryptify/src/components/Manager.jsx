import React, { useRef, useState } from "react";
import { MdAddCard } from "react-icons/md";
import { BiSolidShow } from "react-icons/bi";
import { useEffect } from "react";
import { IoMdCopy } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete } from "react-icons/md";
import { RiEdit2Line } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid';
import { useForm } from "react-hook-form"



// from toastify
const copyText = (text) => {
  toast("🦄 Copied to clipboard", {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
  navigator.clipboard.writeText(text);
};

const Manager = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  // the initial state of the inputs of the form
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);
  // if passwords are present in the local storage retive them
  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);
  // use-ref :used to store references to DOM elements
  const passwordRef = useRef();

  const showPassword = () => {
    if(passwordRef.current.type==="text")
    {
      passwordRef.current.type = "password";
    }
    else{
      passwordRef.current.type = "text";

    }
  };
  // set the passwords while using derefrencing operator
  const savePassword = () => {
    if(form.site.length>3 && form.username.length>3 &&form.password.length>3 )
    {
      setPasswordArray([...passwordArray, {...form,id:uuidv4()}])
      localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form,id:uuidv4()}]));
      setform({ site: "", username: "", password: "" })
    }
    else{
      toast(`Error:Password not saved`)
    }
  };

  // delete the password of the particular uuid 
  const deletePassword = (id) => {
    let c=confirm("⚠️Do you want to delete it ?")
    if(c)
    {
      setPasswordArray(passwordArray.filter(item=>item.id!==id))
      localStorage.setItem(passwordArray.filter(item=>item.id!==id)  );
      toast("✔️ Password Deleted !!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const editPassword = (id) => {
    // as this will return an array of only one use [0]
    setform(passwordArray.filter(i=>i.id===id)[0])
    setPasswordArray(passwordArray.filter(item=>item.id!==id))
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
  };
  // onchange function  the value in the input it stays there
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />

      <div className=" md:mycontainer min-h-[90vh] text-white ">
        <h1 className="text-4xl font-bold text-center">
          {" "}
          &lt;
          <span className="text-purple-200 text-2xl">Encryptify</span>
          /&gt;
        </h1>
        <p className="text-white text-lg text-center">
          Manage your passwords easily{" "}
        </p>
        {/* input form  */}
        <div className="text-black flex flex-col p-4 items-center gap-3">
          <input
          id="site"
            name="site"
            // runs whenever there is a change in the form elements like input , value ...
            onChange={handleChange}
            value={form.site}
            placeholder="Enter webiste URL"
            type="text"
            className="rounded-full border border-purple-900 w-full px-3 py-1"
          />
          <div className="  flex w-full justify-between gap-3">
            <input
            id="username"
              name="username"
              onChange={handleChange}
              value={form.username}
              placeholder="Enter Username"
              type="text"
              className="rounded-full border border-purple-900 w-full px-3 py-1"
            />
            <div className="relative">
              <input
              id="password"
                ref={passwordRef}
                name="password"
                onChange={handleChange}
                value={form.password}
                placeholder="Enter Password"
                type="password"
                className="rounded-full border border-purple-900 w-full px-3 py-1"
              />
              <span
                className="absolute right-0 top-1 font-bold text-2xl cursor-pointer "
                onClick={showPassword}
              >
                {" "}
                <BiSolidShow />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="justify-center flex items-center gap-1 rounded-lg bg-purple-950 py-2 px-2 w-fit hover:bg-purple-900 text-white"
          >
            <span className="font-bold text-3xl">
              <MdAddCard />
            </span>
            Add Password
          </button>
        </div>

        <div className="passwords ">
          <h2 className="py-4 font-bold text-2xl justify-center items-center">Your Passwords </h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full rounded-lg overflow-hidden items-center ">
              <thead className=" bg-purple-950 ">
                <tr>
                  <th className="py-2">Site</th>
                  <th className="py-2">UserName</th>
                  <th className="py-2">Password</th>
                  <th className="py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-purple-100 text-purple-950 font-semibold">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="text-center min-w-32 py-2 flex items-center justify-center">
                        <a href={item.site} target="_blank">
                          {item.site}
                        </a>
                        {/* have ot give arrow function otherwise will run everytime it renders  */}
                        <span
                          onClick={() => {
                            copyText(item.site);
                          }}
                          className="cursor-pointer w-5 text-2xl font-extrabold"
                        >
                          <IoMdCopy />
                        </span>
                      </td>
                      <td className="text-center min-w-32 py-2 ">
                        {item.username}
                      </td>
                      <td className="text-center min-w-32 py-2">
                        {item.password}
                      </td>
                      <td className=" flex mx-3 gap-5  items-center min-w-32 py-2 ">
                        <span onClick={()=>{editPassword(item.id)}}className=" mx-7 w-3 cursor-pointer text-2xl "><RiEdit2Line /></span>
                        {/* delete  */}
                        <span onClick={()=>{deletePassword(item.id)}} className="w-5 text-2xl cursor-pointer "><MdDelete /></span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
