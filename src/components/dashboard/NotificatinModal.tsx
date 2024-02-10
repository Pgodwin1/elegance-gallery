import React, { useState } from "react";
import styled from "styled-components";
import Pic from "../../assets/profile pic.jpeg";
import avata from "../../assets/avatar.png";

interface Props {
  onClose: () => void;
}

const details = [
  {
    id: 1,
    name: "Gideon Arinzechukwu",
    message: "published a new art titled Father and Son",
    artName: "Father and Son",
    time: "15:49",
    imageUrl: Pic,
  },
  {
    id: 2,
    name: "KayCee Ezeanwe",
    message: "published a new art titled Father and Son",
    artName: "Mother and Daughter",
    time: "17:02",
    imageUrl: avata,
  },
  {
    id: 3,
    name: "Shawn Okhakhayo",
    message: "published a new art titled Father and Son",
    artName: "Father and Son",
    time: "1:49",
    imageUrl: Pic,
  },
  {
    id: 4,
    name: "Ebuxtain Onwumelu",
    message: "published a new art titled Father and Son",
    artName: "Father and Son",
    time: "2:30",
    imageUrl: Pic,
  },
  {
    id: 5,
    name: "Stella Wendu",
    message: "published a new art titled Father and Son",
    artName: "Father and Son",
    time: "00:49",
    imageUrl: Pic,
  },
  {
    id: 6,
    name: "Sexy Bobo",
    message: "published a new art titled Father and Son",
    artName: "Father and Son",
    time: "00:49",
    imageUrl: Pic,
  },
  {
    id: 7,
    name: "Anyi Dollar",
    message: "published a new art titled Father and Son",
    artName: "Father and Son",
    time: "00:49",
    imageUrl: Pic,
  },
  {
    id: 8,
    name: "Investor Paully",
    message: "published a new art titled Father and Son",
    artName: "Father and Son",
    time: "00:49",
    imageUrl: Pic,
  },
];
const NotificationModal = ({ onClose }: Props) => {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
    document.body.classList.toggle("active-modal");
  };

  return (
    <>
      <Backdrop onClick={onClose}></Backdrop>
      <Modal className="modal">
        <div onClick={toggleModal} className="overlay"></div>
        <div className="modal-content">
          <p className="notify">Notification</p>
          <input type="search" placeholder="search"></input>

          {details.map((detail) => (
            <Buyer className="Info" key={detail.id}>
              <div className="buyerImg">
                <img src={detail.imageUrl} alt="" />
              </div>
              <div className="details">
                <p>
                  {detail.name} published a new art titled {detail.artName}
                </p>
              </div>
              <div className="date">
                <p>{detail.time}</p>
              </div>
            </Buyer>
          ))}
        </div>
      </Modal>
    </>
  );
};
export default NotificationModal;

const Modal = styled.div`
  width: 370px;
  height: 380px;
  padding: 15px;
  margin-top: 470px;
  margin-left: 1200px;
  /* margin: 9px 50px; */
  border-radius: 10px;
  background-color: #fff;
  position: absolute;
  overflow-y: auto; /* Enable vertical scrolling */
  max-height: 80vh;
  z-index: 10;

  @media screen and (max-width: 640px) {
    /* width: 100%; */
    width: 85%;
    height: 348px;
    padding: 15px;
    margin-top: 462px;
    margin-left: 17px;
    border-radius: 14px;
    background-color: #fff;
    position: absolute;
    overflow-y: auto;
    max-height: 72vh;
    z-index: 10;
  }

  .nofify {
    font-size: 18px;
  }

  .overlay {
    width: 100vw;
    height: 100vh;
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(49, 49, 49, 0.8);
  }

  input {
    width: 100%;
    height: 40px;
    border-radius: 10px;
    border: none;
    padding: 10px;
    margin-bottom: 10px;
  }
`;

 const Buyer = styled.div`
  width: 100%;
  height: 48px;
  gap: 10px;
  margin-top: 9px;
  display: flex;
  cursor: pointer;

  .buyerImg {
    width: 32%;
    height: 96%;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }

  span {
    font-size: 16px;
    font-family: "Montserrat", sans-serif;
    line-height: 19.5px;
    font-weight: 500;
  }

  p {
    font-size: 14px;
    font-family: "Montserrat", sans-serif;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;