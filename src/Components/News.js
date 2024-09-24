import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';

export class News extends Component {
  capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static propTypes={
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
  }

  static defaultProps={
    country:'in',
    pagesize: 10,
    category: "general",
  }
 
  constructor(props) {
    super(props);
    this.state = {
      article: [],
      loading: false,
      page : 1,
    };
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - TazzaKhabbar`;
  }

  // yeh render ke baad run hota h
  async componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=1&pageSize=${this.props.pagesize}`;
    this.setState({
      loading: true
    })
    let data = await fetch(url);
    let parseddata = await data.json();
    this.setState({
        article: parseddata.articles,
        totalarticle : parseddata.totalResults,
        loading: false,
      }
    )
  }

  handlenextclick = async ()=>{
    if(this.state.page+1 >Math.ceil(this.state.totalarticle/this.props.pagesize)){
      alert("No more news to Show");
    }
    else{    
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page +1}&pageSize=${this.props.pagesize}`;
        this.setState({
          loading: true
        })
        let data = await fetch(url);
        let parseddata = await data.json();

        this.setState({
          page: this.state.page +1,
          article: parseddata.articles,
          loading: false
        })
    }
  }

  handleprevclick = async ()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page-1}&pageSize=${this.props.pagesize}`;
    this.setState({
      loading: true
    })
    let data = await fetch(url);
    let parseddata = await data.json();

    this.setState({
      page: this.state.page -1,
      article: parseddata.articles,
      loading: false
    })
  }

  render() {
    return (
      <>
        <div className="container my-3">
          <h1 className="text-center" style={{ margin: '20px 0px', marginTop: '70px'}}>Top {this.capitalizeFirstLetter(this.props.category) == "General" ? "" : this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
          {this.state.loading && <Spinner/>}
          <hr style={{height: "3px",color:"#333",backgroundColor: "#333"}}/>
          <div className="row">
            {!this.state.loading && this.state.article.map((element) => {
              return <div className="col-md-3 my-2" key={element.url}>
                <Newsitem  title={element.title} description={element.description? element.description:""} url = {element.urlToImage} newsurl = {element.url} source = {element.source.name} />
              </div>;
            })}
          </div>
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled = {this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handleprevclick}>	&#8592; Previous</button>
          <button disabled = {this.state.page+1 >Math.ceil(this.state.totalarticle/this.props.pagesize)} type="button" className="btn btn-dark" onClick={this.handlenextclick}>Next &#8594;</button>
        </div>
      </>
    );
  }
}
