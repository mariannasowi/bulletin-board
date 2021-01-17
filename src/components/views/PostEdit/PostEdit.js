import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { createPostDate } from '../../../utils/formatDate';

import clsx from 'clsx';

import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { connect } from 'react-redux';
import { getPostById, updatePost } from '../../../redux/postsRedux.js';

import styles from './PostEdit.module.scss';

class Component extends React.Component {
  state = {
    postData: { ...this.props.post },
  }

  handleChange = ( { target } ) => {
    const { postData } = this.state;
    const { value, id } = target;
    this.setState( { postData: { ...postData, [ id ]: value } } );
  }

  handleStatusChange = ( e ) => {
    const { postData } = this.state;
    const { value } = e.target;
    this.setState( {
      postData: {
        ...postData,
        status: value,
      },
    } );
  }

  handleUpdateDateChange = () => {
    const { postData } = this.state;
    const date = createPostDate();
    this.setState( {
      postData: {
        ...postData,
        updated: date,
      },
    } );
  }

  submitForm = ( e ) => {
    const { postData } = this.state;
    const { updatePost } = this.props;
    e.preventDefault();

    let error = null;

    if ( !postData.title.length || !postData.text.length || !postData.email.length ) error = `You can't leave title, text or email fields empty`;
    else if ( postData.title.length < 10 || postData.text.length < 20 ) error = `Title can't be shorter than 10 characters or text than 20 characters`;
    if ( !error ) {
      updatePost( postData );
      alert( 'Post saved successfully' );
    } else {
      alert( error );
    }
  }

  render () {
    const { className, post } = this.props;
    const { postData } = this.state;
    const { submitForm, handleChange, handleStatusChange, handleUpdateDateChange } = this;
    return (
      <Paper className={ clsx( className, styles.root ) }>
        <h2>Edit your post</h2>
        {post ? (
          <form className={ clsx( className, styles.form ) } onSubmit={ submitForm }>
            <TextField className={ styles.title } id='title' label='Title' variant='outlined' InputProps={ { minLength: 10 } } required fullWidth onChange={ handleChange } value={ postData.title } />
            <TextField className={ styles.text } id='text' label='text' variant='outlined' InputProps={ { minLength: 20 } } required fullWidth onChange={ handleChange } value={ postData.text } />
            <TextField className={ styles.price } id='price' label='Price' variant='outlined' type='number' InputProps={ {
              startAdornment: <InputAdornment position='start'>$</InputAdornment>,
            } } defaultValue='0' onChange={ handleChange } value={ postData.price } />
            <TextField className={ styles.phone } id='phone' label='Phone' variant='outlined' onChange={ handleChange } value={ postData.phone } />
            <TextField className={ styles.location } id='location' label='Location' variant='outlined' onChange={ handleChange } value={ postData.location } />
            <TextField className={ styles.mail } id='email' label='E-mail' variant='outlined' required fullWidth onChange={ handleChange } value={ postData.email } />
            <Select labelId="status" id="status" value={ postData.status } onChange={ handleStatusChange } label="Status">
              <MenuItem value='published'>Published</MenuItem>
              <MenuItem value='closed'>Closed</MenuItem>
            </Select>
            <Button className={ styles.submit }
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              onClick={ handleUpdateDateChange }>
              Save your changes
            </Button>
            <Button className={ styles.submit }
              variant="contained"
              color="primary"
              component={ Link } exact to={ `/post/${ post.id }` } >See edited post
            </Button>
          </form>
        ) : ( <p>Sorry, there is no post. Go to  <Button className={ styles.button } variant="contained" color="primary" component={ Link } to={ '/' }>
          Homepage</Button> </p> ) }
      </Paper>
    );
  }
}

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  post: PropTypes.object,
  updatePost: PropTypes.func,
};

const mapStateToProps = ( state, props ) => ( {
  post: getPostById( state, props.match.params.id ),
} );

const mapDispatchToProps = dispatch => ( {
  updatePost: ( data ) => dispatch( updatePost( data ) ),
} );

const Container = connect( mapStateToProps, mapDispatchToProps )( Component );

export {
  Container as PostEdit,
  Component as PostEditComponent,
};
