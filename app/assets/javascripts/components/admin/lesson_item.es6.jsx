class LessonItem extends React.Component {

  static get propTypes() {
    return {
      lesson: React.PropTypes.object,
      onPersonClick: React.PropTypes.func,
    };
  }

  render () {
    const { lesson } = this.props
    var startTime = moment(lesson.start_time);
    var endTime = moment(lesson.end_time);
    return (
      <div className="lesson-item">
        <div className="lesson-item-header">
          {this.renderHeaderItem('Student', lesson.student.first_name + ' ' + lesson.student.last_name, (event) => this.props.onPersonClick(this.props.lesson.student))}
          {this.renderHeaderItem('Teacher', lesson.teacher.first_name + ' ' + lesson.teacher.last_name, (event) => this.props.onPersonClick(this.props.lesson.teacher))}
        </div>
        <div className="lesson-item-content">
          {this.renderContentItem('Time',
            startTime.format('ddd') + ' ' +
            startTime.format('h:mm A').toUpperCase() + ' - ' +
            endTime.format('h:mm A').toUpperCase()
          )}
          {this.renderContentItem('Price', '$' + lesson.lesson.price)}
          {this.renderContentItem('Feedback', lesson.lesson.student_feedback)}
        </div>
      </div>
    );
  }

  renderHeaderItem(label, text, onClick=null) {
    return (
      <div className="lesson-item-header-item">
        <div className="header-label">{label}</div>
        <div className="header-text" onClick={onClick}>{text}</div>
      </div>
    );
  }

  renderContentItem(label, text) {
    return (
      <div className="lesson-item-content-item">
        <div className="content-label">{label}</div>
        <div className="content-text">{text}</div>
      </div>
    );
  }
}
