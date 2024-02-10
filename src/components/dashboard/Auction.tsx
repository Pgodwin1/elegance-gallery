import { useContext, useEffect } from "react";
import { ContentSection, FeaturedSection } from "./helper/styles";
import { AuctionCard, IAuction, LiveAuctionCard } from "./helper/Card";
import { time } from "../../assets/dashboard";
import { ProductContext } from "../../Service/contextApi/ProductProvider";
import { useNavigate } from "react-router-dom";
import loadingA from "../../assets/dashboard/loadingA.svg";


const Auction = () => {
  const { liveArtwork, upcomingArtwork, fetchLiveArtworks,fetchUpcomingArtworks, loadAuction } = useContext(ProductContext);
  const navigate = useNavigate();

useEffect(() => {
  let isMounted = true;
		if (isMounted) {
      fetchLiveArtworks();
      fetchUpcomingArtworks();
		}

		return () => {
			isMounted = false;
		};
},[])

  const bidArtwork = (artId: string) => {
    navigate(`/dashboard/bid/${artId}`);
  };

  return (
    <>
      <ContentSection>
        <h3>Live Auction</h3>
        {loadAuction && <img src={loadingA} alt="loading" style={{ margin: "20px auto", display: "block" }} />}
				{!loadAuction && liveArtwork.length === 0 && <p style={{ margin: "20px 0", textAlign: "center" }}>No record found</p>}
        <FeaturedSection>
          {liveArtwork.length > 0 && liveArtwork.map((artwork: IAuction, index: number) => (
            <LiveAuctionCard
              key={index}
              data={artwork}
              whichBid="Last Bid"
              textColor="red"
              icon={time}
              onClick={() => bidArtwork(artwork.id)}
            />
          ))}
          
        </FeaturedSection>
      </ContentSection>



      <ContentSection>
        <h3>Upcoming Auction</h3>
        <FeaturedSection>
					{upcomingArtwork.length > 0 && upcomingArtwork.map((art: IAuction, index: number) => (
						<AuctionCard key={index} data={art} />
					))}
				</FeaturedSection>
      </ContentSection> 
    </>
  );
};

export default Auction;
