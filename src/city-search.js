import React from 'react';
import './App.css';
import axios from 'axios';

class CitySearch extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            city: '',
            results: []
        }

        this.getCity= this.getCity.bind(this);
        this.getResults = this.getResults.bind(this);
    }

    getCity(event){
        this.setState({city: event.target.value});
    }

    getResults(event){
        event.preventDefault();
        let city = this.state.city.toUpperCase();

     let url = 'http://ctp-zip-api.herokuapp.com/city/' + city;

         axios.get(url)
            .then(response =>{
                this.setState({results: response.data});
            })
            .catch(error=>{
                console.log(error);
            }) 

            console.log(this.state.results); 
    }
            

    render(){
        const result = this.state.results.map(index=>{
            return(
                <p>{index}</p>
            )});

        return(
            <div>
                <header id="page-header">
                    <h1>City Search</h1>
                </header>
                <div className="search-box">
                    <form>
                    <label>Search:</label>
                    <input  type ="text" onChange={this.getCity} />
                    <button onClick={this.getResults}>SUBMIT</button>
                    </form>
                </div>
                <div className="search-results">
                     <h2>Zip codes for this city:</h2> 
                     <br/>
                     {result.length > 0 ? <div id="res">{result }</div>: <div>No Results</div>  }
            	</div> 
                
            </div>
        );
    }
}


export default CitySearch;
