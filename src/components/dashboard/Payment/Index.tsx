/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { timeIcon, arrowLeft } from "../../../assets/dashboard";
import { Link, useParams } from "react-router-dom";
import { TbCurrencyNaira } from "react-icons/tb"
import Shipping from "./Shipping";
import { Art } from "../helper/Card";
import { ProductContext } from "../../../Service/contextApi/ProductProvider";
import { useSelector } from "react-redux";
import { formatDate, numberWithCommas } from "../utils";

const Payment = () => {
  // const { arts } = useUserContext();
  const status = useSelector((state:any) => state.user.payStatus)as boolean
    

  const { products } = useContext(ProductContext);

  // const [drop, setDrop] = useState(true)
  const [add, setAdd] = React.useState<Art[]>([]);

  console.log(add)
  const { atId } = useParams();
  console.log(atId)

  useEffect(() => {
    const carts = localStorage.getItem("carts");
    if (carts) {
      setAdd(JSON.parse(carts));
    }
  }, []);

  const product = products.find((p) => p.id === atId);
  console.log(product)
  if (!product) {
    return <p>Product not found</p>;
  }
  
  const { artName, price, imageUrl, createdAt } = product;


  // const handleNextButtonClick = () => {
  //   // Toggle the state to switch between PaymentInfo and Shipping components
  //   setDrop(status);
  // };


  return (
    <div>
      <Link to="/dashboard/wishlist">
        <img
          src={arrowLeft}
          alt=""
          style={{ margin: "10px 20px", cursor: "pointer" }}
        />
      </Link>
      {/* <CartDetails /> */}
      <DetailContainer>
        <DetailInfo>
          <h3>Popular Art</h3>
          <img src={imageUrl} alt="" />
          <h1>{artName}</h1>
          <FlexIcon>
            <img src={timeIcon} alt="Time icon" />
            <span>{formatDate(createdAt)}</span>
          </FlexIcon>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            <h2 style={{ color: "gray" }}>Summary</h2>
            <Butt>
              <h3>Order</h3>
              <h3><TbCurrencyNaira />{numberWithCommas(price)}</h3>
            </Butt>
            <Butt>
              <h3>Tax</h3>
              <span>N1,000</span>
            </Butt>
            <Butt>
              <h3>Delivery</h3>
              <span>N2,000</span>
            </Butt>
          </div>

          <div
            style={{
              textAlign: "center",
              display: "flex",
              gap: "7px",
              justifyContent: "center",
              alignItems: "center",
              color: "green",
            }}
          >
            <h3>Total:</h3>
            <h2><TbCurrencyNaira />{numberWithCommas(price + 3000)}</h2>
          </div>
        </DetailInfo>
        <DetailInfo2>
          <div
            style={{
              border: "1px solid var(--Grey-300, #D0D5DD)",
              padding: "10px 10px",
              marginTop: "30px",
              borderRadius: "8px",
              fontFamily: "Montserrat Alternates",
              fontStyle: "normal",
              fontWeight: "500",
              display: "inline-flex",
              height: "600px",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                paddingBottom: "1px",
                width: "100%",

              }}
            >
              {/* <p onClick={()=> setDrop(true)} className={!status ? "toggle active" : "toggle"}>
                Payment Info
              </p> */}
              <p 
               className={status ? "toggle active" : "toggle"}>Shipping Address</p>
            </div>
            <Shipping/>
            {/* {status  ? <Shipping/> : <PaymentInfo onNextButtonClick={handleNextButtonClick}/> } */}
            
          </div>
        </DetailInfo2>
      </DetailContainer>
    </div>
  );
};



const DetailContainer = styled.div`
  width: 85%;
  display: flex;
  justify-content: space-between;
  margin: 20px;
  margin-top: -5px;
  gap: 5px;
  height: auto;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 50%;
  h1{
    margin-top: -5px;
  }

  @media screen and (max-width:600px){
  width: 100%;
}

`;

const DetailInfo2 = styled.div`
  display: flex;
  flex-direction: column;
  width: 41%;
  gap: 20px;

  .toggle{
  
  padding: 5px;
  font-size: 18px;
  font-style: normal;
  font-weight: 500;
  cursor: pointer;
}

.active{
  color: #0000CD;
  border-bottom: solid 1px blue;
}

@media screen and (max-width:600px){
  width: 100%;
}
`;

const FlexIcon = styled.div`
	display: flex;
	align-items: center;
	gap: 5px;
	margin-top: -25px;
  color: gray;
`;

const Butt = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: -5px;

  span{
    color: gray;
  }
`;



export default Payment;
