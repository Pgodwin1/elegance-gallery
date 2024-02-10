import { useContext, useEffect } from "react";
import { ArtCard } from "./helper/Card";
import { useNavigate } from "react-router-dom";
import { ContentSection, FeaturedSection } from "./helper/styles";
import { ProductContext } from "../../Service/contextApi/ProductProvider";
// import { toast } from "react-toastify";
import styled from "styled-components";
import { Link } from "react-router-dom";
import loadingA from "../../assets/dashboard/loadingA.svg";

const Showroom = () => {
	const { artworksByArtist, loading, fetchAllArtworksByArtist } = useContext(ProductContext);
	const navigate = useNavigate();

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			fetchAllArtworksByArtist();
		}

		return () => {
			isMounted = false;
		};
	}, []);

	const getArtDetails = (artId: string) => {
		console.log(artId);
		navigate(`/dashboard/showroom-detail/${artId}`);
	};

	return (
		<>
			<ContentSection>
				<Header>
					<Title> My Artworks</Title>
					<Button to="/dashboard/showroom/upload">Upload Artwork</Button>
				</Header>
				{loading && artworksByArtist.length === 0 && <img src={loadingA} alt="loading" style={{ margin: "20px auto", display: "block" }} />}
				{!loading && artworksByArtist.length === 0 && <p style={{ margin: "20px 0", textAlign: "center" }}>No record found</p>}
				<FeaturedSection>
					{artworksByArtist.map((art, index) => (
						<ArtCard key={index} data={art} showCart={false} viewDetail={() => getArtDetails(art.id)} />
					))}
				</FeaturedSection>
			</ContentSection>
		</>
	);
};

export default Showroom;

const Title = styled.h3`
	padding-bottom: 20px;
	font-weight: bolder;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

const Button = styled(Link)`
	padding: 8px 24px;
	background-color: #0000cd;
	color: #fff;
	border: none;
	border-radius: 16px;
	cursor: pointer;
	text-decoration: none;
`;
