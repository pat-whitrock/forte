class LessonCard extends React.Component{

  static get propTypes() {
    return {
      lessons: React.PropTypes.array,
    };
  }

  renderLessonCard(lesson) {
    const {
      price,
      start_time,
      teacher,
      student
    } = lesson;

    return (
      <div className="lesson-card">
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
          <img src={ImageConstants.icons.cancel} href="#" />
          <img src={ImageConstants.icons.modify} href="#" />
        </div>
      </div>
    );
  }

  renderLessonCards(lessons) {
    if (lessons) {
      return lessons.map((lesson) => this.renderLessonCard(lesson));
    }
  }

  render() {
    const {lessons} = this.props;
    return (
      <div>
        {this.renderLessonCards(lessons)}
      </div>
    );
  }
}
