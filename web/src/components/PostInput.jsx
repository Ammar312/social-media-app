import React, { useContext, useState } from "react";
import ContentWrapper from "./ContentWrapper";
import { GlobalContext } from "../context/context";
import { Modal } from "antd";

const PostInput = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const [showModal, setShowModal] = useState(false);
  const firstName = state.user.firstName;
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
              className="bg-slate-200 px-10 py-2 rounded-full text-xl"
              onClick={() => setShowModal(true)}
            >{`What's on your mind, ${firstName}?`}</div>
          </div>
        </div>
      </ContentWrapper>

      <Modal open={showModal} onCancel={handleCancel}></Modal>
    </div>
  );
};

export default PostInput;
