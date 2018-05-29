
import React from 'react';
import ReactDom from 'react-dom';
import {timelineElements} from "./model";

class TimelineItem extends React.Component {
  render() {
    return <li>
      <a href="#">{this.props.name}</a>
    </li>;
  }
}

export default class Timeline extends React.Component {
  constructor(props) {
    super(props);
    this.blockCoords = props.coords;
    this.fixed = props.fixed;
    this.state = {
      currentBlock: 0,
      position: `absolute`,
      top: 0,
      left: 0,
    };
    this.onDocScroll = this.onDocScroll.bind(this);
  }

  onDocScroll() {

    if (window.pageYOffset < this.blockCoords[0]) {
      this.setState({
        currentBlock: 0,
        position: `absolute`,
        top: 0,
        left: 0
      });
    } else if (this.blockCoords[0] < window.pageYOffset && window.pageYOffset < this.blockCoords[1]) {
      this.setState({
        currentBlock: 0,
        position: `fixed`,
        top: 117,
        left: this.fixed.left
      });
    } else if (this.blockCoords[1] < window.pageYOffset && window.pageYOffset < this.blockCoords[2]) {
      this.setState({
        currentBlock: 1,
        position: `fixed`,
        top: 117,
        left: this.fixed.left
      });
    } else if (this.blockCoords[2] < window.pageYOffset && window.pageYOffset < this.blockCoords[3]) {
      this.setState({
        currentBlock: 2,
        position: `fixed`,
        top: 117,
        left: this.fixed.left
      });
    } else if (this.blockCoords[3] < window.pageYOffset && window.pageYOffset < this.blockCoords[4]) {
      this.setState({
        currentBlock: 3,
        position: `fixed`,
        top: 117,
        left: this.fixed.left
      });
    } else if (this.blockCoords[4] < window.pageYOffset) {
      this.setState({
        currentBlock: 4,
        position: `fixed`,
        top: 117,
        left: this.fixed.left
      });
    }
  }

  componentDidMount() {

    document.addEventListener(`scroll`, this.onDocScroll);

  }

  componentWillUnmount() {

    document.removeEventListener(`scroll`, this.onDocScroll);

  }

  render() {
    return (
      <ul className="timeline" style={{position: this.state.position, top: this.state.top, left: this.state.left}}>
        {timelineElements.map((item, index) => {
          if (index === this.state.currentBlock) {
            return (
              <TimelineItem key={item.disabled.toString()} name={item.active}/>
            );
          } else {
            return (
              <TimelineItem key={item.disabled.toString()} name={item.disabled}/>
            );
          }
        })
        }
      </ul>
    );
  }
}
