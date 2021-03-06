class BaseUserComponent extends React.Component {

  componentDidMount() {
    // Set up active instruments object
    var activeInstruments = {}
    const hash = window.location.hash.replace("#", "");

    for (var i = 0; i < INSTRUMENTS.length; i++) {
      let item = INSTRUMENTS[i];

      if (item === hash) {
        activeInstruments[item] = true;
      } else {
        activeInstruments[item] = false;
      }
    }

    this.setState({ activeInstruments: activeInstruments });

    // Set up instruments fields object
    var instruments = {}
    for (var i = 0; i < INSTRUMENTS.length; i++) {
      instruments[INSTRUMENTS[i]] = {
        proficiency: null,
        years_played: null,
        is_primary: false,
      };
    }
    this.setState({ instruments: instruments });
  }

  /**
   * Returns the validation state of a given field name
   * @param name String field name that is passed through to access the errors object
   */
  getValidationState(name) {
    if (this.state.errors[name]) {
      return 'error';
    }
  }

  /**
   * Returns a bootstrap help block if an error for the field name exists
   * @param name String field name that is passed through to access the errors object
   */
  displayErrorMessage(name) {
    if (this.state.errors[name]) {
      return <HelpBlock className="error-message">{this.state.errors[name]}</HelpBlock>;
    }
  }

  /**
   * Renders the option drop down based on which field it is
   * @param type String field name that is passed to switch the constants array.
   */
  renderOptions(type) {
    var optionsArray = []
    var retOptions = []
    var i = 0;
    var j = 0;
    switch(type) {
      case 'gender':
        optionsArray = GENDERS;
        break;
      case 'student_school_level':
        optionsArray = STUDENT_SCHOOL_LEVELS;
        break;
      case 'teacher_school_level':
        optionsArray = TEACHER_SCHOOL_LEVELS;
        break;
      case 'state':
        optionsArray = STATES;
        break;
      case 'stripe_address_state':
        optionsArray = STATES;
        break;
      case 'travel_distance':
        optionsArray = TRAVEL_DISTANCES;
        break;
      case 'income_range':
        optionsArray = INCOME_RANGES;
        break;
      case 'proficiency':
        optionsArray = PROFICIENCY;
        break;
      case 'years_played':
        optionsArray = YEARS_PLAYED;
        break;
      case 'household_number':
        optionsArray = HOUSEHOLD_NUMBER;
        j = 1;
        break;
      case 'stripe_account_holder_type':
      case 'account_holder_type':
        for (var i = 0; i < ACCOUNT_HOLDER_TYPE.length; i++) {
          retOptions.push(<option value={ACCOUNT_HOLDER_TYPE[i]}>{ACCOUNT_HOLDER_TYPE[i]}</option>);
        }
        return retOptions
      case 'country':
        for (var i = 0; i < COUNTRY_CODES.length; i++) {
          retOptions.push(<option value={COUNTRY_CODES[i].name}>{COUNTRY_CODES[i].name}</option>);
        }
        return retOptions
      case 'stripe_country':
        for (var i = 0; i < COUNTRY_CODES.length; i++) {
          retOptions.push(<option value={COUNTRY_CODES[i].name}>{COUNTRY_CODES[i].name}</option>);
        }
        return retOptions
    }
    // used for household_number as the option value did not match up with the array
    for (; i < optionsArray.length; i++, j++) {
      retOptions.push(<option value={j}>{optionsArray[i]}</option>);
    }
    return retOptions;
  }

  renderInstrumentButtons() {
    const { activeInstruments } = this.state
    var buttons = []
    for (var i = 0; i < INSTRUMENTS.length; i++) {
      var instrument = INSTRUMENTS[i]
      var className = activeInstruments[instrument] ? 'button button--static-clicked button--sm':'button button--static button--sm';
      buttons.push(<div className={className} onClick={(event) =>
        this.handleInstrumentClick(event)}>{INSTRUMENTS[i]}</div>);
    }
    return buttons;
  }

  /**
   * Returns the validation state of a given field name
   * @param instrument String instrument name.
   */
  renderInstrumentFields(instrument) {
    return (
      <div key={instrument}>
      <h4 className="instrument-title">{instrument}</h4>
        <div className="form-row">
          <FormGroup>
            <ControlLabel>Proficiency</ControlLabel>
            <FormControl
              componentClass="select"
              name="proficiency"
              onChange={(event) => this.handleInstrumentFieldChange(event, instrument)}>
              <option value="" disabled selected>Select a value</option>
              {this.renderOptions('proficiency')}
            </FormControl>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Years Played</ControlLabel>
            <FormControl
              componentClass="select"
              name="years_played"
              onChange={(event) => this.handleInstrumentFieldChange(event, instrument)}>
              <option value="" disabled selected>Select a value</option>
                {this.renderOptions('years_played')}
            </FormControl>
          </FormGroup>
        </div>
      </div>
    );
  }

  /**
   * Returns the instrument fields array for rendering.
   */
  renderInstrumentsFields() {
    var instrumentsFields = []
    const { activeInstruments } = this.state
    for (var i = 0; i < INSTRUMENTS.length; i++) {
      if (activeInstruments[INSTRUMENTS[i]] == true) {
        instrumentsFields.push(this.renderInstrumentFields(INSTRUMENTS[i]));
      }
    }
    return instrumentsFields;
  }

  /**
   * Handles changes for dateTime values
   * @param dateTime Moment
   * @param name String fieldname that's passed to the method
   */
  handleDatetimeChange(dateTime, name) {
     // Due to form input, birthday is not a moment but an event
    const { errors } = this.state;
    if (name == 'birthday') {
      const name = $(dateTime.target).attr("name");
      var value = $(dateTime.target).val();
      if (value.length == 10) {
        value = moment(value, "MM/DD/YYYY");
        if (value.isValid()) {
          delete errors['birthday'];
          this.setState({ birthday: moment(value, "MM/DD/YYYY"), errors: errors });
        }
        else {
          errors.birthday = "Invalid Birth Date"
          this.setState({errors : errors });
        }
      }
    // waiver date is a moment since we are using the datepicker
    } else if (name == 'waiver_date') {
      this.setState({ waiver_date: dateTime });
    } else if (name == 'stripe_account_holder_dob') {
      const name = $(dateTime.target).attr("name");
      var value = $(dateTime.target).val();
      if (value.length == 10) {
        value = moment(value, "MM/DD/YYYY");
        if (value.isValid()) {
          delete errors['stripe_account_holder_dob'];
          this.setState({ stripe_account_holder_dob: moment(value, "MM/DD/YYYY"), errors: errors });
        }
        else {
          errors.stripe_account_holder_dob = "Invalid DOB"
          this.setState({errors : errors });
        }
      }
    }
  }

  /**
   * Handles changes for setting the state.
   * @param event Object React event
   */
  handleChange(event) {
    var name = $(event.target).attr("name");
    var value = $(event.target).val();
    this.setState({ [name] : value });
  }

  /**
   * Handles changes for setting the state for boolean fields.
   * @param event Object React event
   */
  handleBooleanChange(event) {
    const name = $(event.target).attr("name");
    var value = $(event.target).val();
    value = (value == "true");
    this.setState({ [name] : value });
  }

  /**
   * Handles changes for setting the state for integer fields.
   * @param event Object React event
   */
  handleIntegerChange(event) {
    const name = $(event.target).attr("name");
    var value = $(event.target).val();
    value = parseInt(value);
    this.setState({ [name] : value });
  }

  /**
   * Handles changes for setting the state for single checkbox fields.
   * @param event Object React event
   */
  handleCheckboxChange(event) {
    const name = $(event.target).attr("name");
    var value = this.state[name];
    value = (!value);
    this.setState({ [name] : value });
  }

  /**
   * Handles changes for setting the state for instrument fields.
   * @param event Object React event
   * @param instrument String name of the instrument being set
   */
  handleInstrumentFieldChange(event, instrument) {
    const name = $(event.target).attr("name");
    var value = $(event.target).val();
    value = parseInt(value);
    this.setState({
      instruments: update(this.state.instruments, {[instrument]: {[name]: {$set: value}}}),
    });
  }

  /**
   * Handles changes for clicking a given instrument
   * @param event Object React event
   */
  handleInstrumentClick(event) {
    const { instruments, activeInstruments } = this.state;
    const instrument = event.target.textContent;
    const currentState = activeInstruments[instrument];
    this.setState({
      activeInstruments: update(this.state.activeInstruments, {[instrument]: {$set: !currentState}}),
    });
  }

  /**
   * Handles changes for setting the state for country fields.
   * @param event Object React event
   */
  handleCountryChange(event) {
    const name = $(event.target).attr("name");
    var value = $(event.target).val();
    for (var i = 0; i < COUNTRY_CODES.length; i++) {
      if (COUNTRY_CODES[i].name == value) {
        value = COUNTRY_CODES[i].code
        this.setState({ [name] : value})
        return;
      }
    }
  }

  /**
   * Creates the instrument attributes field with all of the instruments that are selected
   */
  setInstruments() {
    const { instruments, activeInstruments } = this.state;
    var instrumentsObj = [];
    for (let [instrumentName, active] of Object.entries(activeInstruments)) {
      if (active == true) {
        var instrument = Object.assign({}, {name: instrumentName}, instruments[instrumentName]);
        instrumentsObj.push(instrument);
      }
    }
    this.setState({ instruments_attributes: instrumentsObj });
  }

  /**
   * Sets the availability for a student/teacher using UTC conversions.
   */
  setAvailability() {
    const { calendar } = this.refs.availability.refs
    //TODO: not ideal way to do this.. figure out some other way
    var eventArray = $(calendar).fullCalendar('clientEvents');
    var availabilityArray = []
    for (var i = 0; i < eventArray.length; i++) {
      availabilityArray = availabilityArray.concat(range_to_array(eventArray[i]['start'], eventArray[i]['end']));
    }
    this.setState({
      availability: availabilityArray,
      loading: true
    });
  }

  /**
   * Front-end validation for instrument_attributes field
   */
  validateInstruments() {
    const { instruments_attributes } = this.state;

    var errors = {};

    // sets the errors object if there are no instruments selected
    if (!(instruments_attributes.length)) {
      errors.instruments = "Can't Be Blank";
    } else {
      for (var i = 0; i < instruments_attributes.length; i++) {
        // checks to see if any of the instrument fields are null
        if ((instruments_attributes[i]['name'] == null) || (instruments_attributes[i]['proficiency'] == null) ||
          (instruments_attributes[i]['years_played'] == null)) {
            errors.instruments = "Can't Be Blank";
        }
      }
    }
    return errors;
  }

  /**
   * Handles changes for setting the state for instrument fields.
   * @param user_errs Object errors passed from the validation of the students from Rails Backend
   * @param address_errors Object errors passed from Google autocomplete/address validations
   */
  async validateUserAndStripeCustomer(user_errs, address_errors) {

    var card_errs = await this.stripeValidateFields();
    var instrument_errors = await this.validateInstruments();

    var error_info = {};
    var validated = true;
    for (var err_type in card_errs) {
      //TODO: Find JS function to identify false values instead
      if (!card_errs[err_type][0]) {
        validated = false;
        error_info[err_type] = card_errs[err_type][1];
      }
    }
    // Checks to see if object is null
    if (!(Object.keys(user_errs).length === 0) ||
        !(Object.keys(instrument_errors).length === 0) ||
        !(Object.keys(address_errors).length === 0)) {
      validated = false;
    }
    error_info = Object.assign(error_info, user_errs, instrument_errors, address_errors);
    this.setState({ errors: error_info });
    return validated;
  }

  /**
   * Front-end validation for the address field and conversion for lat/lng if autocomplete isn't used
   * @param user_errs Object errors passed from the validation of the students from Rails Backend
   */
  validateAddress(user_errs) {
    const { lat, lng, address, address2, city, state, zipcode } = this.state;

    var address_errors = {};

    if (!lat && !lng) {
      var geocoder = new google.maps.Geocoder();
      var full_address = [address, address2, city, state, zipcode].join(" ");
      geocoder.geocode({"address": full_address}, function(results, status) {
        if (status === 'OK') {
          var location = results[0]["geometry"]["location"];
          var lat = location["lat"]();
          var lng = location["lng"]();
          this.setState({ lat: lat, lng: lng });
        } else {
          address_errors.address = "Invalid address";
        }
        this.createStripeUser(user_errs, address_errors);
      }.bind(this));
    } else {
      this.createStripeUser(user_errs, address_errors);
    }
  }

  /**
   * Opens the waiver modal.
   */
  openWaiver() {
    this.setState({ showWaiverModal: true });
  }

  /**
   * Closes the waiver modal.
   */
  closeWaiver() {
    this.setState({ showWaiverModal: false });
  }

  /**
   * Stops the loading gif.
   */
  stopLoading() {
    this.setState({ loading : false });
  }

}
