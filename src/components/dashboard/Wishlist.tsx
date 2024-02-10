import React, { useEffect } from "react";
import { ContentSection, FeaturedSection } from "./helper/styles";
import { Art, CartCard } from "./helper/Card";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
	const navigate = useNavigate();
	const [carts, setCarts] = React.useState<Art[]>([]);
	useEffect(() => {
		const carts = localStorage.getItem("carts");
		if (carts) {
			setCarts(JSON.parse(carts));
		}
	}, []);
	console.log(carts);
	const artWorks = (artId: string) => {
		navigate(`/dashboard/cart-detail/${artId}`);
	};
	return (
		<>
			<ContentSection>
				<h3>My Carts</h3>
				{carts.length === 0 && <p style={{ margin: "20px 0", textAlign: "center" }}>No record found</p>}
				<FeaturedSection>
					{carts.map((artwork, index) => (
						<CartCard key={index} data={artwork} onClick={() => artWorks(artwork.id)} />
					))}
				</FeaturedSection>
			</ContentSection>{" "}
		</>
	);
};

export default Wishlist;
