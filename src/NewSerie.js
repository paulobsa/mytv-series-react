import React, { Component } from 'react' 
import api from './Api'
import { Redirect } from 'react-router-dom'

const statuses = {
    'watched': 'Assitido',
    'watching': 'Assistindo',
    "toWatch": "Assistir"
}

class NewSerie extends Component{
    
    constructor(props){
        super(props)
    
        this.state = {
          genres: [],
          isLoading: false,
          redirect: false
        }

        this.saveSerie = this.saveSerie.bind(this)
    }

    componentDidMount(){
        this.setState({ isLoading: true })
        api.loadGenres()
          .then((res)=>{
            this.setState({
              isLoading: false,
              genres: res.data
            })
          })
    }

    saveSerie(){
        const newSerie = {
            name: this.refs.name.value,
            status: this.refs.status.value,
            genre: this.refs.genre.value,
            comments: this.refs.comments.value 
        }
        api.saveSeries(newSerie)
            .then((res)=>{
                this.setState({
                    redirect: '/series/'+this.refs.genre.value
                })
            })
    }

    render() {
        return( 
            <section className="intro-section">
                { this.state.redirect &&
                    <Redirect to={this.state.redirect} />
                }
                <h1>Nova Série</h1> 
                <form>
                    Nome: <input type="text" ref='name' className="form-control" ></input> <br/>
                    Status: 
                    <select ref='status' className='form-control'>
                        { Object
                            .keys(statuses)
                            .map( key => <option key={key} value={key}>{statuses[key]}</option>) }
                    </select> <br/>
                    Gênero: 
                    <select ref='genre' className='form-control'>
                        { this.state.genres
                            .map( key => <option key={key} value={key}>{key}</option>) }
                    </select> <br/>
                    Comentários: <textarea ref='comments' type="text" className="form-control" ></textarea> <br/>
                    <button type="button" onClick={this.saveSerie}>Salvar</button>
                </form>
            </section>
        )
    }
}

export default NewSerie