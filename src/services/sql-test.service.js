import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://alb-be.herokuapp.com/api/sqlTest/";
// const API_URL = "http://localhost:53416/api/sqlTest/";

class sqlTestService {
  executeQuery(query) {
    return axios
      .get(API_URL + 'executeQuery', { 
        headers: authHeader(), 
        params: {query}
      })
  }
  getQuestion() {
    return axios
      .get(API_URL + 'getQuestion', {
        headers: authHeader()
      })
  }
  submitAnswer(startTime, endTime, query, correct) {
    return axios
      .get(API_URL + 'submitAnswer', {
        headers: authHeader(),
        params: {
          startTime,
          endTime,
          query,
          correct
        }
      })
  }
}

export default new sqlTestService();
