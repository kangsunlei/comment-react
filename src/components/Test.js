import React, { Component } from 'react';
import Input from 'material-ui/Input';
import Button from 'material-ui/Button';
import '../css/test.css';

export default class Test extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: ''
        };
    }

    componentDidMount() {
        this.initWebsoclet();
    }

    initWebsoclet = () => {
        const ws = this.ws = new WebSocket('ws://localhost:3001');
        ws.onopen = () => {
            this.setState({
                result: 'Connected'
            });
        };

        ws.onclose = () => {
            this.setState({
                result: 'Closed'
            });
        };

        ws.onmessage = (res) => {
            this.setState({
                result: res.data
            });
        };
    }

    handleSendMsg = () => {
        const text = this.input.value;
        if(text) {
            this.ws.send(text);
        }
    }

    render() {
        const { result } = this.state;

        return (
            <div className="test-section">
                <Input inputRef={(el) => this.input = el}/>
                <Button color="primary" onClick={this.handleSendMsg}>提交</Button>
                <div className="result">{result}</div>
            </div>);
    }
}