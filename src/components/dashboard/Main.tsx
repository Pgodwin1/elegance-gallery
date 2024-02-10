import React, { useContext, useEffect, useState } from "react";
import { Card } from "./helper/Card";
import { useNavigate } from "react-router-dom";
import { ArtistSection, ContentSection, FeaturedSection } from "./helper/styles";
// import { artists } from "./data/index";
import { landscape, portrait, ancient, modern, oilAndCanvas, penAndInk, nature, digitalPainting } from "../../assets/dashboard/category/index";
import { ProductContext } from "../../Service/contextApi/ProductProvider";

interface ICategory {
	name: string;
	img: string;
}
const categories = [
	{ name: "Landscape", img: landscape },
	{ name: "Portrait", img: portrait },
	{ name: "Ancient", img: ancient },
	{ name: "Modern", img: modern },
	{ name: "Oil on Canvas", img: oilAndCanvas },
	{ name: "Pen and Ink", img: penAndInk },
	{ name: "Nature", img: nature },
	{ name: "Digital Paint", img: digitalPainting },
];

const Main = () => {
	const [category, setCategory] = useState<ICategory[]>([]);
	const { artists,fetchArtworks } = useContext(ProductContext);

	const navigate = useNavigate();

	useEffect(() => {
		setCategory(categories);
	}, [category]);

	useEffect(() => {
		fetchArtworks();
	},[fetchArtworks])

	const getArts = (name: string) => {
		navigate(`/dashboard/artList/${name}`);
	};

	return (
		<>
			{/* <ContentSection>
				<h3>Featured Style</h3>
				<FeaturedSection>
					{features.map((feature, index) => (
						<Card key={index} image={feature.img} title={feature.name} />
					))}
				</FeaturedSection>
			</ContentSection> */}

			<ContentSection>
				<h3>Art Categories</h3>
				<FeaturedSection>
					{category.map((cat, index) => (
						<Card key={index} image={cat.img} title={cat.name} onClick={() => getArts(cat.name)} />
					))}
				</FeaturedSection>
			</ContentSection>

			<ContentSection>
				<h3>Popular Artists</h3>
				<ArtistSection>
					{/* {artists.map((artist, index) => (
						<Card key={index} image={artist.img} title={artist.name} />
					))} */}
					{artists.length > 0 && artists.map((artist, index) => <Card key={index} image={artist.profilePic as string} title={artist.firstname as string} />)}
				</ArtistSection>
			</ContentSection>
		</>
	);
};

export default Main;
