import './App.css';
import React,{Component} from 'react';
import InputFile from './Components/InputFile';
import images from './images.gif';
import moment from 'moment';


class App extends Component{
  constructor(){
    let now = moment();
    let date1=now.format("ddd,D MMM");
    let time1=now.format("h:mm a"); 

     super();
     this.state={
       input:"Pune",
       data:[],
        date : date1,
        time : time1,
        getData: true
     }
  }

  Inputting=async(event)=>{
    if(event.keyCode!==13) return;
    let searchCity = event.target.value.replace(/[^\w\s]/gi, "");
    let input = searchCity.length !== 0 ? searchCity.charAt(0).toUpperCase() + searchCity.slice(1) : "Pune";
   await this.setState({ input: input });
   await this.fetchDataThroughApi(input)
  }

  

  fetchDataThroughApi=async(input)=>{
     await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=3adf4233abdffeb8d7d85223ba789b13`)
    .then(response=>response.json())
    .then((data)=>{
      if(data.cod === 200){
        this.setState({data:data.main})
        // console.log(data)
       }else
      this.setState({data:data})
      
    })
  }
 
  render(){
    if (this.state.input && this.state.getData===true) {
      this.setState({getData:false});
        this.fetchDataThroughApi(this.state.input);
      }
    return(
     <div>
      <div id="time">
         <h1>Date:{this.state.date}</h1>
         <h1>Time:{this.state.time}</h1>
      </div>
      <div  className="container App">
           <div className="container_in">
            <p className="city_name">{this.state.input}</p>
             <img src={images} alt="weather" className="image"/>
                  <div className="">
                    {this.state.input?
                        <div className="data">
                            <p>{this.state.data.temp ?"Temperature :" +this.state.data.temp+"°C":""}</p><br />
                            <p>{this.state.data.temp_min?"Minimum : "+this.state.data.temp_min+"°C":""}{this.state.data.temp_max?" | Maximum : "+this.state.data.temp_max+"°C":<p>Name not found</p>}</p>
                        </div> :""
                     }  
                  </div>
                <InputFile Inputting={this.Inputting}/>
          </div>
       </div>
       
      </div>
     
    )
  }
}


export default App;