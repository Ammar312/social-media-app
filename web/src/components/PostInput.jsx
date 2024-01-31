import React, { useContext, useState } from "react";
import ContentWrapper from "./ContentWrapper";
import { GlobalContext } from "../context/context";
import { Modal } from "antd";
import { FaImages } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import "./style.css";
import { Link } from "react-router-dom";

const PostInput = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [showModal, setShowModal] = useState(false);
  const [img, setImg] = useState(null);
  const firstName = state.user.firstName;
  const fullName = `${state.user.firstName} ${state.user.lastName}`;
  const handleCancel = () => {
    setShowModal(false);
    setImg(null);
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
            rows="3"
            style={{ overflow: "hidden" }}
            placeholder={`What's on your mind, ${firstName}?`}
            className={` w-full outline-none resize-none ${
              img ? "text-lg" : "text-2xl"
            }`}
          ></textarea>
          <label htmlFor="postImg" className=" flex justify-end cursor-pointer">
            {!img && <FaImages className="text-green-500 text-4xl" />}
            <input
              type="file"
              id="postImg"
              className="hidden"
              accept="image/*"
              onChange={(e) => {
                const base64URL = URL.createObjectURL(e.target.files[0]);
                setImg(base64URL);
              }}
            />
          </label>
          {img && (
            <div className="h-[190px] overflow-auto relative">
              <span
                className="text-3xl absolute right-0 bg-white rounded-full p-[2px] cursor-pointer "
                onClick={() => setImg(null)}
              >
                <RxCross2 />
              </span>
              <img src={img} className=" w-full  object-cover" />
            </div>
          )}
          <button className="w-full p-[5px] rounded-lg text-lg bg-blue-600 text-white cursor-pointer font-medium mt-4 hover:bg-blue-700">
            Post
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default PostInput;
