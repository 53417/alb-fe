import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "https://alb-be.herokuapp.com/api/sqlTest/";

class sqlTestService {
  executeQuery(query) {
    return axios
      .get(API_URL + 'executeQuery', { 
        headers: authHeader(), 
        params: { query }
      })
  }
  getQuestion() {
    return axios
      .get(API_URL + 'getQuestion', {
        headers: authHeader()
      })
  }
  checkAnswer(query) {
    return axios
      .get(API_URL + 'checkAnswer', {
        headers: authHeader(),
        params: { query }
      })
  }
}

export default new sqlTestService();
