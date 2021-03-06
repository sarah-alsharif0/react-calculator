import React,{useState} from 'react'
import {Display} from '../display/display.js'
import {ButtonsContainer} from '../buttonsContainer/buttonsContainer.js'
import '../container/container.css'
import { Header } from '../header/header.js'
import { Fragment } from 'react'

export const Container = () => {
    const [data, setData] = useState({
        firstNum: 0,
        secondNum: null,
        operator: ''
    });
    const isOperator = (op) => {
        return (op === '/' ||
                op === 'X' || 
                op === '+' || 
                op === '-' || 
                op === '%')
    }
    const handleOperator = (op) => {
        if(data['secondNum'] === null){
            setData({...data, operator: op})
        } else {
            handleEqual(op);
        }
    }
    const  handleEqual = (op) => {
        if(data['secondNum']!== null){
            if(data['operator'] === '+'){
                setData({secondNum:null,firstNum: Number(data['firstNum'])+Number(data['secondNum']), operator:op})
            } else if(data['operator'] === '-'){
                setData({firstNum: data['firstNum']-data['secondNum'], secondNum:null, operator:op})
            } else if(data['operator'] === 'X'){
                setData({firstNum: data['firstNum']*data['secondNum'], secondNum:null, operator:op})
            } else if(data['operator'] === '/'){
                setData({firstNum: data['firstNum']/data['secondNum'], secondNum:null, operator:op})
            } else if(data['operator'] === '%'){
                setData({firstNum: data['firstNum']%data['secondNum'], secondNum:null, operator:op})
            } 
        }
    }
    const handleNumber = (num) => {
        if(data['operator'] === '' || data['operator'] === '='){
            if(data['firstNum'] === 0 || data['operator'] === '='){
                setData({...data, firstNum: parseFloat(num), operator: ''});
            } else {
                if(data['firstNum'])
                setData({...data, firstNum: parseFloat(data['firstNum']+num)})
            }
        } else {
            if(data['secondNum'] === null){
                setData({...data, secondNum: parseFloat(num)});
            } else {
                if(data['secondNum'])
                setData({...data, secondNum: parseFloat(data['secondNum']+num)})
            }
        }
    }
    const handleClick = (character) => {
        if(character === '+-'){
            setData({...data, 
                firstNum: data['firstNum']*-1
            });
        } else if (character === 'C'){
            setData({
                firstNum:0,
                secondNum: null,
                operator:''
            });
        } else if (!isNaN(character) || character === '.'){
            handleNumber(character);
        } else if (isOperator(character)){
            handleOperator(character);
        } else if (character === '='){
            handleEqual('=');
        }
        console.log(data);
    }
    return (
        <Fragment>
            <Header />
            <div className="calculator-container">
                <Display value={data}/>
                <ButtonsContainer handleClick={handleClick}/>
            </div>
        </Fragment>
    )
}
