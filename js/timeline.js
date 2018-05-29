
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
  render() {
    return (<ul className="timeline">
      {timelineElements.map((item, index) => {
        if (index === 0) {
          return (<TimelineItem key={item.disabled.toString()} name={item.active}/>);
        } else {
          return (<TimelineItem key={item.disabled.toString()} name={item.disabled}/>);
        }
      })
      }
    </ul>);
  }
}
