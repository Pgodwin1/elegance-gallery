import React, { createContext, useState, useEffect, ReactNode } from "react";
import axios from "../axios";
import { Artist } from "../../components/dashboard/helper/Card";

interface IProduct {
	id:string;
	artName: string;
	description: string;
	artistID: string;
	soldOut: boolean;
	artClass: string;
	imageUrl: string;
	category: string;
	price: number;
	artist: Artist;
	createdAt: string;
	bid:[];
}

export interface IAuction {
	id: string;
	artworkId: string;
	startingPrice: number;
	currentPrice: number;
	status: string;
	startDate: string;
	endDate: string;
	artwork: IProduct;
}

interface ProductContextProps {
	products: IProduct[];
	liveArtwork: IAuction[];
	allAuctions: IAuction[];
	artworksByArtist: IProduct[];
	bidPrice: number;
	setBidPrice: (bidPrice: number) => void;
	loading: boolean;
	fetchAllArtworksByArtist: () => void;
	artists: { [key: string]: string | number }[];
	upcomingArtwork: IAuction[];
	fetchArtworks:() => void;
	fetchLiveArtworks: () => void;
	fetchUpcomingArtworks:() => void;
	loadAuction:boolean;
}


const ProductContext = createContext<ProductContextProps | undefined>(undefined);

interface ProductProviderProps {
	children: ReactNode;
}

const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
	const [products, setProducts] = useState<IProduct[]>([]);
	const [liveArtwork, setLiveArtwork] = useState<IAuction[]>([]);
	const [upcomingArtwork, setUpcomingArtwork] = useState<IAuction[]>([]);
	const [allAuctions, setAllAuctions] = useState<IAuction[]>([]);
	const [artworksByArtist, setArtworksByArtist] = useState<IProduct[]>([]);
	const [artists, setArtists] = useState([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [loadAuction, setloadAuction] = useState<boolean>(false);
	const [bidPrice, setBidPrice] = useState(1000);

	const fetchAllArtworksByArtist = async () => {
		setLoading(true);
		try {
			const response = await axios.get("/art/artist-artworks");
			const data = await response.data.data;
			// console.log("artworks by artist", data);
			setArtworksByArtist(data);
			setLoading(false);
		} catch (error) {
			console.error("Error fetching artworks by artist:", error);
			setLoading(false);
		}
	};

	const fetchArtworks = async () => {
		try {
			const response = await axios.get("/art/getAll");
			const data = await response.data.data;
			console.log("All Products", data);
				setProducts(data);
			
		} catch (error) {
			console.error("Error fetching products:", error);
			
		}
	};

	const fetchAllAuctions = async () => {
		console.log("reloaded")
		try {
			const response = await axios.get("/auction/get-auctions");
			const data = await response.data.data;
			console.log("All Auction", data);
			setAllAuctions(data);

		} catch (error) {
			console.error("Error fetching Live Auctions:", error);

		}
	};

	const fetchLiveArtworks = async () => {
		setloadAuction(true)

		try {
			const response = await axios.get("/artwork/live-auctions");
			const data = await response.data.data;
			console.log("live Auction", data);
			setLiveArtwork(data);
			setloadAuction(false)

		} catch (error) {
			console.error("Error fetching Live Auctions:", error);
			setloadAuction(false)

		}
	};

	const fetchUpcomingArtworks = async () => {
		try {
			const response = await axios.get("/artwork/upcoming-auctions");
			const data = await response.data.data;
			console.log("upComing Auction", data);
			setUpcomingArtwork(data);
		} catch (error) {
			console.error("Error fetching Upcoming Auctions:", error);
		}
	};

	useEffect(() => {

		const fetchAllArtist = async () => {
			try {
				const response = await axios.get("/artist/get-artists");
				const data = await response.data.artists;
				console.log("All Artist", data);
				setArtists(data);
			} catch (error) {
				console.error("Error fetching Artist:", error);
			}
		};

		fetchArtworks();
		fetchLiveArtworks();
		fetchAllAuctions();
		fetchAllArtist();
		fetchUpcomingArtworks();
		// fetchAllArtworksByArtist();
	}, []);

	return (
		<ProductContext.Provider
			value={{ products, liveArtwork, allAuctions, artworksByArtist, bidPrice, setBidPrice, loading, fetchAllArtworksByArtist, artists, upcomingArtwork, fetchArtworks, fetchLiveArtworks,fetchUpcomingArtworks,loadAuction }}>
			{children}
		</ProductContext.Provider>
	);
};

export { ProductContext, ProductProvider };
