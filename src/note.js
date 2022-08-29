import { Component } from "react";
import del from './del.png'
import red from './red.png'
import returnI from './return.png'


export class AppCode extends Component{
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
            <form className="mainDiv" onSubmit={this.onFormSubmit}>
                <div>
                <h1>Список дел на сегодня</h1>
                <div className="addTaskDiv">
                    <input value={this.state.userInput} placeholder="Введите текст..." type='text' onChange={(e)=>{this.onChangeEvent(e.target.value)}} />
                    <button className="addBtn" onClick={()=>this.addItem(this.state.userInput)}>+</button>
                </div>
                <ul>
                    {this.state.noteList.map((item, index)=>(
                        <li key={index}>
                            {item }                  
                            <div>
                               <img src={del} width='25px' alt='del' onClick={()=>this.deleteOne(item,index)}  />
                               <img src={red} width='25px' alt='red' onClick={()=>this.redact(item,index)} />
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

}