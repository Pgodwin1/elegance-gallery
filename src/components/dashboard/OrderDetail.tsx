import React, { useEffect, useState } from "react";
import { HiArrowLongLeft } from "react-icons/hi2";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from '../../Service/axios';
import { useParams } from "react-router";
import { Order, User } from "./Order";
import { Art, Artist } from "./helper/Card";



  

const OrderDetail = () => {
  const role = localStorage.getItem("role");
  const { id } = useParams();
  const [order, setOrder] = useState<Order>()
  const [user, setUser] = useState <User>()
  const [art, setArt] = useState <Art>()
  const [artist, setArtist] = useState <Artist>()
    useEffect(() => {
      if(role == "Artist"){
        console.log(id)
        axios.get(`/artist/get-one-order/${id}`).then((res)=>{
            setOrder(res.data.order)
            setUser(res.data.user)
            setArt(res.data.art)
            console.log("orders...",res.data.order)
        }).catch((error)=> console.log(error))
      }else{
        console.log(id)
        axios.get(`/users/get-one-user-order/${id}`).then((res)=>{
            setOrder(res.data.order)
            setUser(res.data.user)
            setArt(res.data.art)
            setArtist(res.data.artist)
            console.log("orders...",res.data.artist)
        }).catch((error)=> console.log(error))
      }
},[id,role])
    
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    const time = new Date(order?.createdAt).toLocaleDateString('en-GB', options)
    console.log(time)
  return (
    <Main>
      <Link to={"/dashboard/order"}>
        <h1>
          <HiArrowLongLeft />
        </h1>
      </Link>

      <First>
        <h2>Order details</h2>
        <Spanned>
          <Detail>

            {/* Render if role is equal to Artist */}
           {role == "Artist" ? <h3>Buyer:</h3>:""}
            {role == "Artist" ?<Buyer>
                <div className="buyerImg" style={{backgroundImage: `${user?.profilePic}`}}>
                  {/* <img src={order.buyerImg} alt="image" /> */}
                </div>

                <div className="buyerDetails">
                  <span>
                    <p>{user?.firstname+" "+user?.surname}</p>
                  </span>
                  <p>{user?.email}</p>
                </div>
            </Buyer>:""}
          </Detail>
          <Detail>
            Order No: <span>{order?.paymentReference}</span>
          </Detail>
          <Detail>
            Order Date: <span>{time}</span>
          </Detail>
          <Detail>
            Tracking ID: <span>F711060151001</span>
          </Detail>
          <Detail>
            Delivery fee: <span>$2,000</span>
          </Detail>
          <Detail>
            Total: <span>{order?.price}</span>
          </Detail>
        </Spanned>
      </First>
      <Second>
        <h2>Payment & Delivery details</h2>
        <Spanned>
          <Detail>
            Payment Method: <span>Debit Card</span>
          </Detail>
          <Detail>
            Delivery Address:{" "}
            <span>
            {user?.address}
            </span>
          </Detail>
          <Detail>
            Phone Number: <span>{user?.phone}</span>
          </Detail>
        </Spanned>
      </Second>
      <Third>
        <h2>Item details</h2>
        <ImgSpan>
          <div>
            <Img>
              <img src={art?.imageUrl} alt="image" />
            </Img>
          </div>
          <Spanned>
            <h2>Spirit of Nigeria</h2>
            <div>
              <h4>Item Price:</h4>
              <p>{order?.price - 3000}</p>
            </div>

            {/* Render if Role is equal to User */}
            { role == "User" ? <div>
               <h4>Artist:</h4>
              <p>{artist?.firstname+" "+ artist?.surname}</p> 
            </div> :""}
            <div>
              <h4>Quantity:</h4>
              <p>1</p>
            </div>
            <a href="#">Buy Again</a>
          </Spanned>
        </ImgSpan>
      </Third>
    </Main>
  );
};

export default OrderDetail;

 const Buyer = styled.div`
  width: 25%;
  height: 39px;
  gap: 3px;
  display: flex;
  justify-content: space-between;
  /* background-color: red; */

  .buyerImg {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    /* background-color: red; */
    position: relative;
    overflow: hidden;
  }

  /* img {
    object-fit: fill;
    position: absolute;
  } */

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

const Spanned = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: right;

  span {
    color: grey;
  }

  p {
    color: grey;
  }

  a {
    background-color: skyblue;
    text-decoration: none;
    color: blue;
    padding: 10px 5px;
    border-radius: 15px;
    font-size: 15px;
    text-align: center;
  }

  @media (max-width: 768px) {
    text-align: left;
  }
`;

const ImgSpan = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const First = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  border-bottom: 3px solid grey;
  padding-bottom: 20px;

  span {
    font-weight: lighter;
  }
`;

const Second = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  border-bottom: 3px solid grey;
  padding-bottom: 20px;
`;

const Third = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;

  img {
    height: 200%;
    width: 200%;
    background-color: black;
  }
`;

const Img = styled.div`
  width: 130px;
  height: 50%;
`;
const Detail = styled.h3`
  display: flex;
  justify-content: space-between;
  span {
    text-align: right;
    font-weight: lighter;
    width: 20%;
  }
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    gap: 10px;
    justify-content: flex-start;
    span {
      text-align: left;
      width: 40%;
    }
  }
`;

const Main = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  gap: 20px;

  h1 {
    font-size: 70px;
    color: black;
  }
`;
