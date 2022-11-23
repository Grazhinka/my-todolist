import { useEffect } from 'react'
import { useState } from 'react'
import React from "react";
import { gsap } from "gsap";


const getLocalStorage = () => {
    let list = localStorage.getItem("noteList");
    if (list) {
      return JSON.parse(localStorage.getItem("noteList"));
    } else {
      return [];
    }
};

const getLocalStorage2 = () => {
    let del = localStorage.getItem("deleteList");
    if (del) {
      return JSON.parse(localStorage.getItem("deleteList"));
    } else {
      return [];
    }
};

const { useLayoutEffect, useRef } = React;

function Note() {
    const [sost, setSost]=useState(true)
    const [userInput,setUserInput]=useState('')
    const [noteList,setNoteList]=useState(getLocalStorage())
    const [deleteList,setDeleteList]=useState(getLocalStorage2())

//--------------------сохранение-----------------------------
    useEffect(() => {
        localStorage.setItem("noteList", JSON.stringify(noteList));
        localStorage.setItem("deleteList", JSON.stringify(deleteList));
    }, [noteList,deleteList]);        

//--------------------анимация-----------------------------
    const app = useRef();
    useLayoutEffect(() => {
      let ctx = gsap.context(() => {
        gsap.to(".displayBlock", { y:'-70vh',ease:'circ', duration:1 });
      }, app);  
      return () => ctx.revert();
    },[sost]);

    const app2 = useRef();
    useLayoutEffect(() => {
      let ctx = gsap.context(() => {
        gsap.from(".box", { scale:1.3, yoyo:true});
      }, app2);  
      return () => ctx.revert();
    },[deleteList]);
  

//--------------------функции-----------------------------
    function onChangeEvent(e){
        setUserInput(e.target.value)
        setSost(true)
    }

    function onFormSubmit(e){
        e.preventDefault()   
    }

    function addItem(){
        if (userInput===''){
            alert('Введите текст...')
        }
        else{
            setNoteList([...noteList,userInput])
            setUserInput('')
        }
    }

    function deleteOne(item,index){
        noteList.splice(index,1)
        setDeleteList([...deleteList,item])
    }

    function returnOne(item,index){
       deleteList.splice(index,1)
       setNoteList([...noteList,item])

       if(deleteList.length<1){
        setSost(true)
       }
    }

    function redact(item,index){
        let listArray=noteList;
        let pro=prompt('Введите изменения...',item);
        if(pro === null || pro === ""){
            return
        } 
        listArray.splice(index,1,pro);
        setNoteList([...noteList])
    }


    function deleteDone(){
        setDeleteList([])  
        setSost(true)
    }

    function deleteAll(){
       setNoteList([])
       setDeleteList([]) 
    }

    function show(){
       if(deleteList.length<1)return setSost(true)
       setSost(!sost)
       console.log(sost)
    }

    const onKeyDown = e =>{
        if (e.keyCode === 13) {
            addItem()
            setSost(false)
        }
    }


return(
    <form onKeyDown={onKeyDown}  onSubmit={onFormSubmit}>
        <div  className="mainDiv">
            <div ref={app2}>
                <h1>Список дел</h1>
                <button className='btn' onClick={()=>show()}>Выполнено: {deleteList.length} <i className="box fa-solid fa-clipboard-check"></i></button> 
                <div className="addTaskDiv">
                    <input   value={userInput} placeholder="Введите текст..." type='text' onChange={(e)=>{onChangeEvent(e)}} />
                    <i className="fa-solid fa-square-plus addBtn" onClick={()=>addItem()}></i>
                </div>
                <ul>  
                    {noteList.map((item, index)=>(
                        <li className='liNote' key={index}>
                            {item}                  
                            <div>
                               <i className="fa-regular fa-trash-can" onClick={()=>deleteOne(item,index)}></i>
                               <i className="fa-solid fa-pencil" onClick={()=>redact(item,index)}></i>
                            </div>
                        </li>
                    ))}
                </ul> 
            </div>            
            <button className="btn" onClick={()=>deleteAll()}>Удалить всё</button>
        </div>
        <div ref={app}>
            <ul   className={sost? 'displayNone ':'displayBlock'}>
                <i  onClick={()=> setSost(true)} className="fa-solid fa-xmark"></i>
                {deleteList.map((item, index)=>(
                    <li className='liDelete' key={index}>
                        <p>{item }</p>                 
                        <i className="fa-solid fa-rotate-left" onClick={()=>returnOne(item,index)}></i>
                    </li>
                ))}
                <button className="deleteDoneBtn" onClick={()=>deleteDone()}>Очистить</button>
            </ul>     
        </div>
    </form> 
)
}

export default Note
























/*
import { Component } from "react";
import done from './done.png'
import red from './red.png'
import returnI from './return.png'




export class AppCode extends Component {



    state = {
        userInput:'',
        noteList: [],
        deleteList: [],
    }

    onChangeEvent(e){
        this.setState({userInput: e})
    }

    addItem(input){
        if (input===''){
            alert('Введите текст...')
        }
        else{
            let listArray=this.state.noteList;
            listArray.push(input);
            this.setState({noteList:listArray, userInput:''})
        }
    }

    deleteOne(input,index){
        let listArray=this.state.noteList;
        let delArray=this.state.deleteList;
        listArray.splice(index,1);
        delArray.push(input)   
        this.setState({noteList:listArray})
        this.setState({deleteList:delArray})
    }

    redact(input,index){
        let listArray=this.state.noteList;
        let pro=prompt('Введите изменения...',input);
        if(pro === null || pro === ""){
            return
        } 
        listArray.splice(index,1,pro);
        this.setState({noteList:listArray})
    }

    returnOne(input,index){
        let listArray=this.state.noteList;
        let delArray=this.state.deleteList;
        listArray.push(input);
        delArray.splice(index,1)
        this.setState({noteList:listArray})
        this.setState({deleteList:delArray})
    }

    deleteDone(){
        let delArray=this.state.deleteList;
        delArray=[];
        this.setState({deleteList:delArray})  
    }

    deleteAll(){
        let listArray=this.state.noteList;
        listArray=[];
        this.setState({noteList:listArray})
        let delArray=this.state.deleteList;
        delArray=[];
        this.setState({deleteList:delArray}) 
    }

    onFormSubmit(e){
        e.preventDefault()
    }

    render() {

        return(
            <form  className="mainDiv" onSubmit={this.onFormSubmit}>
                <div>
                <h1>Список дел</h1>
                <div className="addTaskDiv">
                    <input value={this.state.userInput} placeholder="Введите текст..." type='text' onChange={(e)=>{this.onChangeEvent(e.target.value)}} />
                    <button className="addBtn" onClick={()=>this.addItem(this.state.userInput)}>+</button>
                </div>
                <ul>
                    {this.state.noteList.map((item, index)=>(
                        <li key={index}>
                            {item }                  
                            <div>
                               <img src={done} width='26px' alt='del' onClick={()=>this.deleteOne(item,index)}  />
                               <img src={red} width='30px' alt='red' onClick={()=>this.redact(item,index)} />
                            </div>
                        </li>
                    ))}
                </ul>                
                <ul>
                    {this.state.deleteList.map((item, index)=>(
                        <li className="liTwo"  key={index}>
                            {item }                  
                            <img src={returnI} width='25px' alt='del' onClick={()=>this.returnOne(item,index)}  />
                        </li>
                    ))}
                </ul>
                </div>
                <div>
                <button className="deleteDoneBtn" onClick={()=>this.deleteDone()}>Удалить выполненное</button>
                <button className="deleteAllBtn" onClick={()=>this.deleteAll()}>Удалить всё</button>
                </div>
            </form>   
        )
    }

}*/