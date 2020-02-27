import React from 'react';
import {connect} from 'react-redux'
import {handleAddTweet} from '../actions/tweets'
import { Redirect } from 'react-router-dom';
class NewTweet extends React.Component {
    state = {
        text: '',
        toHome: false
    };

    handleInputChange = (e) => {
        this.setState({
            text: e.target.value
        })
    };
    handleSubmit = (e) => {
        e.preventDefault();
        const {dispatch, id} = this.props;
        const {text} = this.state;
        // console.log(this.state.text);
        dispatch(handleAddTweet(text, id));
        this.setState({
            text: '',
            toHome: !id,
        })

    };

    render() {
        const {text, toHome} = this.state;
        if (toHome === true) {
            return <Redirect to='/' />
        }
        const characterCount = 280 - text.length;
        return (
            <div>
                <h3 className='center'>New Tweet</h3>
                <form onSubmit={this.handleSubmit} className='new-tweet'>
                    <textarea
                        value={text}
                        onChange={this.handleInputChange}
                        className='textarea'
                        placeholder="What's happening"
                        maxLength="280"/>
                    {characterCount <= 100 &&
                    <span className='tweet-length'>{
                        characterCount === 0
                            ? "Out of characters 😆"
                            : `Remaining ${characterCount} characters`}</span>}
                    <button type='submit' disabled={text === ''} className='btn'>Tweet</button>
                </form>
            </div>
        )
    }
}

export default connect()(NewTweet)
