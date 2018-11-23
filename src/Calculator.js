import React from 'react';
import Number from './components/Number';
import './Calculator.css';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      line2: '',
      line1: '0',
      calculated: false,
      lastOperation: '',
    };
    this.number = this.number.bind(this);
    this.operator = this.operator.bind(this);
    this.equals = this.equals.bind(this);
    this.decimal = this.decimal.bind(this);
  }


  number(val) {
    const { line1, calculated } = this.state;
    if (line1 === '0' || calculated) {
      this.setState({
        line1: val,
        calculated: false,
        lastOperation: '',
      });
    } else if (line1.length <= 20) {
      this.setState({
        line1: line1 + val,
        calculated: false,
      });
    }
  }

  operator(val) {
    const { line2, line1, calculated } = this.state;
    if (line2 === '') {
      this.setState({
        line2: line1 + val,
        calculated: true,
      });
    } else {
      let result;
      if (calculated) result = line2.substr(0, line2.length - 3);
      else result = Math.round(1000000000000 * eval(line2 + line1)) / 1000000000000;
      this.setState({
        line1: result,
        line2: result + val,
        calculated: true,
      });
    }
  }

  equals() {
    const { lastOperation, line2, line1 } = this.state;
    if (lastOperation !== '' && line2 === '') {
      let result = line1 + lastOperation;
      result = Math.round(1000000000000 * eval(result)) / 1000000000000;
      this.setState({
        line2: '',
        line1: result,
        calculated: true,
      });
    } else {
      let operation = '';
      const result = Math.round(1000000000000 * eval(line2 + line1))
          / 1000000000000;
      result.toString();
      operation = (line2 + line1)
        .split(' ')
        .slice(-2)
        .join(' ');
      this.setState({
        line2: '',
        line1: result,
        calculated: true,
        lastOperation: operation,
      });
    }
  }

  decimal() {
    const { calculated, line1 } = this.state;
    if (calculated) {
      this.setState({
        line1: '0.',
        calculated: false,
      });
    } else {
      const current = line1;
      if (!current.includes('.')) {
        this.setState({ line1: `${current}.` });
      }
    }
  }

  render() {
    const { line2, line1 } = this.state;
    const display = line2.replace(/\//, '÷').replace(/\*/, '×');
    return (
      <div id="calculator">
        <div className="display">
          <p className="small">{display}</p>
          <p id="display">{line1}</p>
        </div>
        <div className="container">
          <button
            type="button"
            id="clear"
            onClick={() => {
              this.setState({ line2: '', line1: '0', lastOperation: '' });
            }}
            style={{ gridColumn: '1 / 4' }}
          >
            C
          </button>

          <button type="button" id="divide" onClick={() => this.operator(' / ')}>
            ÷
          </button>

          <Number id="7" display={this.number} />
          <Number id="8" display={this.number} />
          <Number id="9" display={this.number} />

          <button type="button" id="multiply" onClick={() => this.operator(' * ')}>
            ×
          </button>

          <Number id="4" display={this.number} />
          <Number id="5" display={this.number} />
          <Number id="6" display={this.number} />

          <button type="button" id="add" onClick={() => this.operator(' + ')}>
            +
          </button>

          <Number id="1" display={this.number} />
          <Number id="2" display={this.number} />
          <Number id="3" display={this.number} />

          <button type="button" id="subtract" onClick={() => this.operator(' - ')}>
            -
          </button>

          <Number
            id="0"
            display={this.number}
            style={{ gridColumn: '1 / 2' }}
          />
          <button type="button" id="decimal" onClick={this.decimal} className="number">
            .
          </button>
          <button
            type="button"
            id="equals"
            onClick={this.equals}
            style={{ gridColumn: '3 / 5' }}
          >
            =
          </button>

        </div>
      </div>
    );
  }
}

export default Calculator;
