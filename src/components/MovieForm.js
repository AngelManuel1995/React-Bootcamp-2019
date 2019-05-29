import React from 'react';

// function MovieForm () {


// }

class MovieForm extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            id:'',
            title:'',
            year:'',
            image:'',
            genre:'',
            overview:''
        }
        this.yearRef = React.createRef()
    }

    handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        this.setState({ 
            [name]: value 
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.onSubmit(this.state)
    }

    componentDidMount(){
        this.yearRef.current.focus()
        return null;
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit} className="form">
                <input type="text" name="id"                      placeholder="id" value={this.state.id}               onChange={this.handleChange} />
                <input type="text" name="title"                   placeholder="title" value={this.state.title}         onChange={this.handleChange} />
                <input ref={this.yearRef} type="text" name="year" placeholder="year" value={this.state.year}           onChange={this.handleChange} />
                <input type="text" name="image"                   placeholder="image" value={this.state.image}         onChange={this.handleChange} />
                <input type="text" name="genre"                   placeholder="genre" value={this.state.genre}         onChange={this.handleChange} />
                <input type="text" name="overview"                placeholder="overview" value={this.state.overview}   onChange={this.handleChange} />
                <input type="submit" value="Save" />
            </form>
        );
    }
}

export default MovieForm