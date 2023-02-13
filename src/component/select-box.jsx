import { useEffect,  useRef, useState } from "react";
import './select-box.css'

function SelectBox(props) {

  //Component array data recieved as props
  const { data } = props;

  //-------------States----------------------------------
  
  //Items which users has selected so far
  const [selectedItems, setSelectedItems] = useState([ ]);

  //Data from source
  const [sourceData, setSourceData] = useState(data)
  
  //user passed input
  const [input, setInput] = useState("");
  const inputRef = useRef(0)
  //Filtered values based on user input
  const  [filteredValue, setFileteredValue] = useState([])
  const [show, setShow] = useState(false)

  const userInput = (e) => {
    console.log("User Input")
    let inputGiven = e.target.value;
    setInput(inputGiven);
    if(inputGiven){
   // filter the data based on user input
    let filteredValue = data.filter((items) => items.label.toLowerCase().includes(input)) ;
    setFileteredValue(filteredValue)
    
  }
    else{
    setFileteredValue(data)
      
    }
  };

  const pushSelectedValue = (item,e) => {
    console.log("Pushed value")

    let removedPushedItem = sourceData.filter((data)=>data.label !== item.label )
    setSourceData(removedPushedItem)
    setInput('')
    setSelectedItems((prevVal) => [...prevVal,item]);


  };
  const focusInput = ()=>{
    inputRef.current.focus()
    setShow(true)
    if(selectedItems.length>0)
    {
      let labelsFromSelectedItems = selectedItems.map(x=>x.label);
       let  remainingList = sourceData.filter(x=> !labelsFromSelectedItems.includes(x))
       setFileteredValue(remainingList)

    }
    else{setFileteredValue(sourceData)}
  }

  const inputOnblur = ()=>{
    setInput('')
    setShow(false)
  }

  const removeSelectedItem = (value)=>{
    let removedItemList = selectedItems.filter(item=>{return item.label !== value.label})   
    setSelectedItems(removedItemList)
    setSourceData(prevVal=>[...prevVal, value])
  }

  useEffect(()=>{
    if(selectedItems.length>0)
      {setTimeout(()=>{inputRef.current.focus()},0)}
  },[selectedItems])
  return (
    <>
    <div className={show?"inputContainer inputContainerHighlighted":"inputContainer"} onClick={focusInput} >
      {selectedItems.length > 0 &&
        selectedItems.map((item) => <SelectedItems key={item.label} item={item} removeItem={removeSelectedItem} />)}
      
      <input onFocus={focusInput}  onBlur={()=>{inputOnblur()}} ref={inputRef} id="inputBox" type="text" onChange={userInput} value={input} placeholder={ selectedItems.length===0? "Enter the color name":''} />
        <button className={'clearAllButton'} onClick={()=>{setSelectedItems([])}}>X</button>
    </div>
      <DropDown filteredList={filteredValue} show={show} pushSelectedValue={(val)=>pushSelectedValue(val)} />
      </>
  );
}

function DropDown(props) {
  return (
    <>
     {props.show && props.filteredList.length>0 && <div className={"filteredDropDown"}>
        {props.filteredList.length>0 && props.filteredList.map((value) => (
            <div
            onMouseDown ={(e) =>{props.pushSelectedValue(value,e)}}
              className={"listedItems"}
            >
              {value.label}
            </div>
          ))}
      </div>}
    </>
  );
}

function SelectedItems(props) {
  return (
    <>
    <div className="selectedItems">
      <span>{props.item.label}</span>
      <button className="selectedItemButton" onMouseDown={(e)=>{ props.removeItem(props.item)}}>x</button>
      </div>
    </>
  );
}

export default SelectBox;
