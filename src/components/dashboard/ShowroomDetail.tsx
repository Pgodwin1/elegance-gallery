import styled from "styled-components";
import { timeIcon, loveIcon, marisPic, arrowLeft } from "../../assets/dashboard";
import { Link, useNavigate } from "react-router-dom";
import { ProfileAvatar, FlexIcon } from "./helper/styles";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../../Service/contextApi/ProductProvider";
import { formatDate } from "./utils";

const ShowroomDetail = () => {
	const navigate = useNavigate();
	const { products } = useContext(ProductContext);
	// const { allAuctions } = useContext(ProductContext);
	const picture = localStorage.getItem("profilePic");

	const { productId } = useParams();

	console.log("Show room detail", productId);

	const product = products.find((p) => p.id === productId);

	if (!product) {
		return <p>Artwork not found</p>;
	}

	const { artName, artist, description, imageUrl, category, createdAt } = product;
	const { firstname, surname, address } = artist;

	const onChange = () => {
		navigate(`/dashboard/showroom/create-auction/${productId}`);
	};
	return (
		<div>
			<Link to="/dashboard/showroom">
				<img src={arrowLeft} alt="" style={{ margin: "10px 20px", cursor: "pointer" }} />
			</Link>
			<DetailContainer>
				<DetailInfo>
					<img src={imageUrl} alt="" />
					<h4>{artName}</h4>

					<FlexIcon>
						<img src={timeIcon} alt="Time icon" />
						<span>{formatDate(createdAt)}</span>
					</FlexIcon>
					{product ? (
						<button type="button" onClick={onChange}>
							Create Auction
						</button>
					) : null}
				</DetailInfo>
				<DetailInfo>
					<FlexIcon>
						<img src={loveIcon} alt="Love icon" />
						<span>20</span>
					</FlexIcon>
					<ProfileAvatar src={!picture ? marisPic : picture} alt="Profile" />
					<h3>{`${firstname} ${surname}`}</h3>
					<h4>Artist</h4>
					<p>{description}</p>
					<table>
						<tr>
							<TableHeader>Location</TableHeader>
							<TableHeader>Specialized in</TableHeader>
						</tr>
						<tr>
							<td>{address ? address : "Lagos"}</td>
							<td>{category}</td>
						</tr>
					</table>
					<div>
						<h3>More Art</h3>
						{/* <div></div> */}
					</div>
				</DetailInfo>
			</DetailContainer>
		</div>
	);
};

export default ShowroomDetail;

const DetailContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin: 20px;
	gap: 30px;

	@media (max-width: 768px) {
		flex-direction: column;
	}
`;

const DetailInfo = styled.div`
	display: flex;
	flex-direction: column;
	gap: 20px;
	/* flex: 1; */
	width: 50%;
	button {
		padding: 6px;
		border-radius: 20px;
		/* height: 30px; */
		color: white;
		text-decoration: none;
		text-align: center;
		background-color: blue;
		cursor: pointer;
	}
`;

const TableHeader = styled.th`
	text-align: left;
	padding: 5px 0;
`;
