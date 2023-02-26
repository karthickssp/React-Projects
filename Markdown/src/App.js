import './App.css';
import {marked} from 'marked';
import React from 'react';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markup: placeholder,
      isEditorMaximized: false,
      isPreviewMaximized: false
    }
    this.changeHandler = this.changeHandler.bind(this);
      this.handleEditorSize = this.handleEditorSize.bind(this);
      this.handlePreviewSize = this.handlePreviewSize.bind(this);
  }
  
  changeHandler(e) {
    this.setState({
      markup: e.target.value
    })
  }
  
  handleEditorSize() {
    this.setState({
      isEditorMaximized: !this.state.isEditorMaximized
    });
  }
  
  handlePreviewSize() {
        this.setState({
            isPreviewMaximized: !this.state.isPreviewMaximized
        });
      }
  
  render() {
    return (
      <div className='container'>
                <div className='editorWrap'>
                    <Toolbar
                        isMaximized={this.state.isEditorMaximized}
                        onChange={this.handleEditorSize}
                      text='Editor' />
                    <Editor
                        markup={this.state.markup}
                        isMaximized={this.state.isEditorMaximized}
                        onChange={this.changeHandler} />
                </div>
                <div className='previewWrap'>
                    <Toolbar
                        isMaximized={this.state.isPreviewMaximized}
                        onChange={this.handlePreviewSize}
                      text='Preview'/>
                    <Preview
                        markup={this.state.markup}
                        isMaximized={this.state.isPreviewMaximized} />
                </div>
            </div>
    )
  }
}

const Editor = ({markup, onChange, isMaximized}) => {
  return (
      <div>
        <textarea value={markup} onChange={onChange} id='editor'
          style={{height: isMaximized ? '300px' : '150px' }}></textarea>
      </div>
  )
}

marked.setOptions({
  breaks: true
});

const Preview = ({markup, isMaximized}) => {
  const getMarkdownText = () => {
    let rawMarkup = marked.parse(markup);
    return { __html: rawMarkup };
  }
  
  return (
      <div dangerouslySetInnerHTML={getMarkdownText()} id='preview'
        className='previewContainer'
        style={{height: isMaximized ? 'auto' : '250px'}}>
      </div>
  )
}

const Toolbar = ({isMaximized,
        onChange, text}) => {
    return (
      <div className='toolbar'>
        <div>
        <i className="fab fa-free-code-camp"></i>
          <strong> {text}</strong>
        </div>
        <i className={isMaximized ? "fas fa-compress-arrows-alt" : "fas fa-expand-arrows-alt"}
          title={isMaximized ? "Minimize" : "Maximize"}
        onClick={onChange}
        ></i>
      </div>
    )
  }

const placeholder = `
# Welcome to my React Markdown Previewer!

## This is a sub-heading...

There's also [links](https://www.freecodecamp.org)

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:
function add(a, b) {
    return a+b;
}
\`\`\`

- And there are lists.
- with a nested list
  - That looks like this.

> And Block Quotes too!

You can also make text **bold**...

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

export default App