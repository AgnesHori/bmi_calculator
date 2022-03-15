import React, {useState} from 'react'
import './index.css'

function App() {
  const [height, setHeight] = useState(0)
  const [weight, setWeight] = useState(0)
  let [heightErr, setHeightErr] = useState("")
  let [weightErr, setWeightErr] = useState("")
  const [bmi, setBmi] = useState('')
  const [message, setMessage] = useState('')


  const calcBmi=(e)=>{
    e.preventDefault()

    if(!validate()) {
      return 
    }
      let bmi = (weight / (height/100 * height/100))
      setBmi(bmi.toFixed(1))

      if (bmi < 18.5){
        setMessage('You are underweight')
      } else if (bmi >= 18.5 && bmi < 24.9) {
        setMessage('You are normal weight')
      } else if (bmi >= 25 && bmi < 29.9){
        setMessage ('You are overweight')
      } else if (bmi >= 30 && bmi < 34.9){
        setMessage ('You are obese')
      } else {
        setMessage ('You are extremly obese')
      }
    }


  let imgSrc;

  if (bmi < 1) {
    imgSrc = null
  } else {
    if(bmi < 18.5) {
      imgSrc = require('./image1.png')
    } else if(bmi >= 18.5 && bmi < 24.9) {
      imgSrc = require('./image2.png')
    } else if(bmi >= 25 && bmi < 29.9) {
      imgSrc = require('./image3.png')
    } else if (bmi >= 30 && bmi < 34.9) {
      imgSrc = require('./image4.png')
    } else {
      imgSrc = require('./image5.png')
    }
  }


  let reload=()=>{
    window.location.reload()
  }


      const minHeight = 95
      const maxHeight = 220
      const minWeight = 10
      const maxWeight = 300

      

      //limiting input to numbers
      const handleKeyPress = (source, event) => {
        let allowedChars = ".0123456789"
        let currentChar = event.key
        let found = false
        for (let i = 0;  i < allowedChars.length; i++) {
          if (currentChar === allowedChars[i]) {
            found = true
          }
        }
        if(found === false) {
          event.preventDefault()
          return
        }

      //limiting number input in height/weight
      let currentValue = ""   
            if (source === 'height') {
              currentValue = parseInt(height + currentChar)
              if (currentValue > maxHeight) {
                event.preventDefault()
              } 
            } else {
              currentValue = parseInt(weight + currentChar)
              if (currentValue > maxWeight) {
                event.preventDefault()
              }
            }

            if(currentValue === 0) {
                event.preventDefault()
            }
      }

      const validate = () => {
        setHeightErr("")
        setWeightErr("")

        let heightErrStr = ""
        let weightErrStr = ""

        //error messageges for H/W
        if(!height) {
          heightErrStr = "Please, enter height"
        } else if(height < minHeight) {
          heightErrStr = "Greater than 95 cm, please"
        } else if(height > maxHeight) {
          heightErrStr = "Less than 240 cm, please"
        }
          
        if(!weight) {
          weightErrStr = "Please, enter weight"
        } else if(weight < minWeight) {
           weightErrStr = "Greater than 10 kg, please"
        } else if(weight > maxWeight) {
           weightErrStr = "Less than 500 kg, please"
        }
      
       if(heightErrStr || weightErrStr) { 
          setHeightErr(heightErrStr)
          setWeightErr(weightErrStr)
          return false 
        }
        return true 
      }


  return (
    <div className='app'>
      <div className='container'>
        <h2 className='center'>BMI Calculator</h2>
        <form onSubmit={calcBmi}>
          <div>
          <div>
          <label>Height (95cm-220cm)</label>
          <input value={height} onChange={(e) =>setHeight(e.target.value)} onKeyPress={handleKeyPress.bind(this, 'height')}/>
          </div>
          <div className="error">{heightErr}</div>
          <div>
            <label>Weight (10kg-300kg)</label>
            <input value={weight} onChange={(e) =>setWeight(e.target.value)} onKeyPress={handleKeyPress.bind(this, 'weight')}/>
          </div>
            <button className='btn' type='submit'>Submit</button>
            <button className='btn btn-outline' onClick={reload} type='submit'>Reload</button>
          </div>
          <div className="error">{weightErr}</div>
        </form>

        <div className='center'>
          <h3>Your BMI is: {bmi}</h3>
          <p>{message}</p>
        </div>

        <div className='img-container'>
          <img src={imgSrc} alt=''></img>

        </div>
      </div>
    </div>
    
  );
}

export default App;
