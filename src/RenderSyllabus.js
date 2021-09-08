// import logo from './logo.svg';
import './App.css';
import React, {Component, useState, useEffect} from 'react';
import axios from './axiosInterceptor';
import ProgressBar from 'react-customizable-progressbar'
import ShowForm from "./SyllabusForm"
import ShowCards from './SyllabusCard';
import Logout from './Logout';

function RenderSyllabus() {
  const [syllabusItems, setSyllabusItems] = useState([]);
  const [isPageLoading, setLoading] = useState(true)
  useEffect(() => {
    const syllabusItemsClone = [...syllabusItems];
    axios.get()
    .then((response) => {
      console.log(response.data);
      syllabusItemsClone.push(response.data);
      setSyllabusItems(syllabusItemsClone[0]);
      setLoading(false)
    })
    .catch((error) => {
      console.log(error);
    })
  }, [])

  const handleClick = (event) => {
    const syllabusItemsClone = [...syllabusItems];
    syllabusItemsClone.push({
      name: "",
      description: "",
      learningObjectives: "",
      editMode: true,
      isNameValid: true,
      isDescriptionValid: true,
      isLearningObjectivesValid: true,
      isNewRecord: true
    });
    setSyllabusItems(syllabusItemsClone);
  }

  const handleEdit = (index) => {
    const syllabusItemsClone = [...syllabusItems];
    syllabusItemsClone[index]["editMode"] = true;
    syllabusItemsClone[index]["isNewRecord"] = false;
    setSyllabusItems(syllabusItemsClone);
  }
  var errorMessage = [{
    nameError: "",
    descriptionError: "",
    objectivesError: ""
  }];
  function isFormValid(obj) {
    
    let isValid = true
    if(obj.name == "") {
      obj.isNameValid = false;
      errorMessage.nameError = "Name is mandatory"
      isValid = false;
    }
    if(obj.description == "") {
      obj.isDescriptionValid = false;
      errorMessage.descriptionError = "Description is mandatory"
      isValid = false;
    }
    if(obj.learningObjectives == "") {
      obj.isLearningObjectivesValid = false;
      errorMessage.objectivesError = "Learning objectives are mandatory"
      isValid = false;
    }
    return isValid
  }

  const handleSave = (index, obj) => {
    if(isFormValid(obj)){
      const syllabusItemsClone = [...syllabusItems];
      syllabusItemsClone[index] = obj;
      syllabusItemsClone[index]["editMode"] = false;
      syllabusItemsClone[index]["isNewRecord"] = false;
      setSyllabusItems(syllabusItemsClone);
    }
  }

  const handleDelete = (index) => {
    const syllabusItemsClone = [...syllabusItems];
    const id = syllabusItems[index].id;
    const  requestUrl = "/" + id;
    console.log(requestUrl);
    axios.delete(requestUrl)
    .then((response) => {
      if(response.status === 200) {
        syllabusItemsClone.splice(index,1);
        setSyllabusItems(syllabusItemsClone);
      }
    })
    .catch((error) => {
      console.log(error);
    }) 
    
  }

  const handleCancel = (index, obj) => {
    const syllabusItemsClone = [...syllabusItems];
    if(obj.name == "" && obj.description =="" && obj.learningObjectives == "") {
      syllabusItemsClone.splice(index,1);
    }
    else {
      syllabusItemsClone[index].editMode = false;
    }
    setSyllabusItems(syllabusItemsClone);
  }

  return (
    <div  className="contents">
        <Logout></Logout>
      <button onClick={handleClick}>Add Syllabus</button>
      <header className="App-header">
        {
          isPageLoading ? (<ProgressBar progress={100 } radius={100}/>) : (
            syllabusItems.map((syllabusItem, index) => 
            {
              if(!syllabusItem.editMode) 
              {
                return <ShowCards
                key={ `syllabus${index}`}
                syllabusData={syllabusItem}
                index={index}
                onEdit={handleEdit}
                onDelete={handleDelete}
                ></ShowCards>
              }
              return <ShowForm
              key={ `syllabus${index}`}
              syllabusData={syllabusItem}
              index={index}
              onSave={handleSave}
              onCancel={handleCancel}
              errorMessageData={errorMessage}
              ></ShowForm>
            })
          )
        }
      </header>
    </div>
  );
}
export default RenderSyllabus;