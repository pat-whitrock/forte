(() => {
  class ApiConstants {

    get authentication() {
      return {
        login:
        {
          student: '/students/sign_in',
          teacher: '/teachers/sign_in',
          admin: '/admins/sign_in',
        },
        logout:
        {
          student: '/students/sign_out',
          teacher: '/teachers/sign_out',
          admin: '/admins/sign_out',
        },
        signup:
        {
          student: '/students',
          teacher: '/teachers',
        },
        request_reset_password:
        {
          student: '/passwords/students/reset_request',
          teacher: '/passwords/teachers/reset_request',
          admin: '/passwords/admins/reset_request',
        },
        update_password:
        {
         student: (id) =>  `/passwords/students/update_password/${id}`,
         teacher: (id) => `/passwords/teachers/update_password/${id}`,
        },
      }
    }

    get students() {
      return {
        index: '/api/students',
        unmatched: '/api/students/unmatched',
        validate: '/api/students/validate',
        delete: (id) => `/api/students/${id}`,
        update: (id) => `/api/students/${id}`,
        show: (id) => `/api/students/${id}`,
        upcomingLessons: (id) => `/api/students/upcoming_lessons/${id}`,
        recentLessons: (id) => `/api/students/recent_lessons/${id}`,
        instruments: (id) => `/api/students/${id}/instruments`,
        matchings: (id) => `/api/students/${id}/matchings`,
      };
    }

    get teachers() {
      return {
        index: '/api/teachers',
        validate: '/api/teachers/validate',
        delete: (id) => `/api/teachers/${id}`,
        update: (id) => `/api/teachers/${id}`,
        show: (id) => `/api/teachers/${id}`,
        possibleTeachers: (id, instrument) => `/api/teachers/possible_teachers?id=${id}&instrument=${instrument}`,
        upcomingLessons: (id) => `/api/teachers/upcoming_lessons/${id}`,
        recentLessons: (id) => `/api/teachers/recent_lessons/${id}`,
        instruments: (id) => `/api/teachers/${id}/instruments`,
        matchings: (id) => `/api/teachers/${id}/matchings`,
      };
    }

    get admins() {
      return {
        add: '/admins/add',
      };
    }

    get searchables() {
      return {
        users: (prefix, filter) => `/api/searchables/users?prefix=${prefix}&filter=${filter}`,
        roster: '/api/searchables/roster',
      }
    }

    get lessons() {
      return {
        create: '/api/lessons',
        index: '/api/lessons',
        delete: (id) => `/api/lessons/${id}`,
        update: (id) => `/api/lessons/${id}`,
        show: (id) => `/api/lessons/${id}`,
      };
    }

    get matchings() {
      return {
        create: '/api/matchings',
        index: '/api/matchings',
        pairs: '/api/matchings/pairs',
        delete: (id) => `/api/matchings/${id}`,
        update: (id) => `/api/matchings/${id}`,
        show: (id) => `/api/matchings/${id}`,
        pastLessons: (id) => `/api/matchings/${id}/past_lessons`,
        upcomingLessons: (id) => `/api/matchings/${id}/upcoming_lessons`,
      };
    }

    get stripe() {
      return {
        createCustomer: '/stripe/customer',
        updateCustomer: '/stripe/update_customer',
        createAccount: '/stripe/account',
        verifyAccount: '/stripe/verify_account',
        changeAccount: '/stripe/change_account',
        charge: '/stripe/charge',
        donationCharge: '/stripe/donation_charge',
      }
    }

    get instruments() {
      return {
        create: '/api/instruments',
        delete: (id) => `/api/instruments/${id}`,
      }
    }

    get donations() {
      return {
        donationNotify: '/donation_notify_admin',
      }
    }
  }
  this.ApiConstants = new ApiConstants();
})();
