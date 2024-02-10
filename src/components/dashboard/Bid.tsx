import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { loveIcon, marisPic, arrowLeft } from "../../assets/dashboard";
import { numberWithCommas } from "./utils";
import { Link, useParams } from "react-router-dom";
import { ProfileAvatar, FlexIcon } from "./helper/styles";
import BidForm from "./BidForm";
import { ProductContext } from "../../Service/contextApi/ProductProvider";
// import { toast } from "react-toastify";
import axios from "../../Service/axios";
import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "../../store/user";

export interface User {
  loading: boolean;
  payStatus:boolean;
  bids:[];
}

export interface State {
  user:User;
}

const Bid = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [bids, setBids] = useState([])
  const bidUser = useSelector((state: State) => state.user.bids);
  const loader = useSelector((state: State) => state.user.loading);
  console.log(bidUser)
  // console.log("bid live", liveArtwork);
  // console.log("bid id", productId);
  const { liveArtwork } = useContext(ProductContext);

  const data = liveArtwork.find((p) => p.id === productId);
  console.log(data?.artwork, "message");
  // const runner = () => {
  //   axios
  //       .get(`http://localhost:5000/artwork/list-bids/${artId}`)
  //       .then((res) =>{
  //         console.log("Finally...", res.data);
  //         // Handle the response as needed
  //       })
  // }
  if (!data) {
    // toast.error("Artwork not found");
  }
  console.log(data?.artworkId)
  useEffect(()=>{
    
    // runner()
    console.log(data?.artworkId)
    console.log(productId)
    const response = axios
        .get(`https://eag-vkis.onrender.com/artwork/list-bids/${data?.artworkId}`)
        .then((res)=>{
          console.log("response data", res.data);
          dispatch(UserActions.getBids(res.data))
          setBids(data.artwork.bid)
          // Handle the response as needed
        })
        console.log(response)

  },[data?.artworkId, loader])

  const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
  const options2: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
  const time = bids.map((bid)=> new Date(bid.createdAt).toLocaleString('en-GB', options2))
  const today = new Date();

  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = today.getFullYear();

  const formattedDate = `${day}/${month}/${year}`;

  const sortedBids = bids.sort((a, b) => {
    const dateA = new Date(a.bidTime).getTime();
    const dateB = new Date(b.bidTime).getTime();
    return dateB - dateA;
  });
  console.log(sortedBids)


  return (
    <div>
      <Link to="/dashboard/auction">
        <img
          src={arrowLeft}
          alt=""
          style={{ margin: "10px 20px", cursor: "pointer" }}
        />
      </Link>
      <DetailContainer>
        <DetailInfo>
          <img src={data?.artwork?.imageUrl} alt="" />
          <BidForm price={ data?.currentPrice || data?.startingPrice} auctionId={data?.id || ""} />
        </DetailInfo>
        <DetailInfo>
          <FlexIcon>
            <img src={loveIcon} alt="Love icon" />
            <span>0</span>
          </FlexIcon>
          <h3>{data?.artwork?.artName || ""}</h3>
          <p>{data?.artwork?.description || ""}</p>
          <Table>
            <tr>
              <TableHeader>Artist</TableHeader>
              <TableHeader>Location</TableHeader>
              <TableHeader>Category</TableHeader>
            </tr>
            <tr>
              <td style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <ProfileAvatar src={data?.artwork?.artist.profilePic || marisPic} alt="Profile" />
                <span>{data?.artwork?.artist?.firstname}</span>
              </td>
              <td>{data?.artwork?.artist?.address || ""}</td>
              <td>{data?.artwork?.category || ""}</td>
            </tr>
          </Table>
          <div>
            <h3 style={{ color: "#888888" }}>Bids</h3>
            <BidsDiv>
              {bids && bids.map((item,index) => (

              <EachBid key={item.id}>
                <ProfileAvatar src={item.user?.profilePic || marisPic} alt="Profile" />
                <div
                  style={{ display: "flex", alignItems: "end", gap: "20px", width:"100%", padding:"5px" }}
                >
                  <span style={{ color: "#888888" }}>
                    Total <br /> by
                  </span>
                  <span>
                    N{numberWithCommas(item.price)} <br /> {item.user?.firstname +" "+ item.user?.surname}
                  </span>
                  <span style={{ color: "#888888" }}>
                    { formattedDate == new Date(item.bidTime).toLocaleDateString("en-GB") ? time[index] : new Date(item.bidTime).toLocaleDateString("en-GB",options)}</span>
                </div>
              </EachBid>
              ))}
            </BidsDiv>
          </div>
        </DetailInfo>
      </DetailContainer>
    </div>
  );
};

export default Bid;

const DetailContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px;
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 180%;
  }
`;

const DetailInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  /* flex: 1; */
  width: 50%;

  p {
    color: #4f4f4f;
  }
`;

const Table = styled.table`
  margin: 20px 0;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 5px 0;
  color: #888888;
`;

const BidsDiv = styled.div`
  margin: 20px 0;
`;

const EachBid = styled.div`
  width: 100%;
  display: flex;
  gap: 5px;
  align-items: center;
  text-align: center;
  margin: 5px 0px;
  padding: 2px 0px;
  border-bottom: solid 2px #e0dcdc;
`;
