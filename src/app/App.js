import React,{Component} from 'react'

class App extends Component{

    constructor(){
        super();
        this.state = {
            title:'',
            description:'',
            hour:'',
            date:'',
            img:'',
            tasks:[],
            _id:''
        };
        this.addTask = this.addTask.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }


    //post
addTask(e){
  if(this.state._id){
    fetch(`/api/tasks/${this.state._id}`,{
        method:'PUT',
        body:JSON.stringify(this.state),
        headers:{
            'Accept':'Application/json',
            'Content-Type':'Application/json'
        }
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data);
        M.toast({html:'Task Update'});
        this.setState({title:'',description:'' ,hour:'',date:'',img:'',_id:''});
        this.fetchTasks();

    });

  }else{
        fetch('/api/tasks',{
         method:'POST',
         body:JSON.stringify(this.state),
         headers:{
            'Accept':'Application/json',
            'Content-Type':'Application/json'
         }
           })
           .then(res=>res.json())
           .then(data=>{
               console.log(data)
               M.toast({html:'Task Saved'})
               this.setState({title:'',description:'',hour:'',date:'',img:''});
               this.fetchTasks();
           })
           .catch(err=>console.log(err));
       }

    }

    //hacer que aparezcan los datos desde que se entre a la pagina
     componentDidMount(){
      this.fetchTasks();
     }

  
    //get
    fetchTasks(){
        fetch('/api/tasks')
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            this.setState({tasks:data});
            console.log(this.state.tasks);
        })
        .catch(err=>console.log(err));
    }


       //delete
     deleteTask(id){
     if(confirm('Are you sure what you wanna delete it?')){
        fetch(`/api/tasks/${id}`,{
            method:'DELETE',
            body:JSON.stringify(this.state),
            headers:{
                'Accept':'Application/json',
                'Content-Type':'Application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            M.toast({html:'Task Deleted'});
            this.fetchTasks();
        })
      }
     }

       //delete
       doneTask(id){
        if(confirm('Are you sure what you completed it?')){
           fetch(`/api/tasks/${id}`,{
               method:'DELETE',
               body:JSON.stringify(this.state),
               headers:{
                   'Accept':'Application/json',
                   'Content-Type':'Application/json'
               }
           })
           .then(res=>res.json())
           .then(data=>{
               console.log(data);
               M.toast({html:'You do it'});
               this.fetchTasks();
           })
         }
        }

     //update
     editTask(id){
         fetch(`/api/tasks/${id}`)
         .then(res=>res.json())
         .then(data=>{
            console.log(data)
            this.setState({
                title:data.title,
                description:data.description,
                hour:data.hour,
                date:data.date,
                img:data.img,

                _id:data._id
            })
         })
     }

    

    handleChange(e){
        e.preventDefault();
        const {name,value} = e.target;
        this.setState({
            [name]:value
        })
    };


    render(){
        return <div>
            {/*navegacion*/}
            <nav className="light-blue darken-4">
                <div className="container">
                    <a className="brand-logo" href="/">Mern stack</a>
                </div>
            </nav>
            <div className="container">
                <div className="row">
                    <div className="col s12">
                       <div className="card">
                           <div className="card-content">
                               <form onSubmit={this.addTask}>
                                   <div className="row">
                                       <div className="input-field col s12">
                                           <input name="title"  value={this.state.title} onChange={this.handleChange} type="text" placeholder="Task Title"/>
                                       </div>
                                   </div>
                                   <div className="row">
                                       <div className="input-field col s12">
                                        <textarea name="description" value={this.state.description}  onChange={this.handleChange} placeholder="Task description" className="materialize-textarea"></textarea>                                       
                                        </div>
                                   </div>
                                   <div className="row">
                                       <div className="input-field col s12">
                                        <input name="hour" type="time" value={this.state.hour}  onChange={this.handleChange} placeholder="Task hour" ></input>                                       
                                        </div>
                                   </div>
                                   <div className="row">
                                       <div className="input-field col s12">
                                        <input name="date" type="date" value={this.state.date}  onChange={this.handleChange} placeholder="Task date" ></input>                                       
                                        </div>
                                   </div>
                                   <div className="row">
                                       <div className="input-field col s12">
                                        <input name="img" type="file" value={this.state.img}  onChange={this.handleChange} placeholder="Task image" ></input>                                       
                                        </div>
                                   </div>
                                  
                            
                                   <button type="submit" className="btn light-blue darken-4">Send</button>
                               </form>
                           </div>
                       </div>
                    </div>
                    <div className="col s12">
                       <table>
                           <thead>
                              <tr>
                                  <th>Title</th>
                                  <th>Description</th>
                                  <th>Hour</th>
                                  <th>Date</th>
                                  <th>image</th>


                              </tr>
                           </thead>
                           <tbody className="">
                              {
                                  this.state.tasks.map(task=>{
                                      return (
                                          <tr key={task._id}>
                                              <td>{task.title}</td>
                                              <td>{task.description}</td>
                                              <td>{task.hour}</td>
                                              <td>{task.date}</td>
                                              <td>{task.img}</td>


                                              <td>
                                                  <button className="btn #fb8c00 orange darken-1"
                                                  onClick={()=>this.editTask(task._id)}>
                                                      <i className="material-icons">edit</i>
                                                  </button>

                                                  <button className="btn #b71c1c red darken-4" 
                                                  style={{margin:'10px'}}
                                                  onClick={()=>this.deleteTask(task._id)}>
                                                  <i className="material-icons">delete</i>
                                                  </button>

                                                  <button className="btn #00bfa5 teal accent-4" 
                                                  style={{margin:'10px'}}
                                                  onClick={()=>this.doneTask(task._id)}>
                                                  <i className="material-icons">done</i>
                                                  </button>
                                              </td>
                                          </tr>
                                      )

                                  })
                              }
                           </tbody>
                       </table>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default App;