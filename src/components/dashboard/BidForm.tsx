import React, { useContext, useEffect } from "react";
import { marisPic } from "../../assets/dashboard";
import styled from "styled-components";
import { numberWithCommas } from "./utils";
import { ProductContext } from "../../Service/contextApi/ProductProvider";
import axios from "axios";
import { toast } from "react-toastify";
// import { useParams } from "react-router-dom";
import { UserActions } from "../../store/user";
import { useDispatch, useSelector } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";
import { State } from "./Bid";

const BidForm = ({
  price,
  auctionId,
}: {
  price: number;
  auctionId: string;
}) => {
  // const { productId } = useParams();
  const dispatch = useDispatch();
  const { bidPrice, setBidPrice } = useContext(ProductContext);
    
  const token = localStorage.getItem("token");
  const bidUser = useSelector((state:State) => state.user.bids)
  const loader = useSelector((state:State) => state.user.loading);
  console.log("bidUser", bidUser);

  const addPriceHandler = () => {
    setBidPrice(bidPrice + 1000);
  };
  const subPriceHandler = () => {
    setBidPrice(bidPrice > price ? bidPrice - 1000 : bidPrice);
    console.log(price)
  };

  useEffect(() => {
    console.log("Updated bidPrice:", bidPrice);
    // setBidPrice(price)
  }, [bidPrice]);

  const biddingHandler = async (e) => {
    e.preventDefault();
    dispatch(UserActions.startLoading())
    console.log("Bidding with bidPrice:", bidPrice);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      // Use the updated bidPrice in the API call
      axios
        .post(
          `https://eag-vkis.onrender.com/artwork/create-bids/${auctionId}`,
          { price: bidPrice },
          config
        )
        .then((res) => {
          console.log("response data", res.data);
          toast.success(res.data.msg);
          dispatch(UserActions.endLoading())
          // Handle the response as needed
        })
        .catch((err) => {
          toast.error(err.response.data.error);
          dispatch(UserActions.endLoading())
          console.log(err.response.data.error);
        });
    } catch (error) {
      // Handle errors
      toast.error(error.response.data.error);
      dispatch(UserActions.endLoading())
      console.error(error);
    }
  };


  return (
    <BidContainer>
      <BidSummary>
        <div>
          <h3>Last Bid</h3>
          <h4>
            N
            <span style={{ fontSize: "24px", color: "#EB5757" }}>
              {numberWithCommas(price || 1000)}
            </span>{" "}
            <Avatar src={marisPic} alt="Profile" />
          </h4>
        </div>
        <div>
          <h3>Next Bid</h3>
          <h4>
            N{" "}
            <span style={{ fontSize: "24px", color: "#27AE60" }}>
              {numberWithCommas(bidPrice)}
            </span>
          </h4>
        </div>
      </BidSummary>
      <div>
        <BidArea>
          <CalBtn onClick={subPriceHandler}>-</CalBtn>
          <div>
            <h3>Your Bid</h3>
            <h4>
              N <span style={{ fontSize: "24px" }}>{numberWithCommas(bidPrice)}</span>
            </h4>
          </div>
          <CalBtn onClick={addPriceHandler}>+</CalBtn>
        </BidArea>
        <p style={{ fontSize: "12px", color: "#98A2B3" }}>
          Each increase in N1,000
        </p>
      </div>
      <BidBtn onClick={biddingHandler}>
      <BeatLoader
							color="white"
							loading={loader}
							// cssOverride={override}
							size={25}
							aria-label="Loading Spinner"
							data-testid="loader"
						/>
       {!loader ? <span style={{ fontSize: "18px" }}>Take bid </span> : null}
       <span style={{ fontSize: "12px" }}>N</span>
        {numberWithCommas(bidPrice)} 
      </BidBtn>
    </BidContainer>
  );
};

export default BidForm;

const BidContainer = styled.div`
  text-align: center;
  font-family: "Montserrat";
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Avatar = styled.img`
  width: 15px;
  height: 15px;
  border-radius: 50%;
`;

const BidSummary = styled.div`
  display: flex;
  font-family: "Montserrat";
  justify-content: center;
  gap: 150px;

  h3 {
    font-size: 16px;
    color: #4f4f4f;
  }
  h4 {
    font-weight: 500;
    font-size: 12px;
  }

  @media (max-width: 768px) {
    gap: 100px;
  }
`;

const BidArea = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin-bottom: 10px;

  h3 {
    font-size: 16px;
    color: #4f4f4f;
  }
`;

const CalBtn = styled.button`
  width: 30px;
  height: 30px;
  padding: 5px;
  border-radius: 6px;
  border: 0.5px solid #000000;
  cursor: pointer;
`;

const BidBtn = styled.button`
  width: 100%;
  padding: 15px 50px;
  border-radius: 16px;
  background-color: #0000cd;
  border: 2px solid #9fc7fd;
  color: #ffffff;
  font-weight: 500;
  font-size: 24px;
  letter-spacing: 2px;
  cursor: pointer;
`;
