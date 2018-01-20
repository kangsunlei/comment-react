import React, { Component } from 'react';
import marked from 'marked';
import hljs from 'highlight.js';
import { debounce, ajax } from '../../core/common';
import Input from 'material-ui/Input';
import Button from 'material-ui/Button';
import { ADD_DRAFTS } from '../../constants/API';

import 'highlight.js/styles/tomorrow-night.css';
import '../../css/editor.css';

export default class Editor extends Component {
    constructor() {
        super();
        this.state = {
            showHtml: ''
        };
        marked.setOptions({
            highlight: function (code) {
                return hljs.highlightAuto(code).value;
            }
        });
    }

    componentDidMount() {
        this.handleInput();
    }

    handleInput = debounce(() => {
        const markDown = this.editor.value;
        this.setState({
            markDown,
            showHtml: marked(markDown, { sanitize: true })
        });
    });

    handlePublish = () => {
        if(!this.titleEl.value.trim()) {
            this.titleEl.focus();
        } else {
            ajax({
                url: ADD_DRAFTS,
                method: 'post',
                data: {
                    title: this.titleEl.value.trim(),
                    content: this.state.markDown
                }
            }).then((res) => {
                if(res.success) {

                }
            });
        }
    }

    render() {
        const { showHtml } = this.state;
        return (
            <div className="main-content editor">
                <div className="editor-header">
                    <Input
                        placeholder="输入文章标题"
                        className="title"
                        disableUnderline={true}
                        inputProps={{
                            'aria-label': 'Description'
                        }}
                        inputRef={el => this.titleEl = el }
                    />
                    <Button raised color="primary" onClick={this.handlePublish}>
                        发布
                    </Button>
                </div>
                <div className="editor-content">
                    <textarea className="edit" ref={el => this.editor = el} onInput={this.handleInput} onChange={this.handleInput} defaultValue="# hello" spellCheck="false"></textarea>
                    <div className="show" dangerouslySetInnerHTML={{ __html: showHtml }}></div>
                </div>
            </div>
        );
    }
}
