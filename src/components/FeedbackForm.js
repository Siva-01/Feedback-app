import React from "react";
import Card from "./shared/Card";
import { useState } from "react";
import Button from "./shared/Button";
import RatingSelect from "./RatingSelect";
import {useContext,useEffect} from 'react';
import FeedbackContext from "../context/FeedbackContext";


function FeedbackForm() {
  const [text, setText] = useState("");
  const [rating, setRating] = useState(10);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [msg, setMsg] = useState("");
  const{addFeedback,feedbackEdit,updateFeedback}=useContext(FeedbackContext);

  useEffect(() =>{
    if(feedbackEdit.edit === true){
      setBtnDisabled(false)
      setText(feedbackEdit.item.text)
      setRating(feedbackEdit.item.rating)
    }

  },[feedbackEdit])

  const handleTextChange = (e) => {
    if (text === " ") {
      setMsg(null);
      setBtnDisabled(true);
    } else if (text !== " " && text.trim().length <= 10) {
      setMsg("Text Should be atleast 10 characters");
      setBtnDisabled(true);
    } else {
      setMsg(null);
      setBtnDisabled(false);
    }
    setText(e.target.value);
  };

  const handleSubmit = (e)=> {
      e.preventDefault()
      if(text.trim().length >10){
          const newFeedback = {
              text,
              rating,
          }
          if(feedbackEdit.edit=== true){
            updateFeedback(feedbackEdit.item.id,newFeedback)
          }
          else{
            addFeedback(newFeedback)
          }
          setText(' ');
      }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)} />
        <div className="input-group">
          <input
            onChange={handleTextChange}
            type="text"
            placeholder="write a review"
            value={text}
          />
          <Button type="submit" version="secondary" isDisabled={btnDisabled}>
            Save
          </Button>
        </div>
        {msg && <div className="message">{msg}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
