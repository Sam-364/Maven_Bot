"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
const BotChat = (props) => {
  console.log(props.image);
  return (
    <>
      <div className="w-full h-fit">
        <div className="w-[90%] self-start h-fit border-2 border-blue-900 rounded-t-lg rounded-br-xl my-2 ml-2 text-sm p-2">
          {props.message}
        </div>
        {props.image !== [] ? (
          <div className="w-[90%] self-start h-[20%] flex flex-row flex-wrap">
            {props.image.map((i) => {
              return (
                <Link
                  href={`http://localhost:3000/product/${i[1]}`}
                  className="w-1/4"
                >
                  <img src={i[0]} />
                </Link>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

const UserChat = (props) => {
  return (
    <>
      <div className="w-[90%] self-end h-fit border-2 border-blue-900 rounded-t-lg rounded-bl-xl my-2 mr-2 text-sm p-2">
        {props.message}
      </div>
    </>
  );
};

const ChatBot = (props) => {
  const [sessionchat, setSessionchat] = useState([]);
  const [currentprompt, setCurrentprompt] = useState("");
  const sendPrompt = async () => {
    const prompt = currentprompt;
    setCurrentprompt("");
    const response = await axios.post("http://127.0.0.1:8000/sendPrompt/", {
      prompt: prompt,
    });
    setSessionchat([
      ...sessionchat,
      { sender: "User", message: prompt },
      {
        sender: "Bot",
        message: response.data.response,
        image: response.data.product,
      },
    ]);
  };
  const initiateChat = async () => {
    const response = await axios.post("http://127.0.0.1:8000/sendPrompt/", {
      prompt: `Hey I am ${props.user.username}`,
    });
    setSessionchat([
      {
        sender: "Bot",
        message: `Hey ${props.user.username}, I am Maven, your Personalised Fashion Outfit Generator based on your preferences. You may ask me for suggestions for whatever you want to try today`,
      },
      {
        sender: "Bot",
        message: response.data.response,
        image: response.data.product,
      },
    ]);
    if (props.clicked === true) {
      const resp = await axios.post("http://127.0.0.1:8000/sendPrompt/", {
        prompt: `I currently like ${props.clickedOn}`,
      });
      setSessionchat([
        {
          sender: "Bot",
          message: `Hey ${props.user.username}, I am Maven, your Personalised Fashion Outfit Generator based on your preferences. You may ask me for suggestions for whatever you want to try today`,
        },
        {
          sender: "Bot",
          message: response.data.response,
          image: response.data.product,
        },
        {
          sender: "Bot",
          message: resp.data.response,
          image: resp.data.product,
        },
      ]);
    }
  };
  useEffect(() => {
    initiateChat();
  }, [props.user]);
  return (
    <div className="w-1/4 h-2/3 pr-2 bg-transparent absolute bottom-0 right-0 flex flex-col justify-end items-end text-black overflow-y-hidden">
      {props.ischatbotvisible ? (
        <div className="w-full h-[80%] rounded-s-sm bg-white border-4 border-blue-900 rounded-t-xl rounded-bl-xl mb-4">
          {props.isloggedin ? (
            <>
              <div className="w-full h-[87%] flex flex-col justify-start items-center overflow-y-scroll">
                {sessionchat &&
                  sessionchat.map((chat) => {
                    console.log(chat);
                    if (chat["sender"] == "Bot") {
                      return (
                        <BotChat
                          message={chat.message}
                          image={chat.image ? chat.image : []}
                        />
                      );
                    } else {
                      return <UserChat message={chat.message} />;
                    }
                  })}
              </div>
              <div className="w-full h-[12%] flex justify-center items-center text-sm border-2 border-blue-900 rounded-full">
                <input
                  type="text"
                  className="w-[90%] h-[90%] rounded-full"
                  value={currentprompt}
                  onChange={(e) => {
                    setCurrentprompt(e.target.value);
                  }}
                />
                <button
                  type="submit"
                  onClick={() => {
                    setSessionchat([
                      ...sessionchat,
                      { sender: "User", message: currentprompt },
                    ]);
                    sendPrompt();
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/8443/8443811.png"
                    className="w-[30px]"
                  />
                </button>
              </div>
            </>
          ) : (
            <>Please Log In</>
          )}
        </div>
      ) : (
        <></>
      )}
      <div className="w-full h-[15%] flex justify-end pr-8 items-center">
        <div
          className="w-[75px] h-[75px] bg-white rounded-full border-4 border-blue-900 flex justify-center items-center cursor-pointer hover:bg-slate-300 transition-all"
          onClick={() => {
            props.setIschatbotvisible(!props.ischatbotvisible);
          }}
        >
          <img
            className="w-full pl-2"
            src="https://s3-alpha-sig.figma.com/img/5f4d/2929/68692016db22fdebd764ae335010363f?Expires=1693180800&Signature=hHybCh7cKBHPCcKw71XCcmEZ~Kg5QHk~RlITfxOmkInep2Pgj~-bA1eTiIrqZA6C7m0er5BYqhZn~xwHpHTKvfIEjn89eS1gIQcYsKU5op7ubbqBSeFHjGu4EDw9RlLISs~ivx9zDB8T7EzpGeVEsV3EXzyne3AmELrHgd6LmKrj4JsnIINxtQqxp7OGVLn3i1AAFa6cn1fnpw-oufXRCjZf~ChpoWxz0CVqJEL30Os5bat4nCpCnR2dVMdJ0oUwDYI4UPw8d3kSKVztTLoEzwmAO7a4ZVNYkK9aLMnnpsUf1~mpghw-cQ73GpDU1V~PplzC6bO3mADMqsLIcIrNWA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4"
          />
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
