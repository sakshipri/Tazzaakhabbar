import { getByTitle } from "@testing-library/react";
import React, { Component } from "react";

export class Newsitem extends Component {
  render() {
    let { title, description, url, newsurl,source } = this.props;
    return (
      <div className="card">
         <span className = "position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: "85%" , zIndex : '1'}}>
            {source}
            <span className = "visually-hidden">unread messages</span>
          </span>
        <img
          src={
            !url
              ? "https://media.istockphoto.com/vectors/world-news-flat-vector-icon-news-symbol-logo-illustration-business-vector-id929047972"
              : url
          }
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
         
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a href={newsurl} target="_blank" className="btn btn-sm btn-primary">
            Read more
          </a>
        </div>
      </div>
    );
  }
}

export default Newsitem;
