import React, { useContext } from "react";
import ContentWrapper from "./ContentWrapper";
import { GlobalContext } from "../context/context";

const PostInput = () => {
  const { state, dispatch } = useContext(GlobalContext);
  const firstName = state.user.firstName;
  return (
    <div className="my-4 max-w-xs mx-auto">
      <ContentWrapper>
        <div>
          <div className="rounded-md shadow-xl bg-white flex items-center">
            <div>
              <img
                src="https://images.pexels.com/photos/2389476/pexels-photo-2389476.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
                width={60}
                height={60}
                className="rounded-full"
              />
            </div>
            <div>{`What's on your mind, ${firstName}?`}</div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default PostInput;
