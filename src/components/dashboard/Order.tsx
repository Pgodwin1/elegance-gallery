import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "../../Service/axios";
import loadingA from "../../assets/dashboard/loadingA.svg";
import { Link } from "react-router-dom";
import { dp } from "../../assets/dashboard";
import { Art } from "./helper/Card";

export interface User {
	id: string;
	firstname: string;
	surname: string;
	profilePic: string,
	email: string;
	phone: string;
	password: string;
	role: string;
	verificationToken: string;
	active: boolean;
	googleId: string;
	resetPasswordToken: string;
	otp: number;
	address: string;
	state: string;
	zipcode: number;
}

export interface Order {
	id:string;
    userId:string;
	artwork:Art;
    artworkId:string;
    artistId:string;
    quantity:number;
    status:string;
    paymentReference:string;
    price:number;
    checkoutUrl:string;
    isPaid:boolean;
	user:User;
	createdAt:string;
}



const Orders = () => {
	const role = localStorage.getItem("role");
	const token = localStorage.getItem("token");
	//   const userId = localStorage.getItem("userId");
	//   console.log("userId",userId)
	
	const [orders, setOrders] = useState<Order[]>([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const fetchOrders = async () => {
			setLoading(true);
			if (role == "Artist") {
				axios.get(`/artist/get-orders/${token}`).then((res) => {
					setOrders(res.data.list);
					setLoading(false);
					console.log(res.data.list);
				});
			} else {
				axios.get(`/users/get-all-user-orders/${token}`).then((res) => {
					setOrders(res.data.list);
					setLoading(false);
					console.log(res.data.list);
				});
			}
		};
		fetchOrders();
	}, [role,token]);

	const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    const time = orders.map((order:Order)=> new Date(order.createdAt).toLocaleDateString('en-GB', options))
    console.log(time)

	return (
		<>
			<Main>
				{loading && orders.length === 0 && <img src={loadingA} alt="loading" style={{ margin: "20px auto", display: "block" }} />}
				{!loading && orders.length === 0 && <p style={{ margin: "20px 0", textAlign: "center" }}>No record found</p>}
				{orders &&
					orders.map((order, index) => (
						<MainDiv key={order.id}>
							<Left>
								<Img>
									<img src={order.artwork?.imageUrl} alt="image" />
								</Img>

								{/* Render if Role is equal to Artist */}
								{role == "Artist" ? (
									<Buyer>
										<div className="buyerImg">
											<img src={order.user?.profilePic || dp} alt="image" />
										</div>

										<div className="buyerDetails">
											<span>
												<p>{order.user?.firstname + " " + order.user?.surname}</p>
											</span>
											<p>{order.user?.email}</p>
										</div>
									</Buyer>
								) : (
									""
								)}

								<h4>Total: ${order.price}</h4>
								<h4>
									Order No: <span>{order.paymentReference}</span>{" "}
								</h4>
								<h4>
									Payment Method: <span>Debit Card</span>
								</h4>
							</Left>

							<Right>
								<Link to={`/dashboard/orderDetail/${order.artworkId}`}>View Details</Link>

								<div>
									<h4>Order Date:</h4>
									<p>{time[index]}</p>
								</div>
								<div>
									<h4>Delivery Address:</h4>
									<p>{order.user?.address} </p>
								</div>
							</Right>
						</MainDiv>
					))}
			</Main>
		</>
	);
};

 const Buyer = styled.div`
	width: 100%;
	height: 39px;
	gap: 3px;
	display: flex;

	.buyerImg {
		width: 32px;
		height: 32px;
		border-radius: 50%;
		position: relative;
		overflow: hidden;
	}

	img {
		object-fit: fill;
		position: absolute;
	}

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

const Img = styled.div`
	width: 150px;
	height: 60%;
`;

const Main = styled.div`
	display: flex;
	flex-direction: column;
	width: 90%;
	gap: 5px;
`;

// const Border = styled.div`
// 	border-bottom: 2px solid grey;
// 	background-color: #4f9cde;
// 	height: 12px;
// `;

const MainDiv = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	height: 30%;
	margin: 5px 0px;
	padding: 15px 0px;
	border-bottom: 1px solid grey;

	a {
		background-color: skyblue;
		text-decoration: none;
		color: blue;
		padding: 5px 10px;
		border-radius: 15px;
		font-size: small;
		font-weight: bold;
		text-align: center;
	}
	img {
		height: 100%;
		width: 100%;
	}
`;

const Right = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	text-align: right;

	p {
		color: grey;
	}
`;

const Left = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;

	span {
		color: grey;
	}
`;

export default Orders;
