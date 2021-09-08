import './App.css';
import React, {Component, useState, useEffect} from 'react';
import axios from './axiosInterceptor';

function ShowForm(props) {
    const[name, setName] = useState(props.syllabusData.name);
    const[description, setDescription] = useState(props.syllabusData.description);
    const[learningObjectives, setLearningObjective] = useState(props.syllabusData.learningObjectives);
  
    const handleInputChange = (event) => {
        if(event.target.name === "name") {
            setName(event.target.value);
        }

        if(event.target.name === "description") {
            setDescription(event.target.value);
        }

        if(event.target.name === "learningObjectives") {
            setLearningObjective(event.target.value);
        }
    };
  
    const obj = {
        "name": name,
        "description": description,
        "learningObjectives": learningObjectives
    };
    const saveSyllabusItem = () => {
        console.log(props.syllabusData.isNewRecord)
        if(props.syllabusData.isNewRecord)
        {
            axios.post('/', obj)
            .then((response) => {
                console.log(response.data[0]);
                props.onSave(props.index, response.data[0]);
            })
            .catch((error) => {
                console.log(error);
            }) 
        }
        else {
            const id = props.syllabusData.id;
            const requestUrl = "/" + id;
            axios.put(requestUrl, obj)
            .then((response) => {
                console.log(response.data[0]);
                props.onSave(props.index, response.data[0]);
            })
                .catch((error) => {
                console.log(error);
            }) 
        }
    };
  
    const cancelForm = () => {
        props.onCancel(props.index, obj);
        console.log(obj);
    };
    
    return(
        <div>
            <fieldset>
                <legend>Syllabus Name</legend>
                <input name="name"
                type="text"
                value={name}
                placeholder="Syllabus Name" 
                onChange={handleInputChange}/>
                <label>{props.errorMessageData.nameError}</label>
            </fieldset>
            <fieldset>
                <legend>Syllabus Description</legend>
                <input name="description"
                type="text"
                value={description}
                placeholder="Syllabus Description" 
                onChange={handleInputChange}/>
                <label>{props.errorMessageData.descriptionError}</label>
            </fieldset>
            <fieldset>
                <legend>Learning Objectives</legend>
                <input name="learningObjectives"
                type="text"
                value={learningObjectives}
                placeholder="Learning Objectives"
                onChange={handleInputChange}/>
                <label>{props.errorMessageData.objectivesError}</label>
            </fieldset>
            <button onClick={saveSyllabusItem}>save</button>
            <button onClick={cancelForm}>Cancel</button>
        </div>
    )
  }
  export default ShowForm;
  