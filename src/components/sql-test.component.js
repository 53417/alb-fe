import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import SqlTestService from "./../services/sql-test.service"

function renderTable(data) {
  const tableHeadings = Object.keys(data[0])
  return (
    <div className="table-responsive">
      <table className="table">
        <thead>
        <tr>
          {tableHeadings.map(key => {
            return (<th scope="col">{key}</th>)
          })}
        </tr>
        </thead>
        <tbody>
          {data.map(row => {
            return(
              <tr>
                {tableHeadings.map(heading => {
                  const data = row[heading]
                  if(data) {
                    return(
                      <td>{row[heading]}</td>
                    )
                  } else {
                    return(
                      <td></td>
                    )
                  }
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function renderResult(result) {
  if(typeof result === 'string') {
    return (<p>{result}</p>)
  } else if(typeof result === 'object') {
    return renderTable(result)
  } else {
    return (<p>invalid</p>) 
  }
}

function renderSchemas(questionSchemas) {
  return questionSchemas.map(questionSchema => {
    return(
      <div>
        <strong>{questionSchema.tableName}</strong>
        { renderTable(questionSchema.schema) }
      </div>
    )
  });
}

class SqlTest extends Component {
  constructor(props) {
    super(props);
    this.onChangeSqlQuery = this.onChangeSqlQuery.bind(this);
    this.executeQuery = this.executeQuery.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    
    this.state = {
      query: "",
      result: "...",
      question: '',
      schemas: [],
      correct: ''
    }
  }
  
  componentDidMount() {
    SqlTestService.getQuestion().then(response => {
      this.setState({
        question: response.data.question,
        schemas: response.data.schemas
      })
    })
  }

  executeQuery(e) {
    e.preventDefault();
    SqlTestService.executeQuery(this.state.query).then(response => {
      if( typeof response.data === 'string') {
        this.setState({
          result: response.data
        })
      }
      if( typeof response.data === 'object') {
        this.setState({
          result: response.data
        })
      }
    }, error => {
      this.setState({
        result: error.toString()
      })
    })
  }
  
  checkAnswer() {
    SqlTestService.checkAnswer(this.state.query).then(response => {
      this.setState({
        correct: response.data
      })
    })
  }
  
  onChangeSqlQuery(e) {
    this.setState({query: e.target.value})
  }
  
  render() {
    const { user: currentUser } = this.props;

    if (!currentUser) {
      return <Redirect to="/login" />;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h3 className="card-title">Question:</h3>
                <p>{this.state.question}</p>
                <h4>Schemas:</h4>
                {renderSchemas(this.state.schemas)}
              </div>
            </div>
          </div>

          <div className="col-md-6">
            
            <form onSubmit={this.executeQuery}>
              <label htmlFor="sqlInput">Input:</label>
              <div className="form-floating">
                <textarea 
                  className="form-control" 
                  value={this.state.query} 
                  onChange={this.onChangeSqlQuery}  
                  id="sqlInput" 
                  rows="10" 
                  placeholder={'write sql here'}
                />
              </div>
              <button type="submit" className="btn btn-secondary">Execute Query</button>
            </form>
            
            <div className="card">
              <h4>Output:</h4>
              <div className="card-body">
                {renderResult(this.state.result)}
              </div>
            </div>
            <button type="button" className="btn btn-primary" onClick={this.checkAnswer}>Submit Response</button>
            <p>{this.state.correct}</p>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(SqlTest);
