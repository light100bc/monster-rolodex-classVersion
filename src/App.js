import logo from './logo.svg';
import './App.css';
import { Component } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

class App extends Component{
  // class 继承都是原型链
  constructor(){
    super();
    this.state={
      monsters:[],
      searchField:''   
    };
  }

  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(response=>response.json())
    .then((users)=>
    this.setState(
      ()=>{return {monsters:users}},
      ()=>{console.log(this.state)}))
  }

  onSearchChange=(event)=>{
    const searchField=event.target.value.toLocaleLowerCase();
    this.setState(()=>{
      return{searchField}
    })
  }

  render() {
    
    const {monsters,searchField}=this.state
    const {onSearchChange}=this
    const filteredMonsters=monsters.filter((monster)=>{
      return monster.name.toLocaleLowerCase().includes(searchField)})

 
    return(
    <div className="App"> 
      <h1 className='app-title'>Monster Rolodex</h1>
      <SearchBox onChangeHandler={onSearchChange} 
        placeholder='search monsters' className='search-box'/>
      <CardList monsters={filteredMonsters} />
      {/* {filteredMonsters.map((monster)=>{
        return( 
        <div key={monster.name}>
          <h1>{monster.name}</h1>
        </div>)
        })} */}
    </div>
  );
  }
}

export default App;
