import axios from "../../Service/axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
//import { useForm, SubmitHandler } from "react-hook-form";
// import { useDispatch} from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import { toast } from "react-toastify";
import styled from "styled-components";

// Define the AuctionForm model
export type AuctionForm = {
  startingPrice: number;
  currentPrice: number;
  startDate: Date;
  endDate: Date;
};

// AuctionForm Component
const CreateAuction: React.FC = () => {
  const auctionForm: AuctionForm = {
    startingPrice: 0,
    currentPrice: 0,
    startDate: new Date(),
    endDate: new Date(),
  };
  const { artId } = useParams();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState<AuctionForm>(auctionForm);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormDetails({ ...formDetails, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `/auction/create-auction/${artId}`,
        formDetails
      );
      console.log("Hello...", loading);
      if (res.status === 201) {
        setLoading(false);
        toast.success("Auction created");
        navigate("/dashboard/auction");
      } else {
        setLoading(false);
        toast.error("Failed to create auction");
      }
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.error);
    }
  };

  return (
    <>
      <FormContainer className="auction" onSubmit={handleSubmit}>
        <div>
        <label>Starting Price:</label>
        <input
          className="mail-box"
          type="number"
          name="startingPrice"
          onChange={handleInputChange}
        />
        </div>
            {/* Input for startDate */}
   
<div>
<label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          className="mail-box"
          onChange={handleInputChange}
        />
</div>
       

        {/* Input for endDate */}
        <div>
        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          className="mail-box"
          onChange={handleInputChange}
        />
        </div>

        {/* Submit button */}
       <div>
       <button type="submit" className="send-btn send-txt">
          <BeatLoader
            color="#fff"
            loading={loading}
            size={10}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          Submit
        </button>
       </div>
      </FormContainer>
    </>
  );
};

export default CreateAuction;

const FormContainer = styled.form`
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: left;
  margin: 20px auto;
  width: 50%;
  border-radius: 5px;
  padding: 0;

  font-family: "Montserrat", sans-serif;
  flex-direction: column;
  gap: 30px;
  font-size: 16px;
  font-weight: 400;
  letter-spacing: 0em;
  text-align: left;

  @media screen and (max-width: 600px) {
    font-size: 14px;
    line-height: 18px;
    width: 0%;
  }
  .mail-box {
    width: 90%;
    margin: 10px auto;
    top: 20px;
    padding: 15px;
    border-radius: 6px;
    border: 1px;
    gap: 10px;
    background: rgba(213, 215, 222, 1);
    border: 1px solid rgba(213, 215, 222, 1);

    @media screen and (max-width: 600px) {
      width: 90%;
      margin: auto;
    }
  }

  .send-btn {
    width: 90%;
    margin: auto;
    height: 44px;
    padding: 12px, 16px, 12px, 16px;
    border-radius: 8px;
    gap: 8px;
    background-color: rgba(0, 0, 205, 1);
    cursor: pointer;

    @media screen and (max-width: 600px) {
      width: 100%;
    }
  }

  .send-txt {
    //styleName: Button Semi Bold - 14;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    letter-spacing: 0px;
    color: rgba(255, 255, 255, 1);
  }


`;
