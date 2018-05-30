import React, { Component } from 'react';
import { connect } from 'react-redux';
import _  from 'lodash';
import { categoriesSetData } from '../../actions/categoriesAction';
import { categoriesFetchData } from '../../actions/categoriesAction';
import  CategoryItem  from '../category-item/category-item';
import ActionsBar from '../actions-bar/actions-bar';

class CategoriesList extends Component{
  constructor(props){
    super(props);
  }
  render(){
    const { categories } = this.props;
    const actionsBar = {
      title: 'Categories',
      showMap: false,
      showInfo: false,
      actions: [
        {
          text: 'add category',
          link: ''

        },
        {
          text: 'edit category',
          link: ''

        },
        {
          text: 'delete category',
          link: ''

        }
      ]
    }


    const renderCategoriesList = () =>{
      return Object.keys(categories).map((key) =>{
        const category = categories[key];
          return (
            <li key ={category._id} className="list-group-item mb-4"><CategoryItem category = {category} /></li>
          )
      })
    }

    return(
      <div className="categories">
        <ActionsBar actionsBar={actionsBar}></ActionsBar>
        <div className="categories-list mt-4">
          <div className="row">
            <div className="col-md-12">
              <ul className="list-group">
               {renderCategoriesList()}
              </ul>
            </div>
          </div>
        </div>
      </div>

    )
  }

  componentDidMount(){
    this.props.fetchDatacategories('categories');
  }

}
const mapStateToProps = (state) =>{
  return{
    categories: state.categories.categories
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
    fetchDatacategories: (term) => dispatch(categoriesFetchData(term)),
    setDataCategories: (categories, term) => dispatch(categoriesSetData(categories, term)),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoriesList);
