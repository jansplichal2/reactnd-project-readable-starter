import React, {Component} from 'react';
import { connect } from 'react-redux';

class PostForm extends Component {
    state = {
      title: '',
      body: '',
      category: ''
    };

    constructor(props){
        super(props);
        this.updateForm = this.updateForm.bind(this);
    }

    updateForm(){

    }

    render() {
        const { categories } = this.props;
        return (
            <div className="row">
                <div className="col-6">
                    <form>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" className="form-control" id="title" aria-describedby="titleHelp"
                                   placeholder="Enter title"/>
                            <small id="titleHelp" className="form-text text-muted"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="body">Body</label>
                            <textarea className="form-control" id="body" rows="5" placeholder=""/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <select className="form-control" id="category">
                                {categories.map(category => (
                                    <option key={category.path}>
                                        {category.name}
                                    </option>)
                                )}
                            </select>
                        </div>
                        <button type="submit" className="btn-lg btn-outline-primary">Add Post</button>
                        <button type="reset" className="btn-lg btn-outline-secondary">Cancel</button>
                    </form>
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state) => ({
    categories: state.categories
});

export default connect(mapStateToProps)(PostForm);
