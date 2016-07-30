'use strict';

import React from 'react';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import { withRouter } from 'react-router'



class SetDateComponent extends React.Component {
  constructor(props) {
      super(props);
      this.handleDayClick = this.handleDayClick.bind(this);
    }

    handleDayClick(e, day, { selected }) {
      this.props.updateVar({
        [this.props.stateVal] : day
      });
      this.props.onClose();
      this.props.router.push('/dates-and-places');
    }
    render() {
      const selectedDay = this.props.data[this.props.stateVal]
      return (
        <div>
          <h4 className="ui horizontal divider header">
            { this.props.title }
          </h4>
          <div className="ui sub header" style={{textAlign: 'center'}}>
            {selectedDay ? selectedDay.toLocaleDateString()
               : 'Please select a day'}
          </div>
          <DayPicker
            selectedDays={day => DateUtils.isSameDay(selectedDay, day)}
            onDayClick={this.handleDayClick}
          />
        </div>
      );
    }
  }

export default withRouter(SetDateComponent);
