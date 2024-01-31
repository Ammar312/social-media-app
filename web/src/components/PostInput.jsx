import React, { useContext, useState } from "react";
import ContentWrapper from "./ContentWrapper";
import { GlobalContext } from "../context/context";
import { Modal } from "antd";
import "./style.css";
import { Link } from "react-router-dom";

const PostInput = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [showModal, setShowModal] = useState(false);
  const firstName = state.user.firstName;
  const fullName = `${state.user.firstName} ${state.user.lastName}`;
  const handleCancel = () => {
    setShowModal(false);
  };
  return (
    <div className="my-4 max-w-md mx-auto">
      <ContentWrapper>
        <div>
          <div className="rounded-md shadow-xl bg-white flex items-center gap-4 h-24">
            <div>
              <img
                src="https://images.pexels.com/photos/2389476/pexels-photo-2389476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
                width={50}
                height={50}
                className="rounded-full"
              />
            </div>
            <div
              className="bg-slate-200 px-10 py-2 rounded-full text-xl cursor-pointer"
              onClick={() => setShowModal(true)}
            >{`What's on your mind, ${firstName}?`}</div>
          </div>
        </div>
      </ContentWrapper>

      <Modal
        open={showModal}
        onCancel={handleCancel}
        title="Create Post"
        footer={null}
      >
        <div className="">
          <div className="flex gap-2 my-3">
            <Link to={`/profile/${state.user._id}`}>
              <img
                src="https://images.pexels.com/photos/2389476/pexels-photo-2389476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
                width={40}
                height={40}
                className="rounded-full"
              />
            </Link>
            <p className="font-semibold text-[18px]">{fullName}</p>
          </div>
          <textarea
            name=""
            id=""
            cols="30"
            rows="5"
            placeholder={`What's on your mind, ${firstName}?`}
            className="border-2 w-full outline-none resize-none text-2xl"
          ></textarea>
          <button className="w-full p-[5px] rounded-lg text-lg bg-blue-600 text-white cursor-pointer font-medium mt-4 hover:bg-blue-700">
            Post
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PostInput;
