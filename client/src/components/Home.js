import React from 'react';

class Home extends React.Component{
  state={
    text:'',
    mywishes:[{_id:1,wish:"loading"}]
  }
  handledelete(id){
    fetch('/remove/'+id,{method:"delete"})
    .then(res=>res.json())
    .then(res2=>{
      console.log(res2)
      const newWishes = this.state.mywishes.filter(item=>{
        return item._id !== res2._id
      })
      this.setState({
        mywishes:newWishes
      })
    })
  }
  componentDidMount(){
    fetch('/data')
    .then(res=>res.json())
    .then(res2=>{
      console.log(res2)
      this.setState({
        mywishes:res2
      })
    })
  }
  handleSubmit(e){
        e.preventDefault();
       // const url = "http://localhost:5000/sent";
        var data = new URLSearchParams();
         for(const pair of new FormData(e.target)){
           data.append(pair[0],pair[1])
         }
         //localhost:5000/sent
        fetch('/sent',{
            method:"post",
            body:data,
           
        }).then(res=>res.json())
        .then(res2 => {
          console.log(res2)
        
          this.setState({
            mywishes:[...this.state.mywishes,res2]
          })
        }); 
  }
  render(){
     const list = this.state.mywishes.map(item=>{
       return <a className="collection-item" key={item._id} onClick={()=>this.handledelete(item._id)}>{item.wish}</a>
     })
      return(
        <div>
          <form onSubmit={(e)=>this.handleSubmit(e)}>
            <input 
              type="text"
              name="item"
              value={this.state.text} 
              onChange={(e)=>this.setState({text:e.target.value})}
               />
              <button type="submit" className="waves-effect waves-light btn">Add</button> 
          </form>

       <div className="collection">
         {list}
      </div>
        </div>
      )
  }
 
}

export default Home;
