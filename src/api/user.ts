// import axios, { AxiosError } from "axios";
import { UserActions } from "../store/user";
import axios from "../Service/axios";
import { LoginDataType } from "../components/Login";
import { AppDispatch } from "../store";
import { AddressData } from "../components/dashboard/Payment/Shipping";
import { Data } from "../components/dashboard/CartDetails"

export const base_url = "http://localhost:5000";
//  interface Pay {
// 	reference:string;
// 	userEmail:string;
// 	price:number;
// 	userId:string;
// 	artworkid:string;
// }

const userId = localStorage.getItem("userId");
const role = localStorage.getItem("role");

export const loginUser = async (formData: LoginDataType, dispatch: AppDispatch) => {
	try {
		dispatch(UserActions.startLoading());

		const response = await axios.post(`${base_url}/users/login`, formData);
		localStorage.setItem("token", response.data.token);
		localStorage.setItem("username", response.data.user.firstname);
		localStorage.setItem("userId", response.data.user.id);
		localStorage.setItem("address", response.data.user.address);
		localStorage.setItem("zipcode", response.data.user.zipcode);
		localStorage.setItem("state", response.data.user.state);
		// response.setItem("artId", response.data.user.artWorkid)
		localStorage.setItem("role", response.data.role);
        localStorage.setItem("email", response.data.user.email);
		localStorage.setItem("profilePic", response.data.user.profilePic);
		console.log(response.data);
		dispatch(UserActions.endLoading());
		dispatch(UserActions.loginUser(response.data.user));
		// window.location.reload()
		console.log("Store", response.data);
		return response;
	} catch (err) {
		console.log("Store", formData);
		console.log(err);
		dispatch(UserActions.endLoading());
		return err.response;
	}
};

export const paystackVerify = async (cardDetails: Data, dispatch: AppDispatch) => {
	try {
		dispatch(UserActions.startLoading());
        console.log("Verifying payment...")
        dispatch(UserActions.paySuccess())
        const response = await axios.post(`${base_url}/payment/verify`, cardDetails);
		console.log(response.status);

		response.status == 200 ? dispatch(UserActions.paySuccess()) : dispatch(UserActions.payFail());
		dispatch(UserActions.endLoading());
		dispatch(UserActions.paystackVerify(response.data));
		console.log("Store...", response.data);
		return response;
	} catch (err) {
		console.log("Store", cardDetails);
		console.log(err);
		dispatch(UserActions.endLoading());
		// dispatch(UserActions.payFail())
		return err.response;
	}
};

export const shipping = async (formDetails: AddressData, dispatch: AppDispatch) => {
	try {
		dispatch(UserActions.startLoading());
		dispatch(UserActions.paySuccess());
		console.log(formDetails)
		const response = (role == "User" )? await axios.post( `${base_url}/delivery/${userId}/add-address`, formDetails) :await axios.post(
				`${base_url}/delivery/${userId}/add-artist-address`, formDetails);
		console.log(response.data);

		dispatch(UserActions.endLoading());
		dispatch(UserActions.shipping(response.data));
		console.log("Store", response.data);
		return response;
	} catch (err) {
		console.log("Store", formDetails);
		console.log(err);
		dispatch(UserActions.endLoading());
		return err.response;
	}
};

export const getUser = async (dispatch: AppDispatch) => {
	try {
		const response = await axios.get(`${base_url}/all`);

		// console.log('resp',response.data.name)
		if (!response.data) {
			throw new Error("error fetching data");
		}

		const data = response.data;
		console.log(data);
		dispatch(UserActions.getUser(data));
	} catch (error) {
		console.log(error);
	}
};

export const getBids = async (productid, dispatch: AppDispatch) => {
	try {
		const response = await axios.get(`${base_url}/bids`);

		if (!response.data) {
			throw new Error("error fetching data");
		}

		const data = response.data;
		console.log(data);
		dispatch(UserActions.getBids(data));
	} catch (error) {
		console.log(error);
	}
};