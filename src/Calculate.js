import React from 'react'
import NumberFormat from 'react-number-format'

const Calculate = () => {
    const [prev, setPrev] = React.useState("")
    const [curr, setCurr] = React.useState("")
    const [input, setInput] = React.useState("0")
    const [operator, setOperator] = React.useState(null)
    const [total, setTotal] = React.useState(false)

    const inputNum = e => {
        if(curr.includes(".") && e.target.innerText === ".") return

        if(total) {
            setPrev("")
        }

        curr ? setCurr(prevs => prevs + e.target.innerText) : setCurr(e.target.innerText)
        setTotal(false)
    }
    React.useEffect(() => {
        setInput(curr)
    },[curr])

    React.useEffect(() => {
        setInput("0")
    },[])

    const operatorType = (e) => {
        setTotal(false)
        setOperator(e.target.innerText)
        if(curr === "") return
        if(prev !== "") {
            equals()
        }
        else{
            setPrev(curr)
            setCurr("")
        }
    }
    const equals = (e) => {
        if(e?.target.innerText === "="){
            setTotal(true)
        }
        let cal
        switch (operator) {
            case "/":
                cal = String(parseFloat(prev) / parseFloat(curr))
                break;
            case "+":
                cal = String(parseFloat(prev) + parseFloat(curr))
                break;
            case "X":
                cal = String(parseFloat(prev) * parseFloat(curr))
                break;
            case "-":
                cal = String(parseFloat(prev) - parseFloat(curr))
                break;
        
            default:
                return;
        }
        setInput("")
        setPrev(cal)
        setCurr("")
    }

    const minusPlus = () => {
        if(curr.charAt(0) === "-"){
            setCurr(curr.substring(1))
        }
        else{
            setCurr("-" + curr)
        }
    }
    const percent = () => {
        curr ? setCurr(String(parseFloat(curr) / 100 * prev)) : setCurr(String(parseFloat(curr) / 100))
    }
    const reset = () => {
        setPrev("")
        setCurr("")
        setInput("0")
    }
    return (
        <>
            <div className="container">
                <div className="wrapper">
                    <div className="screen">
                        {input !== "" || input === "0" ? 
                            <NumberFormat 
                                value={input} 
                                displayType={'text'}
                                thousandSeparator={true} 
                            /> : 
                            <NumberFormat 
                                value={prev} 
                                displayType={'text'} 
                                thousandSeparator={true}
                            />
                        }
                    </div>
                    <div className="btn light-gray" onClick={reset}>AC</div>
                    <div className="btn light-gray" onClick={percent}>%</div>
                    <div className="btn light-gray" onClick={minusPlus}>+/-</div>
                    <div className="btn orange" onClick={operatorType}>/</div>
                    <div className="btn" onClick={inputNum}>7</div>
                    <div className="btn" onClick={inputNum}>8</div>
                    <div className="btn" onClick={inputNum}>9</div>
                    <div className="btn orange" onClick={operatorType}>X</div>
                    <div className="btn" onClick={inputNum}>4</div>
                    <div className="btn" onClick={inputNum}>5</div>
                    <div className="btn" onClick={inputNum}>6</div>
                    <div className="btn orange" onClick={operatorType}>+</div>
                    <div className="btn" onClick={inputNum}>1</div>
                    <div className="btn" onClick={inputNum}>2</div>
                    <div className="btn" onClick={inputNum}>3</div>
                    <div className="btn orange" onClick={operatorType}>-</div>
                    <div className="btn zero" onClick={inputNum}>0</div>
                    <div className="btn" onClick={inputNum}>.</div>
                    <div className="btn" onClick={equals}>=</div>
                </div>
            </div>
        </>
    )
}

export default Calculate
