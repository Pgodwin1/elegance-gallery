// import axios from 'axios';
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useUserContext } from '../../../Service/contextApi/UserProvider';
import { shipping } from '../../../api/user';
import { useDispatch, useSelector } from "react-redux";
import BeatLoader from "react-spinners/BeatLoader";



export type AddressData = {
  address:string;
  state:string;
  zipcode:string;
}


const Shipping = () => {
  const addressForm: AddressData = {
    address: "",
    state: "",
    zipcode: "",
  };
    const address = localStorage.getItem("address")
    const state = localStorage.getItem("state");
    const zipcode = localStorage.getItem("zipcode")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const loader = useSelector((state:any) => state.user.loading) as boolean
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isChecked, setIsChecked] = useState(false);
    const [formDetails, setFormDetails] = useState<AddressData>(addressForm);

    const handleInputChange = (e:ChangeEvent<HTMLSelectElement>): void => {
        const { name, value } = e.target;
        setFormDetails({ ...formDetails, [name]: value });
      };

      // Event handler for checkbox change
      const handleCheckboxChange = (event:ChangeEvent<HTMLInputElement>) => {
        setIsChecked(event.target.checked);
        
      };
      
      const { userId } = useUserContext();
       console.log(userId)
      const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
        if(isChecked){
          setFormDetails({address,zipcode,state})
        }
        e.preventDefault();
        console.log("Submitted card details:", formDetails);
        // Implement your logic for handling the submitted card details or payment
        try {
          console.log("Submitted card details:", formDetails);
          console.log(isChecked)
          // Make a POST request to your server with the card details
         
          console.log("Loader",loader)
            shipping(formDetails, dispatch).then((res)=> {
                if(res.data.error){
                    toast.error(res.data.error)
                    console.log(res.data.error)
                }
                if(res.status == 200 ){
                    toast.success(res.data.message);
                    localStorage.setItem('user', res.data.user)
                    console.log(res)
                    navigate('/dashboard')
                }
                
               
            })
        } catch (error) {
          console.error('An error occurred:', error);
        }
      };

  return (
    <Main>
        {address != "null" && <h3>Address</h3>}
        
            {address != "null" && <div style={{ borderBottom:"solid 2px gray", paddingBottom:"25px" }}>
                <Address>
                    <input
                    type="checkbox"
                    id="myCheckbox"
                    name="myCheckbox"
                    value="someValue"
                    onChange={handleCheckboxChange}
                    />
                    <h4>{address}</h4>
                </Address>
            </div>}
            <h3 style={{  paddingTop:"15px" }}>Add New Address</h3>
            <div style={{  paddingTop:"15px" }}>
            <Label
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              >
                Address
              </Label>
              <Input2
                id="address"
                name="address"
                value={formDetails.address}
                // @ts-expect-error: Don't know why it was raising error
                onChange={handleInputChange}
                placeholder=""
                required
              />
            </div>
            <div>
            <Label
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              >
                State
              </Label>
              <Input
                type="text-area"
                id="state"
                name="state"
                value={formDetails.state}
                // @ts-expect-error: Don't know why it was raising error
                onChange={handleInputChange}
                placeholder="Lagos"
                required
              />
            </div>
            <div>
            <Label
                style={{
                  fontFamily: "Montserrat",
                  fontSize: "16px",
                  fontWeight: "400",
                }}
              >
                Zip Code
              </Label>
              <Input
                type="text-area"
                id="zipcode"
                name="zipcode"
                value={formDetails.zipcode}
                // @ts-expect-error: Don't know why it was raising error
                onChange={handleInputChange}
                placeholder="106778"
                required
              />
            </div>
            <Button onClick={handleSubmit} type="submit">
              <BeatLoader
                color="white"
                loading={loader}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
                Save Address
            </Button>
            
        
    </Main>
  )
}


const Main = styled.div`
    display: flex;
    flex-direction: column;
    gap:10px;
    width: 100%;
`;

const Address = styled.div`
  width: 100%;
  padding: 5px;
  background-color: #f9f5f5;
  border-radius: 10px;
  display: flex;
  gap: 10px;
`;

const Label = styled.label`
  margin-bottom: 6px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 6px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Input2 = styled.textarea`
  width: 100%;
  height: 70px;
  padding: 6px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 16px;
  background-color: #0000cd;
  color: #fff;
  cursor: pointer;
`;

export default Shipping
