class StudentLessonCard extends React.Component {

  constructor() {
    super();
    this.state = {
      showCancelModal: false,
    };
  }

  static get propTypes() {
    return {
      lesson: React.PropTypes.object,
      handleCancelLesson: React.PropTypes.func.isRequired,
    };
  }

  openCancelModal() {
    this.setState({ showCancelModal: true });
  }

  closeCancelModal() {
    this.setState({ showCancelModal: false });
  }

  renderCancelModal() {
    const { lesson, handleCancelLesson } = this.props;
    const { showCancelModal } = this.state;

    if (showCancelModal) {
      return (
        <StudentCancelModal
          lesson={lesson}
          handleClose={() => this.closeCancelModal()}
          handleCancelLesson={() => handleCancelLesson()}
        />
      );
    }
  }

  render() {
    const { lesson } = this.props;
    const {
      price,
      start_time,
      teacher,
      student
    } = lesson;

    return (
      <div className="student-lesson-card">
        <img className="instrument-icon" src={ImageConstants.instruments.clarinet} href="#" />
        <div className="logistics">
          <h4> Piano Lesson </h4>
          <div className="info-row">
            <img src={ImageConstants.icons.person} href="#" />
            <h6>{teacher.first_name}</h6>
          </div>
          <div className="info-row">
            <img src={ImageConstants.icons.time} href="#" />
            <h6>{start_time}</h6>
          </div>
        </div>
        <div className="details">
          <div className="info-row">
            <img src={ImageConstants.icons.location} href="#" />
            <h6>Home</h6>
          </div>
          <p>{teacher.city}</p>
          <div className="cost">
            <div className="cost-icon">
            </div>
            <p>${price}</p>
          </div>
        </div>
        <div className="actions">
          <img src={ImageConstants.icons.cancel} onClick={() => this.openCancelModal()}/>
          {this.renderCancelModal()}
          <img src={ImageConstants.icons.modify} href="#" />
        </div>
      </div>
    );
  }
}