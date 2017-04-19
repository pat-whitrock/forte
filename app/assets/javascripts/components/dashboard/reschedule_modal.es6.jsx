class RescheduleModal extends React.Component {

  constructor() {
    super();
    this.state = {
      showNextScreen: false,
      lessonStartTime: null,
      lessonEndTime: null,
      loading: false,
    };
  }

  static get propTypes() {
    return {
      fetchUpcomingLessons: React.PropTypes.func,
      handleClose: React.PropTypes.func,
      lesson: React.PropTypes.object.isRequired,
      isStudent: React.PropTypes.bool.isRequired,
    };
  }

  handleNext() {
    this.setLessonTime();
    this.setState({ showNextScreen: true });
  }

  handleBack() {
    this.setState({ showNextScreen: false });
  }

  setLessonTime() {
    const { calendar } = this.refs.rescheduler.refs;
    var eventArray = $(calendar).fullCalendar('clientEvents');
    this.setState({ lessonStartTime: moment(eventArray[0]['start']) });
    this.setState({ lessonEndTime: moment(eventArray[0]['end']) });
  }

  handleRescheduleLesson() {
    this.setState({ loading: true });
    const { lesson, handleClose, fetchUpcomingLessons } = this.props;
    const { lessonStartTime, lessonEndTime } = this.state;

    const route = ApiConstants.lessons.update(lesson.id);
    const params = {
      lesson: {
        start_time: lessonStartTime,
        end_time: lessonEndTime,
      }
    };
    const resolve = (response) => {
      handleClose();
      fetchUpcomingLessons();
      toastr.success("Lesson was successfully rescheduled");
    };
    const reject = (response) => {
      toastr.error(response.message);
    };
    Requester.update(
      route,
      params,
      resolve,
      reject,
    );
  }

  renderRescheduleModal() {
    let loadingContainer;

    if (this.state.loading) {
      loadingContainer = <div className="loading-container">
        <div className="loading"></div>
      </div>
    }
    const { handleClose, lesson } = this.props;
    const { showNextScreen, lessonStartTime } = this.state;
    var lessonTime = moment(lessonStartTime);
    if (showNextScreen) {
      return (
        <div>
          <Modal.Body>
            {loadingContainer}
            Are you sure you wish to reschedule this lesson to {lessonTime.format('MMM DD hh:mm A')}?
          </Modal.Body>
          <Modal.Footer>
            <Button className="button button--outline-orange" onClick={() => this.handleBack()}>Back</Button>
            <Button className="button button--solid-orange" onClick={() => this.handleRescheduleLesson()}>Confirm</Button>
          </Modal.Footer>
        </div>
      )
    } else {
      return (
        <div>
          <Modal.Body>
            <RescheduleCalendar
              ref="rescheduler"
              lesson={lesson}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button className="button button--outline-orange" onClick={handleClose}>Cancel</Button>
            <Button className="button button--solid-orange" onClick={() => this.handleNext()}>Confirm</Button>
          </Modal.Footer>
        </div>
      );
    }
  }

  render() {
    const { handleClose } = this.props;

    return (
      <div>
        <Modal show={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Reschedule Lesson</Modal.Title>
          </Modal.Header>
          {this.renderRescheduleModal()}
        </Modal>
      </div>
    );
  }
}
