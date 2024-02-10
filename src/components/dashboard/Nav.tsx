import React, { useState } from "react";
import styled from "styled-components";
import { useUserContext } from "../../Service/contextApi/UserProvider";
import { notification, logo, dp } from "../../assets/dashboard";
import { FaTimes, FaBars } from "react-icons/fa";
import SearchInput from "./helper/Search";
import NotificationModal from "./NotificatinModal";

const Nav = () => {
  const localName = localStorage.getItem("username");
  const pic = localStorage.getItem("profilePic");
  console.log(localName);
  const { showDrawer, showDrawerHandle } = useUserContext();
  console.log(showDrawer);

  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
    document.body.classList.toggle("active-modal");
  };

  const closeModal = () => {
    setModal(false);
  };


  // Add an event listener to detect clicks outside the modal

  return (
    <>
     <Navbar>
      <Hamburger>
        {showDrawer ? (
          <FaTimes onClick={showDrawerHandle} />
        ) : (
          <FaBars onClick={showDrawerHandle} />
        )}
      </Hamburger>
      <Logo onClick={showDrawerHandle}>
        <img src={logo} alt="logo" height="100%" width="100%" />
      </Logo>
      <SearchInput />
      <Profile>
        <img onClick={toggleModal} src={notification} alt="Notification" />
        <ProfileAvatar src={pic !== "null" ? pic : dp} alt="Profile" />
        <ProfileSpan>{localName}</ProfileSpan>
      </Profile>

    </Navbar>
          {modal && <NotificationModal onClose={closeModal} />}

    </>
   
  );
};

export default Nav;

// export const Buyer = styled.div`
//   width: 100%;
//   height: 48px;
//   gap: 10px;
//   margin-top: 9px;
//   display: flex;
  
//   .buyerImg {
//     width: 25%;
//     height: 100%;
//     border-radius: 50%;
//     position: relative;
//     overflow: hidden;
//   }

//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: cover;
//     object-position: center;
//     display: block;
//   }

//   span {
//     font-size: 16px;
//     font-family: "Montserrat", sans-serif;
//     line-height: 19.5px;
//     font-weight: 500;
//   }

//   p {
//     font-size: 14px;
//     font-family: "Montserrat", sans-serif;
//   }
// `;

const Navbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px 20px 20px;
  background: #fff;
  /* color: #fff; */
  position: fixed;
  z-index: 100;
  width: 100%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  position: relative;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Hamburger = styled.span`
  display: none;
  font-size: 30px;
  vertical-align: middle;
  cursor: pointer;
  @media (max-width: 768px) {
    display: block;
  }
`;

const Logo = styled.h1`
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const ProfileSpan = styled.span`
  display: block;
  @media (max-width: 768px) {
    display: none;
  }
`;

const ProfileAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
`;
