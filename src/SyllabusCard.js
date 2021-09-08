import './App.css';
import React, {Component, useState, useEffect} from 'react';
import axios from 'axios';

function ShowCards(props) {
    const editSyllabusItem = (event) => {
        props.onEdit(props.index);
    }
  
    const deleteSyllabusItems = () => {
        props.onDelete(props.index);
    };
  
    return(
        <div className="syllabusCard">
            <label className="index">{props.index + 1}</label>
            <label>{props.syllabusData.name}-{props.syllabusData.description}</label>
            <button className="editDeleteBtn" onClick={deleteSyllabusItems}>Delete</button>
            <button className="editDeleteBtn" onClick={editSyllabusItem}>Edit</button>
        </div>
    )
}
export default ShowCards;
  