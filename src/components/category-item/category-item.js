import React,{ Component } from 'react';

class CategoryItem extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div className="category-item d-flex justify-content-between align-items-center">
        <span className="item-name">{this.props.category.name}</span>
        <input className="" type="radio" name="list-radio" id="radio-1" value={this.props.category._id}/>
      </div>
    )
  }
}

export default CategoryItem;
