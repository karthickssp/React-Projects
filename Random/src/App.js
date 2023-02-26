import './App.css';
import React from 'react'

const myQuotes = [
  {
      quote: "The unexamined life is not worth living.", 
      author: "Socrates"
  },
  {
      quote: "I think therefore Iam.", 
      author: "Rene Descartes"
  },
  {
      quote: "What is rational is actual and what is actual is rational.", 
      author: "G.W.F. Hegel"
  },
  {
      quote: "One cannot step twice in the same river.", 
      author: "Heraclitus"
  },
  {
      quote: "Even while they teach, men learn.",
      author: "Seneca the Younger"
  },
  {
      quote: "The journey of a thoudsand miles begins with one step.",
      author: "Lao Tzu"
  },
  {
      quote: "Eloquence is a painting of the thoughts.",
      author: "Blaise Pascal"
  },
  {
      quote: "History repeats itself, first as tragedy, second as farce.",
      author: "Karl Marx"
  },
  {
      quote: "Patience is bitter, but its fruit is sweet.",
      author: "Jean-Jacques Rousseau"
  },
  {
      quote: "Wrong life cannot be lived rightly.",
      author: "Theodor W. Adorno"
  }
];

const txtBgColor = [
  '#d2b4de', '#aed6f1', '#f5b7b1',
  '#a3e4d7', '#abebc6', '#f9e79f',
  '#e5e7e9', '#aeb6bf', '#33fff6',
  '#fe62fa'
];


const getMyQuote = (arrQuotes) => {
  const chosenQuote = {};
  const chosenNum = Math.floor(Math.random() * myQuotes.length);

  chosenQuote.quote = arrQuotes[chosenNum].quote;
  chosenQuote.author = arrQuotes[chosenNum].author;

  return chosenQuote;
};

const QuoteTweet = props => {
  return (
      <div>
          <a id="tweet-quote" target="_top" href="twitter.com/intent/tweet"><button id="btn-tweet" style={props.newStyle} onMouseOver={props.onMouseOver} onMouseLeave={props.onMouseLeave}>Tweet!</button></a>
      </div>
  );
};


const IntroQuote = props => {

  const firstLoad = getMyQuote(myQuotes);

  return (
      <div>
          <div id="text" style={props.newColor}>
              "{firstLoad.quote}"
          </div>
          <div id="author" style={props.newColor}>
              -- {firstLoad.author}
          </div>
      </div>
  );
};

const Quote = props => {
  return (
      <div>
      {console.log(txtBgColor.length)}
          <div id="text" style={props.newColor}>
              "{props.chosenText}"
          </div>
          <div id="author" style={props.newColor}>
              -- {props.chosenAuthor}
          </div>
      </div>
  );
};

class QuoteBox extends React.Component {
  constructor (props) {
      super (props);

      this.state = {
          chosenQuote: '',
          chosenAuthor: '',
          atStart: true,
      };

      this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
      const quote = getMyQuote(myQuotes);
     
      this.setState ({
          chosenQuote: quote.quote,
          chosenAuthor: quote.author,
          atStart: false,
      });
  }

  render () { 
      const newBgIndex = Math.floor(Math.random() * txtBgColor.length);
      const newColor = {
          background: {background: txtBgColor[newBgIndex]},
          color: {color: txtBgColor[newBgIndex]}
      }; 

      const handHover = (e) => {
          e.target.style.background = '#212f3d';
      }

      const handLeave = (e) => {
          e.target.style.background = newColor.background.background;
      }

      return (
          <div id="quote-container" style={newColor.background}>
              <div id="quote-box">
                  {this.state.atStart && <IntroQuote newColor={newColor.color}/>}
                  {!this.state.atStart && <Quote newColor={newColor.color} chosenText={this.state.chosenQuote} chosenAuthor={this.state.chosenAuthor}/>}
                  <div id="btn-newqt-tweet">
                      <QuoteTweet newStyle={newColor.background} onMouseOver={handHover} onMouseLeave={handLeave}/>
                      <button id="new-quote" style={newColor.background} onClick={this.handleClick} onMouseOver={handHover} onMouseLeave={handLeave}>Another One!</button>
                  </div>
              </div>
              
          </div>
      );
  }
};

const App = props => {
  return (
     <div id="container">
          <QuoteBox />
      </div>
  );
}

export default App